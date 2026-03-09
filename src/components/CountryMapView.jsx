import { useEffect, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import { countryCities, countryMapConfig } from '../data/cityData'

// Fix leaflet default icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Pixel distance check for label overlap prevention
function tooClose(a, b, minDist = 40) {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  return Math.sqrt(dx * dx + dy * dy) < minDist
}

// Convert lat/lng to rough pixel coords at a given zoom
function latLngToPixel(lat, lng, zoom) {
  const scale = Math.pow(2, zoom) * 256
  const x = (lng + 180) / 360 * scale
  const sinLat = Math.sin(lat * Math.PI / 180)
  const y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale
  return [x, y]
}

function FitBounds({ bounds }) {
  const map = useMap()
  useEffect(() => {
    if (bounds) {
      const leafletBounds = [[bounds[0], bounds[1]], [bounds[2], bounds[3]]]
      map.fitBounds(leafletBounds, { padding: [20, 20] })
    }
  }, [map, bounds])
  return null
}

export default function CountryMapView({ countryId, lang }) {
  console.log('MAP RENDER', countryId, !!countryCities[countryId], !!countryMapConfig[countryId])
  const cities = countryCities[countryId] || []
  const config = countryMapConfig[countryId]

  // Calculate map height from aspect ratio
  const mapHeight = useMemo(() => {
    if (!config) return 450
    const ar = config.aspectRatio
    // ar = width/height, we fix width ~800px notional
    // height = 800 / ar, clamped
    const h = Math.round(800 / ar)
    return Math.min(Math.max(h, 320), 680)
  }, [config])

  // Sort cities: capital first, then by population descending
  const sortedCities = useMemo(() => {
    return [...cities].sort((a, b) => {
      if (a.capital) return -1
      if (b.capital) return 1
      return b.pop - a.pop
    })
  }, [cities])

  // Determine which cities get labels (no overlap)
  const citiesWithLabels = useMemo(() => {
    const labeled = []
    const labeledPixels = []
    const zoom = 7 // approximate zoom for overlap calc

    for (const city of sortedCities) {
      const px = latLngToPixel(city.coords[1], city.coords[0], zoom)
      const overlaps = labeledPixels.some(lp => tooClose(px, lp, 35))
      labeled.push({ ...city, showLabel: !overlaps })
      if (!overlaps) labeledPixels.push(px)
    }
    return labeled
  }, [sortedCities])

  if (!config) return <div style={{height:'400px',backgroundColor:'#e8f4f8',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',color:'#888'}}>Map unavailable</div>

  const bounds = config.bounds[0]

  return (
    <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e0ddd5', height: mapHeight + 'px', minHeight: '320px' }}>
      <MapContainer
        style={{ height: mapHeight + 'px', width: '100%' }}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        attributionControl={true}
      >
        {/* Terrain base layer */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri'
          maxZoom={18}
        />

        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}"
          attribution=""
          opacity={0.6}
        />
        <FitBounds bounds={bounds} />

        {citiesWithLabels.map((city) => {
          const isCapital = city.capital
          const dotSize = isCapital ? 6 : city.pop > 2000 ? 5 : city.pop > 500 ? 4 : 3
          const cityName = lang === 'es' ? city.nameEs : city.name

          return (
            <CircleMarker
              key={city.name}
              center={[city.coords[1], city.coords[0]]}
              radius={dotSize}
              pathOptions={{
                fillColor: isCapital ? 'transparent' : '#e07a5f',
                fillOpacity: isCapital ? 0 : 1,
                color: isCapital ? 'transparent' : 'white',
                weight: isCapital ? 0 : 1.5,
              }}
            >
              {city.showLabel && (
                <Tooltip
                  permanent
                  direction="right"
                  offset={[6, 0]}
                  className={`city-label${isCapital ? ' capital-label' : ''}`}
                >
                  {isCapital ? `★ ${cityName}` : cityName}
                </Tooltip>
              )}
            </CircleMarker>
          )
        })}
      </MapContainer>

      <style>{`
        .city-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-family: Georgia, serif !important;
          font-size: 10px !important;
          color: #1a1a2e !important;
          font-weight: normal !important;
          white-space: nowrap !important;
          padding: 0 !important;
          text-shadow: 1px 1px 2px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9), 1px -1px 2px rgba(255,255,255,0.9), -1px 1px 2px rgba(255,255,255,0.9) !important;
        }
        .capital-label {
          font-weight: bold !important;
          font-size: 11px !important;
          color: #1a1a2e !important;
        }
        .leaflet-tooltip::before { display: none !important; }
        .leaflet-container { font-family: Georgia, serif; }
      `}</style>
    </div>
  )
}
