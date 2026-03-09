import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell
} from 'recharts'
import { migrationData } from '../data/migrationData'
import { historicalData } from '../data/countryHistoricalData'
import { pyramidData } from '../data/pyramidData'
import { bilateralMigration } from '../data/bilateralMigration'
import CountryMapView from '../components/CountryMapView'

const AGE_GROUPS = ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69','70-74','75+']

const COLORS = {
  positive: '#52b788',
  negative: '#e63946',
  navy: '#1a1a2e',
  terracotta: '#e07a5f',
  blue: '#3a7ca5',
  cream: '#f8f7f2',
  lightGray: '#f0efea',
  textMuted: '#888',
  border: '#e0ddd5',
}

const T = {
  en: {
    back: '← Back to Map',
    population: 'Population',
    netMigration: 'Net Migration',
    migrationRate: 'Migration Rate / 1,000',
    demographicProfile: 'Demographic Profile',
    generating: 'Generating analysis…',
    pyramidTitle: 'Population Pyramid',
    male: 'Male',
    female: 'Female',
    netMigChart: 'Net Migration Over Time (thousands/yr)',
    popChart: 'Population Over Time (millions)',
    birthChart: 'Birth Rate Over Time (per 1,000)',
    stockChart: 'Foreign-Born Population (%)',
    topOrigins: 'Top 5 Countries of Origin',
    topDests: 'Top 5 Destination Countries',
    originsNote: 'Estimated migrant stock: people born in these countries now living here',
    destsNote: 'Estimated migrant stock: people born here now living in these countries',
    disclaimer: '* Bilateral migration figures are estimates based on UN IOM data and should be interpreted with caution. Measurement of international migrant stocks is inherently imprecise.',
    sources: 'Sources: UN World Population Prospects 2024 · UN IOM Migration Data Portal · World Bank Open Data · CIA World Factbook',
    errorMsg: 'Unable to generate synthesis at this time.',
    retryBtn: 'Retry',
    perYear: '/yr',
    thousands: 'K',
    millions: 'M',
  },
  es: {
    back: '← Volver al Mapa',
    population: 'Población',
    netMigration: 'Migración Neta',
    migrationRate: 'Tasa Migración / 1,000',
    demographicProfile: 'Perfil Demográfico',
    generating: 'Generando análisis…',
    pyramidTitle: 'Pirámide Poblacional',
    male: 'Hombre',
    female: 'Mujer',
    netMigChart: 'Migración Neta a lo largo del tiempo (miles/año)',
    popChart: 'Población a lo largo del tiempo (millones)',
    birthChart: 'Tasa de Natalidad a lo largo del tiempo (por 1,000)',
    stockChart: 'Población Nacida en el Extranjero (%)',
    topOrigins: 'Top 5 Países de Origen',
    topDests: 'Top 5 Países de Destino',
    originsNote: 'Stock de migrantes estimado: personas nacidas en estos países que viven aquí',
    destsNote: 'Stock de migrantes estimado: personas nacidas aquí que viven en estos países',
    disclaimer: '* Las cifras de migración bilateral son estimaciones basadas en datos de la OIM de la ONU y deben interpretarse con cautela. La medición del stock de migrantes internacionales es inherentemente imprecisa.',
    sources: 'Fuentes: Perspectivas de Población Mundial ONU 2024 · Portal de Datos de Migración OIM · Banco Mundial · CIA World Factbook',
    errorMsg: 'No se pudo generar el análisis en este momento.',
    retryBtn: 'Reintentar',
    perYear: '/año',
    thousands: 'K',
    millions: 'M',
  },
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '6px',
      padding: '28px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 8px rgba(0,0,0,0.04)',
      border: `1px solid ${COLORS.border}`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: '0.68rem',
      letterSpacing: '2.5px',
      textTransform: 'uppercase',
      color: COLORS.textMuted,
      marginBottom: '16px',
      fontFamily: 'Georgia, serif',
    }}>
      {children}
    </div>
  )
}

function SkeletonLine({ width = '100%' }) {
  return (
    <div style={{
      height: '15px',
      backgroundColor: '#ebebeb',
      borderRadius: '3px',
      marginBottom: '10px',
      width,
      animation: 'shimmer 1.6s ease-in-out infinite',
    }} />
  )
}

function CustomBarTooltip({ active, payload, label, lang }) {
  if (active && payload && payload.length) {
    const v = payload[0].value
    return (
      <div style={{ backgroundColor: 'white', border: `1px solid ${COLORS.border}`, borderRadius: '4px', padding: '8px 12px', fontSize: '0.8rem', fontFamily: 'Georgia, serif' }}>
        <div style={{ color: COLORS.textMuted, marginBottom: '2px' }}>{label}</div>
        <div style={{ color: v >= 0 ? COLORS.positive : COLORS.negative, fontWeight: 'bold' }}>
          {v >= 0 ? '+' : ''}{v.toLocaleString()}K
        </div>
      </div>
    )
  }
  return null
}

export default function CountryPage({ lang }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const country = migrationData[id]
  const hist = historicalData[id]
  const pyramid = pyramidData[id]
  const bilateral = bilateralMigration[id]

  const [synthesis, setSynthesis] = useState('')
  const [synLoading, setSynLoading] = useState(true)
  const [synError, setSynError] = useState(null)

  const generateSynthesis = useCallback(async () => {
    if (!country || !hist || !bilateral) return
    setSynLoading(true)
    setSynthesis('')
    setSynError(null)

    try {
      const countryName = lang === 'es' ? country.nameEs : country.name
      const latestBirth = hist.birthRate[hist.birthRate.length - 1].value
      const latestStock = hist.immigrantStock[hist.immigrantStock.length - 1].value
      const migRate = (country.netMigration / country.population * 1000).toFixed(2)
      const origNames = bilateral.origins.map(o => lang === 'es' ? o.countryEs : o.country).slice(0,3).join(', ')
      const destNames = bilateral.destinations.map(d => lang === 'es' ? d.countryEs : d.country).slice(0,3).join(', ')
      const prevMig = country.previousNetMigration
      const trend = country.netMigration > prevMig ? (lang === 'es' ? 'aumentando' : 'increasing') : (lang === 'es' ? 'disminuyendo' : 'decreasing')
      const pop1960 = hist.population[0].value
      const popNow = country.population / 1000000
      const popGrowthX = (popNow / pop1960).toFixed(1)
      const br1960 = hist.birthRate[0].value
      const stockPeak = Math.max(...hist.immigrantStock.map(d => d.value))

      const langStr = lang === 'es' ? 'Spanish (Español)' : 'English'

      const prompt = `You are a senior correspondent for The Economist writing a demographic profile for a data-journalism project on migration in the Americas.

Write exactly 3 paragraphs in ${langStr}. Total: approximately 280-320 words. No bullet points, no headers, no lists — pure analytical prose.

Weave in at minimum:
- 15 demographic facts: population size and growth trajectory, net migration balance and trend, emigration and immigration patterns, urbanization rate, median age, birth rate trends, fertility transition, age dependency ratio, diaspora significance, remittance economy (if relevant), ethnic or indigenous composition (if notable), notable demographic shocks (earthquakes, economic crises, political upheaval affecting demography)
- 5 geographic facts: physical size, location and neighbors, major terrain features or altitude that affect population distribution, climate zones, coastline or landlocked status

Data for ${countryName}:
- Population: ${country.population.toLocaleString()} (${popNow.toFixed(1)}M)
- Population in 1960: ~${pop1960}M → growth of ${popGrowthX}× over 60 years
- Net migration 2023: ${country.netMigration >= 0 ? '+' : ''}${country.netMigration.toLocaleString()} (trend: ${trend} vs prior year of ${prevMig.toLocaleString()})
- Migration rate per 1,000: ${migRate}
- Capital: ${country.capital}
- Current birth rate: ~${latestBirth}/1,000
- Birth rate in 1960: ~${br1960}/1,000
- Foreign-born population: ~${latestStock}% of total (peak in data: ~${stockPeak}%)
- Top 3 immigrant origin countries: ${origNames}
- Top 3 emigrant destination countries: ${destNames}

Tone: authoritative, analytical, slightly wry — The Economist's voice. Data-precise. Where figures are estimated or uncertain, briefly note it with phrases like "estimates suggest" or "roughly." Open with a striking, unexpected, or counterintuitive observation. Second paragraph: focus on migration dynamics specifically. Third paragraph: demographic trajectory and outlook — where is this country headed demographically?

Output ONLY the 3 paragraphs. Nothing else.`

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      const data = await res.json()
      if (data.content && data.content[0] && data.content[0].text) {
        setSynthesis(data.content[0].text.trim())
      } else {
        throw new Error('No content')
      }
    } catch (e) {
      setSynError(true)
    } finally {
      setSynLoading(false)
    }
  }, [id, lang])

  useEffect(() => {
    generateSynthesis()
  }, [generateSynthesis])

  if (!country || !hist || !pyramid || !bilateral) {
    return (
      <div style={{ fontFamily: 'Georgia, serif', padding: '80px', textAlign: 'center', color: COLORS.textMuted }}>
        Country not found.{' '}
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Georgia, serif' }}>
          Return to map
        </button>
      </div>
    )
  }

  const l = T[lang] || T.en
  const isPos = country.netMigration >= 0
  const migRate = (country.netMigration / country.population * 1000).toFixed(2)
  const countryName = lang === 'es' ? country.nameEs : country.name

  const pyramidChartData = pyramid.map((row, i) => ({
    age: AGE_GROUPS[i],
    male: -parseFloat(row[0].toFixed(2)),
    female: parseFloat(row[1].toFixed(2)),
  }))

  const maxPyramidVal = Math.max(...pyramid.map(r => Math.max(r[0], r[1])))

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: COLORS.cream, minHeight: '100vh' }}>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes shimmer {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .synthesis-text { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>

      {/* ── Hero Header ── */}
      <div style={{
        backgroundColor: COLORS.navy,
        color: 'white',
        padding: '0',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 32px 0' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.85)',
              padding: '7px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              fontSize: '0.82rem',
              letterSpacing: '0.5px',
            }}
          >
            {l.back}
          </button>
        </div>

        <div style={{ textAlign: 'center', padding: '24px 32px 0' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 'normal',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            margin: '0 0 8px',
            lineHeight: 1.1,
          }}>
            {countryName}
          </h1>
          <div style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: '32px' }}>
            {country.capital}
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
        }}>
          {[
            { label: l.population, value: (country.population / 1000000).toFixed(1) + 'M', accent: false },
            { label: l.netMigration + ' (2023)', value: (isPos ? '+' : '') + country.netMigration.toLocaleString(), accent: true },
            { label: l.migrationRate, value: (isPos ? '+' : '') + migRate, accent: true },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '20px 48px',
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none',
            }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '6px' }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'normal',
                color: stat.accent ? (isPos ? '#7ecdaa' : '#f4777f') : 'white',
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '52px 32px 60px' }}>

        {/* Row 1: Synthesis + Pyramid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '32px',
          marginBottom: '32px',
          alignItems: 'start',
        }}>

          {/* Synthesis */}
          <Card>
            <SectionLabel>{l.demographicProfile}</SectionLabel>
            {synLoading ? (
              <div>
                <div style={{ color: COLORS.textMuted, fontSize: '0.82rem', marginBottom: '20px', fontStyle: 'italic' }}>{l.generating}</div>
                {[1,2,3].map(para => (
                  <div key={para} style={{ marginBottom: '24px' }}>
                    <SkeletonLine /><SkeletonLine /><SkeletonLine /><SkeletonLine width="72%" />
                  </div>
                ))}
              </div>
            ) : synError ? (
              <div>
                <p style={{ color: COLORS.textMuted, marginBottom: '12px' }}>{l.errorMsg}</p>
                <button onClick={generateSynthesis} style={{
                  padding: '8px 20px', border: `1px solid ${COLORS.navy}`, borderRadius: '20px',
                  backgroundColor: 'white', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.85rem',
                }}>{l.retryBtn}</button>
              </div>
            ) : (
              <div className="synthesis-text">
                {synthesis.split(/\n\n+/).filter(p => p.trim()).map((para, i) => (
                  <p key={i} style={{
                    lineHeight: '1.85',
                    marginBottom: i < synthesis.split(/\n\n+/).length - 1 ? '22px' : '0',
                    fontSize: '1.0rem',
                    color: '#1a1a1a',
                    textAlign: 'justify',
                    hyphens: 'auto',
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            )}
          </Card>

          {/* Population Pyramid */}
          <Card style={{ padding: '24px' }}>
            <SectionLabel style={{ textAlign: 'center' }}>{l.pyramidTitle}</SectionLabel>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px', fontSize: '0.75rem', color: COLORS.textMuted }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: COLORS.navy, borderRadius: '2px', display: 'inline-block' }} />
                {l.male}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: COLORS.terracotta, borderRadius: '2px', display: 'inline-block' }} />
                {l.female}
              </span>
            </div>
            <div style={{ width: '100%' }}>
              {pyramid.map((row, i) => {
                const male = row[0]
                const female = row[1]
                const malePct = (male / maxPyramidVal * 100).toFixed(1)
                const femalePct = (female / maxPyramidVal * 100).toFixed(1)
                return (
                  <div key={AGE_GROUPS[i]} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ width: '45%', display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{ width: malePct + '%', height: '14px', backgroundColor: COLORS.navy, borderRadius: '2px 0 0 2px' }} />
                    </div>
                    <div style={{ width: '10%', textAlign: 'center', fontSize: '8px', color: '#aaa', fontFamily: 'Georgia, serif' }}>{AGE_GROUPS[i]}</div>
                    <div style={{ width: '45%' }}>
                      <div style={{ width: femalePct + '%', height: '14px', backgroundColor: COLORS.terracotta, borderRadius: '0 2px 2px 0' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Row 2: 4 Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '32px',
        }}>

          {/* Net Migration */}
          <Card style={{ padding: '24px' }}>
            <SectionLabel>{l.netMigChart}</SectionLabel>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hist.netMigration} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#aaa', fontFamily: 'Georgia, serif' }} />
                <YAxis tick={{ fontSize: 9, fill: '#aaa', fontFamily: 'Georgia, serif' }} width={36} />
                <Tooltip content={<CustomBarTooltip lang={lang} />} />
                <ReferenceLine y={0} stroke="#ccc" />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {hist.netMigration.map((entry, i) => (
                    <Cell key={i} fill={entry.value >= 0 ? COLORS.positive : COLORS.negative} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Population */}
          <Card style={{ padding: '24px' }}>
            <SectionLabel>{l.popChart}</SectionLabel>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={hist.population} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <defs>
                  <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.navy} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={COLORS.navy} stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#aaa', fontFamily: 'Georgia, serif' }} />
                <YAxis tick={{ fontSize: 9, fill: '#aaa', fontFamily: 'Georgia, serif' }} width={36} />
                <Tooltip
                  formatter={v => [v + 'M', lang === 'es' ? 'Población' : 'Population']}
                  contentStyle={{ fontFamily: 'Georgia, serif', fontSize: '0.8rem', border: `1px solid ${COLORS.border}` }}
                />
                <Area type="monotone" dataKey="value" stroke={COLORS.navy} fill="url(#popGrad)" strokeWidth={2} dot={{ r: 2.5, fill: COLORS.navy }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Birth Rate */}
          <Card style={{ padding: '24px' }}>
            <SectionLabel>{l.birthChart}</SectionLabel>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={hist.birthRate} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#aaa', fontFamily: 'Georgia, serif' }} />
                <YAxis tick={{ fontSize: 9, fill: '#aaa', fontFamily: 'Georgia, serif' }} width={36} />
                <Tooltip
                  formatter={v => [v + '/1,000', lang === 'es' ? 'Tasa natalidad' : 'Birth rate']}
                  contentStyle={{ fontFamily: 'Georgia, serif', fontSize: '0.8rem', border: `1px solid ${COLORS.border}` }}
                />
                <Line type="monotone" dataKey="value" stroke={COLORS.terracotta} strokeWidth={2.5} dot={{ r: 3, fill: COLORS.terracotta }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Immigrant Stock */}
          <Card style={{ padding: '24px' }}>
            <SectionLabel>{l.stockChart}</SectionLabel>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={hist.immigrantStock} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <defs>
                  <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#aaa', fontFamily: 'Georgia, serif' }} />
                <YAxis tick={{ fontSize: 9, fill: '#aaa', fontFamily: 'Georgia, serif' }} tickFormatter={v => v + '%'} width={36} />
                <Tooltip
                  formatter={v => [v + '%', lang === 'es' ? 'Nacidos en el extranjero' : 'Foreign-born']}
                  contentStyle={{ fontFamily: 'Georgia, serif', fontSize: '0.8rem', border: `1px solid ${COLORS.border}` }}
                />
                <Area type="monotone" dataKey="value" stroke={COLORS.blue} fill="url(#stockGrad)" strokeWidth={2.5} dot={{ r: 2.5, fill: COLORS.blue }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Row 3: Bilateral Migration */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '40px',
        }}>

          {/* Origins */}
          <Card>
            <SectionLabel>{l.topOrigins}</SectionLabel>
            <p style={{ fontSize: '0.78rem', color: '#bbb', marginBottom: '24px', marginTop: '-8px', lineHeight: '1.5' }}>{l.originsNote}</p>
            {bilateral.origins.map((o, i) => {
              const pct = Math.round(o.value / bilateral.origins[0].value * 100)
              return (
                <div key={i} style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>
                      <span style={{ color: COLORS.textMuted, marginRight: '8px', fontSize: '0.8rem' }}>{i + 1}</span>
                      {lang === 'es' ? o.countryEs : o.country}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: COLORS.textMuted }}>
                      ~{o.value >= 1000 ? (o.value / 1000).toFixed(1) + 'M' : o.value.toLocaleString() + 'K'}
                    </span>
                  </div>
                  <div style={{ height: '3px', backgroundColor: '#f0f0f0', borderRadius: '2px' }}>
                    <div style={{
                      height: '100%',
                      width: pct + '%',
                      backgroundColor: COLORS.blue,
                      borderRadius: '2px',
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              )
            })}
          </Card>

          {/* Destinations */}
          <Card>
            <SectionLabel>{l.topDests}</SectionLabel>
            <p style={{ fontSize: '0.78rem', color: '#bbb', marginBottom: '24px', marginTop: '-8px', lineHeight: '1.5' }}>{l.destsNote}</p>
            {bilateral.destinations.map((d, i) => {
              const pct = Math.round(d.value / bilateral.destinations[0].value * 100)
              return (
                <div key={i} style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>
                      <span style={{ color: COLORS.textMuted, marginRight: '8px', fontSize: '0.8rem' }}>{i + 1}</span>
                      {lang === 'es' ? d.countryEs : d.country}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: COLORS.textMuted }}>
                      ~{d.value >= 1000 ? (d.value / 1000).toFixed(1) + 'M' : d.value.toLocaleString() + 'K'}
                    </span>
                  </div>
                  <div style={{ height: '3px', backgroundColor: '#f0f0f0', borderRadius: '2px' }}>
                    <div style={{
                      height: '100%',
                      width: pct + '%',
                      backgroundColor: COLORS.terracotta,
                      borderRadius: '2px',
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              )
            })}
          </Card>
        </div>

        {/* Map */}
        <div style={{ backgroundColor: 'white', borderRadius: '6px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #e0ddd5', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#888', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>{l.countryMap}</div>
          <CountryMapView countryId={id} lang={lang} />
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: '24px',
          fontSize: '0.72rem',
          color: '#bbb',
          lineHeight: '1.7',
        }}>
          <p style={{ marginBottom: '6px' }}>* {l.disclaimer.replace('* ', '')}</p>
          <p>{l.sources}</p>
        </div>
      </div>
    </div>
  )
}
