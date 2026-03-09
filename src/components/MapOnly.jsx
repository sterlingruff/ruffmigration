import { memo } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { migrationData } from '../data/migrationData'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const countryNameMap = {
  'United States of America': 'unitedstates', 'Mexico': 'mexico', 'Guatemala': 'guatemala',
  'Belize': 'belize', 'Honduras': 'honduras', 'El Salvador': 'elsalvador', 'Nicaragua': 'nicaragua',
  'Costa Rica': 'costarica', 'Panama': 'panama', 'Cuba': 'cuba', 'Jamaica': 'jamaica',
  'Haiti': 'haiti', 'Dominican Rep.': 'dominicanrepublic', 'Puerto Rico': 'puertorico',
  'Trinidad and Tobago': 'trinidadandtobago', 'Barbados': 'barbados', 'Colombia': 'colombia',
  'Venezuela': 'venezuela', 'Guyana': 'guyana', 'Suriname': 'suriname', 'Ecuador': 'ecuador',
  'Peru': 'peru', 'Brazil': 'brazil', 'Bolivia': 'bolivia', 'Paraguay': 'paraguay',
  'Chile': 'chile', 'Argentina': 'argentina', 'Uruguay': 'uruguay',
}
const LABELED_CAPITALS = ['unitedstates','brazil','mexico','colombia','argentina','venezuela','peru']

function getColor(countryKey, filter, search) {
  const data = migrationData[countryKey]
  if (!data) return '#d0cfc9'
  const isPositive = data.netMigration >= 0
  const rate = Math.abs(data.netMigration / data.population * 1000)
  if (filter === 'positive' && !isPositive) return null
  if (filter === 'negative' && isPositive) return null
  if (filter === 'highrate' && rate < 2) return null
  if (search && !data.name.toLowerCase().includes(search.toLowerCase())) return '#d0cfc9'
  const intensity = Math.min(rate / 15, 1)
  if (isPositive) return `rgb(${Math.round(178-intensity*120)},${Math.round(210-intensity*60)},${Math.round(160-intensity*100)})`
  return `rgb(${Math.round(230-intensity*30)},${Math.round(150-intensity*120)},${Math.round(150-intensity*120)})`
}

const MapOnly = memo(({ filter, search, onHover, onLeave, onClick }) => (
  <ComposableMap projection="geoMercator" projectionConfig={{ scale: 160, center: [-30, 5] }} style={{ width: '100%', height: '90vh' }}>
    <ZoomableGroup>
      <Geographies geography={GEO_URL}>
        {({ geographies }) => geographies.map(geo => {
          const key = countryNameMap[geo.properties.name]
          const color = getColor(key, filter, search)
          if (color === null) return null
          return (
            <Geography key={geo.rsmKey} geography={geo} fill={color || '#d0cfc9'} stroke="#fff" strokeWidth={0.5}
              style={{ default: { outline: 'none' }, hover: { fill: '#f4a261', outline: 'none', cursor: key ? 'pointer' : 'default' }, pressed: { outline: 'none' } }}
              onMouseEnter={() => key && migrationData[key] && onHover(key)}
              onMouseLeave={onLeave}
              onClick={() => key && onClick(key)}
            />
          )
        })}
      </Geographies>
      {Object.entries(migrationData).map(([k, d]) => d.capitalCoords && (
        <Marker key={k} coordinates={d.capitalCoords}>
          <text textAnchor="middle" y={4} style={{ fontSize: '5px', fill: '#1a1a2e' }}>★</text>
          {LABELED_CAPITALS.includes(k) && <text textAnchor="start" x={8} y={4} style={{ fontSize: '6.5px', fill: '#1a1a2e', fontFamily: 'Georgia, serif' }}>{d.capital}</text>}
        </Marker>
      ))}
    </ZoomableGroup>
  </ComposableMap>
), (prev, next) => prev.filter === next.filter && prev.search === next.search)

export default MapOnly
