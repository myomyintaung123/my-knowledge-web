export default function CategoryList({ categories, onSelectCategory, currentTheme, isDarkMode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => onSelectCategory(cat)}
          style={{ 
            padding: '20px', 
            border: `1px solid ${currentTheme.border}`, 
            borderRadius: '12px', 
            background: currentTheme.cardBg, 
            boxShadow: currentTheme.cardShadow,
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h3 style={{ margin: '0 0 8px 0', color: currentTheme.textMain, fontSize: '17px', fontWeight: '600' }}>
            {cat.name}
          </h3>
          <p style={{ margin: 0, color: currentTheme.textSub, fontSize: '13px' }}>
            Slug: <span style={{ fontFamily: 'monospace', background: isDarkMode ? '#0f172a' : '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{cat.slug}</span>
          </p>
        </div>
      ))}
    </div>
  );
}