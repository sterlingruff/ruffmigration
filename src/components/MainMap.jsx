import { useState, useCallback, memo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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

function getColor(key, filter, search) {
  const d = migrationData[key]
  if (!d) return '#d0cfc9'
  const pos = d.netMigration >= 0
  const rate = Math.abs(d.netMigration / d.population * 1000)
  if (filter === 'positive' && !pos) return null
  if (filter === 'negative' && pos) return null
  if (filter === 'highrate' && rate < 2) return null
  if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.nameEs.toLowerCase().includes(search.toLowerCase())) return '#d0cfc9'
  const i = Math.min(Math.pow(rate / 5, 0.6), 1)
  if (pos) return 'rgb(' + Math.round(178-i*120) + ',' + Math.round(210-i*60) + ',' + Math.round(160-i*100) + ')'
  return 'rgb(' + Math.round(230-i*30) + ',' + Math.round(150-i*120) + ',' + Math.round(150-i*120) + ')'
}

const MapChart = memo(function MapChart({ filter, search, onHover, onLeave, onClick }) {
  return (
    <ComposableMap projection="geoMercator" projectionConfig={{ scale: 160, center: [-30, 5] }} style={{ width: '100%', height: '90vh' }}>
      <ZoomableGroup>
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map(geo => {
            const key = countryNameMap[geo.properties.name]
            const color = getColor(key, filter, search)
            if (color === null) return null
            return (
              <Geography key={geo.rsmKey} geography={geo}
                fill={color || '#d0cfc9'} stroke="#fff" strokeWidth={0.5}
                style={{ default: { outline: 'none' }, hover: { fill: '#f4a261', outline: 'none', cursor: key ? 'pointer' : 'default' }, pressed: { outline: 'none' } }}
                onMouseEnter={() => key && migrationData[key] && onHover(key)}
                onMouseLeave={onLeave}
                onClick={() => key && onClick(key)}
              />
            )
          })}
        </Geographies>
        {Object.entries(migrationData).map(([k, d]) => {
          if (!d.capitalCoords) return null
          return (
            <Marker key={k} coordinates={d.capitalCoords}>
              <text textAnchor="middle" y={4} style={{ fontSize: '5px', fill: '#1a1a2e' }}>&#9733;</text>
              {LABELED_CAPITALS.includes(k) && <text textAnchor="start" x={8} y={4} style={{ fontSize: '6.5px', fill: '#1a1a2e', fontFamily: 'Georgia, serif' }}>{d.capital}</text>}
            </Marker>
          )
        })}
      </ZoomableGroup>
    </ComposableMap>
  )
}, (prev, next) => prev.filter === next.filter && prev.search === next.search)

export default function MainMap({ lang }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [tooltip, setTooltip] = useState(null)
  const [search, setSearch] = useState('')
  const tooltipRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (tooltipRef.current) {
        tooltipRef.current.style.left = (e.clientX + 14) + 'px'
        tooltipRef.current.style.top = (e.clientY - 10) + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const onHover = useCallback((k) => setTooltip(k), [])
  const onLeave = useCallback(() => setTooltip(null), [])
  const onClick = useCallback((k) => navigate('/country/' + k), [navigate])

  const labels = {
    en: { all: 'All Countries', positive: 'Positive Net Migration', negative: 'Negative Net Migration', highrate: 'High Migration Rate' },
    es: { all: 'Todos los paises', positive: 'Migracion neta positiva', negative: 'Migracion neta negativa', highrate: 'Tasa de migracion alta' }
  }
  const fl = labels[lang] || labels.en
  const d = tooltip ? migrationData[tooltip] : null

  return (
    <div style={{ backgroundColor: '#e8f4f8', minHeight: '100vh', width: '100vw', position: 'relative', overflowX: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '16px', flexWrap: 'wrap' }}>
        {['all', 'positive', 'negative', 'highrate'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '8px 20px', borderRadius: '20px', border: '2px solid #1a1a2e',
            backgroundColor: filter === f ? '#1a1a2e' : 'white',
            color: filter === f ? 'white' : '#1a1a2e',
            cursor: 'pointer', fontFamily: 'Georgia, serif', fontWeight: '500'
          }}>{fl[f]}</button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
        <input type="text" placeholder="Search country..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1a1a2e', fontFamily: 'Georgia, serif', fontSize: '0.9rem', width: '240px', outline: 'none' }} />
        {search && <button onClick={() => setSearch('')} style={{ marginLeft: '8px', padding: '8px 14px', borderRadius: '20px', border: '1px solid #1a1a2e', cursor: 'pointer', fontFamily: 'Georgia, serif' }}>x</button>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '8px', fontFamily: 'Georgia, serif', fontSize: '0.8rem', color: '#333' }}>
        <span><span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#52b788', borderRadius: '2px', marginRight: '5px' }}></span>Positive Net Migration</span>
        <span><span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#e63946', borderRadius: '2px', marginRight: '5px' }}></span>Negative Net Migration</span>
        <span>&#9733; Capital City</span>
      </div>
      <MapChart filter={filter} search={search} onHover={onHover} onLeave={onLeave} onClick={onClick} />
      {d && (
        <div ref={tooltipRef} style={{ position: 'fixed', left: 0, top: 0, backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', padding: '12px 16px', pointerEvents: 'none', zIndex: 9999, fontFamily: 'Georgia, serif', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', minWidth: '240px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px', borderBottom: '1px solid #eee', paddingBottom: '6px', color: '#1a1a2e' }}>{lang === 'es' ? d.nameEs : d.name}</div>
          <div style={{ marginBottom: '4px', color: '#555', fontSize: '0.85rem' }}>&#9733; {d.capital}</div>
          <div style={{ marginBottom: '4px', color: '#333' }}>Net Migration (2023): <span style={{ color: d.netMigration >= 0 ? '#2d6a4f' : '#9b2226', fontWeight: 'bold' }}>{d.netMigration >= 0 ? '+' : ''}{d.netMigration.toLocaleString()}</span></div>
          <div style={{ marginBottom: '4px', color: '#333' }}>Migration Rate (per 1,000): <span style={{ color: d.netMigration >= 0 ? '#2d6a4f' : '#9b2226', fontWeight: 'bold' }}>{d.netMigration >= 0 ? '+' : ''}{(d.netMigration / d.population * 1000).toFixed(2)}</span></div>
          <div style={{ color: '#333' }}>Population: <span style={{ fontWeight: 'bold' }}>{d.population.toLocaleString()}</span></div>
        </div>
      )}
      <div style={{ textAlign: 'center', padding: '8px', fontSize: '0.75rem', color: '#555', fontFamily: 'Georgia, serif' }}>
        Sources: UN World Population Prospects 2024, World Bank 2023 | Data: 2022-2024
      </div>
    </div>
  )
}
