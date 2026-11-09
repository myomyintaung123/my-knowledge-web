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

  // Close dropdown when clicking anywhere outside of it
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

          {/* Right: Menu / Settings Toggle Button */}
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

            {/* Dropdown Menu Box */}
            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '40px',
                width: '240px',
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
                {/* Search Bar Inside Dropdown */}
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '600', color: currentTheme.textSub, display: 'block', marginBottom: '4px' }}>
                    ရှာဖွေရန် (Search)
                  </label>
                  <input 
                    type="text"
                    placeholder="ခေါင်းစဉ်ရှာရန်..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: `1px solid ${currentTheme.border}`,
                      outline: 'none',
                      fontSize: '13px',
                      backgroundColor: currentTheme.bg,
                      color: currentTheme.textMain,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Saved Favorites Link */}
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

                {/* Dark Mode Toggle */}
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
        <div style={{ marginTop: '10px', textAlign: 'center', paddingBottom: '6px' }}>
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

      </div>
    </header>
  );
}