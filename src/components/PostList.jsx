export default function PostList({ category, posts, loading, onSelectPost, currentTheme }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>{category.name} ဆောင်းပါးများ</h2>
      </div>

      {loading ? (
        <p style={{ color: currentTheme.textSub }}>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: currentTheme.textSub }}>ဒီ Category မှာ ဆောင်းပါး မရှိသေးပါ၊၊</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {posts.map((post) => (
            <div 
              key={post.id}
              onClick={() => onSelectPost(post)}
              style={{ padding: '20px', border: `1px solid ${currentTheme.border}`, borderRadius: '12px', background: currentTheme.cardBg, cursor: 'pointer', boxShadow: currentTheme.cardShadow }}
            >
              <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 'bold' }}>{post.article_code}</span>
              <h3 style={{ margin: '6px 0 6px 0', color: currentTheme.textMain }}>{post.title_my}</h3>
              <p style={{ margin: 0, color: currentTheme.textSub, fontSize: '14px' }}>{post.title_en}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}