export default function Header({ currentTheme, isDarkMode, setIsDarkMode }) {
  return (
    <header style={{ 
      background: currentTheme.headerBg, 
      color: '#ffffff', 
      padding: '30px 20px', 
      textAlign: 'center', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '30px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ background: currentTheme.badgeBg, color: currentTheme.badgeText, padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>
            MYO Platform • Knowledge Hub
          </span>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ backgroundColor: currentTheme.toggleBg, color: currentTheme.toggleText, border: 'none', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
          >
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <h1 style={{ margin: '10px 0 8px 0', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '700' }}>
          လူငယ်များအတွက် Knowledge Sharing Platform
        </h1>
        <p style={{ margin: 0, fontSize: 'clamp(14px, 2vw, 16px)', opacity: 0.9 }}>
          အသက် ၁၀ နှစ်မှ ၄၀ အတွင်း လေ့လာနိုင်သော Category ကြီး ၄ ခု
        </p>
      </div>
    </header>
  );
}