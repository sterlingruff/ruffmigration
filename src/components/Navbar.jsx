import { Link } from 'react-router-dom'

export default function Navbar({ lang, setLang }) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 24px', backgroundColor: 'white',
      borderBottom: '1px solid #eee', fontFamily: 'Georgia, serif',
      position: 'sticky', top: 0, zIndex: 1000
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#1a1a2e', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }}>
        RUFFMIGRATION
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#1a1a2e' }}>Map</Link>
        <Link to="/about" style={{ textDecoration: 'none', color: '#1a1a2e' }}>About</Link>
        <button onClick={handleShare} style={{
          padding: '6px 14px', borderRadius: '20px', border: '1px solid #1a1a2e',
          backgroundColor: 'white', cursor: 'pointer', fontFamily: 'Georgia, serif',
          fontSize: '0.85rem', color: '#1a1a2e'
        }}>Share</button>
        <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} style={{
          padding: '6px 14px', borderRadius: '20px', border: '1px solid #1a1a2e',
          backgroundColor: 'white', cursor: 'pointer', fontFamily: 'Georgia, serif',
          fontSize: '0.85rem', color: '#1a1a2e'
        }}>{lang === 'en' ? 'ES' : 'EN'}</button>
      </div>
    </nav>
  )
}
