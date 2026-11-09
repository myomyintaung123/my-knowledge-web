import { useState, useEffect } from 'react';

export default function Header({ 
  currentTheme, 
  isDarkMode, 
  setIsDarkMode, 
  selectedCategory, 
  selectedPost, 
  handleBack,
  handleGoHome,
  searchQuery,
  setSearchQuery,
  favoritesCount,
  onOpenFavorites
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (isMenuOpen && !event.target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      background: currentTheme.headerBg, 
      color: '#ffffff', 
      padding: '14px 20px', 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      marginBottom: '24px',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Top Main Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Left: Home Button & Back Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {(selectedCategory || selectedPost) && (
              <button 
                onClick={handleGoHome}
                title="ပင်မစာမျက်နှာသို့ သွားရန်"
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  border: 'none', 
                  background: 'rgba(255, 255, 255, 0.25)', 
                  color: '#ffffff', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                🏠 Home
              </button>
            )}

            {(selectedCategory || selectedPost) && (
              <button 
                onClick={handleBack}
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  border: 'none', 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  color: '#ffffff', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                ← နောက်သို့
              </button>
            )}
          </div>

          {/* Right: Menu (Favorites & Dark Mode only) */}
          <div className="menu-container" style={{ position: 'relative', marginLeft: 'auto' }}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                color: '#ffffff', 
                border: 'none', 
                padding: '6px 12px', 
                borderRadius: '20px', 
                cursor: 'pointer', 
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ⚙️ Menu {favoritesCount > 0 && `(❤️ ${favoritesCount})`}
            </button>

            {/* Dropdown Menu Box (Search Bar ကို ဖြုတ်ပြီး Favorites နဲ့ Dark Mode သို့ ပြောင်းထားသည်) */}
            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '40px',
                width: '220px',
                backgroundColor: currentTheme.cardBg,
                color: currentTheme.textMain,
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                border: `1px solid ${currentTheme.border}`,
                zIndex: 1100
              }}>
                <button
                  onClick={() => {
                    onOpenFavorites();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: `1px solid ${currentTheme.border}`,
                    background: currentTheme.bg,
                    color: currentTheme.textMain,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>❤️ Saved Favorites</span>
                  <span style={{ background: '#ff4d4d', color: '#fff', padding: '2px 6px', borderRadius: '10px', fontSize: '11px' }}>
                    {favoritesCount}
                  </span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px', borderTop: `1px solid ${currentTheme.border}` }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Dark Mode</span>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    style={{ 
                      backgroundColor: currentTheme.toggleBg, 
                      color: currentTheme.toggleText, 
                      border: 'none', 
                      padding: '4px 10px',
                      borderRadius: '15px', 
                      cursor: 'pointer', 
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    {isDarkMode ? '🌞 ON' : '🌙 OFF'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Title Header Section */}
        <div style={{ marginTop: '10px', textAlign: 'center', paddingBottom: '8px' }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: 'clamp(18px, 4vw, 24px)', 
            fontWeight: '700',
            lineHeight: '1.4'
          }}>
            လူငယ်များအတွက် <br />
            Knowledge Sharing Platform
          </h1>
        </div>

        {/* 🔍 Global Search Bar Outside (Header အောက်ဘက်တွင် အမြဲပေါ်နေမည်) */}
        <div style={{ marginTop: '10px' }}>
          <input 
            type="text"
            placeholder="🔍 ခေါင်းစဉ် သို့မဟုတ် ကုဒ်ဖြင့် ရှာဖွေရန်..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '24px',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#333333',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              boxSizing: 'border-box'
            }}
          />
        </div>

      </div>
    </header>
  );
}