import Vocabulary from './Vocabulary';
import Quiz from './Quiz'; // ဒီလိုင်း ပါရပါမည်

export default function PostDetail({ post, postSteps, vocabularies, currentTheme, isDarkMode }) {
  return (
    <article style={{ background: currentTheme.cardBg, padding: '24px', borderRadius: '12px', border: `1px solid ${currentTheme.border}`, boxShadow: currentTheme.cardShadow }}>
      <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 'bold', background: isDarkMode ? '#1e293b' : '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
        {post.article_code}
      </span>
      <h2 style={{ color: currentTheme.textMain, marginTop: '12px' }}>{post.title_my}</h2>
      <h4 style={{ color: currentTheme.textSub, marginTop: '-5px', fontStyle: 'italic' }}>{post.title_en}</h4>
      
      {post.cover_image && (
        <img src={post.cover_image} alt="Cover" style={{ width: '100%', maxHeight: '380px', objectFit: 'cover', borderRadius: '10px', margin: '20px 0', border: `1px solid ${currentTheme.border}` }} />
      )}

      <hr style={{ borderColor: currentTheme.border, margin: '20px 0' }} />
      
      {/* မြန်မာဘာသာ အကြောင်းအရာ */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: '#2563eb', borderBottom: `2px solid ${currentTheme.border}`, paddingBottom: '8px' }}>၁။ မြန်မာဘာသာဖြင့် လေ့လာကြမည်</h3>
        <div style={{ lineHeight: '1.8', fontSize: '15px', color: currentTheme.textMain, textAlign: 'left' }}>
          {post.content_my.split('\n').map((line, index) => {
            if (line.trim().startsWith('ဥပမာအားဖြင့်')) {
              return <p key={index} style={{ margin: '12px 0 6px 0', fontWeight: 'bold' }}>{line}</p>;
            }
            return line.trim() ? <p key={index} style={{ margin: '0 0 12px 0' }}>{line}</p> : null;
          })}
        </div>
      </div>

      {/* အင်္ဂလိပ်ဘာသာ အကြောင်းအရာ */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: '#2563eb', borderBottom: `2px solid ${currentTheme.border}`, paddingBottom: '8px' }}>၂။ English Version</h3>
        <p style={{ lineHeight: '1.8', whiteSpace: 'pre-line', textAlign: 'left', fontSize: '15px' }}>{post.content_en}</p>
      </div>

      {/* Post Steps */}
      {postSteps.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#2563eb', borderBottom: `2px solid ${currentTheme.border}`, paddingBottom: '8px' }}>၃။ လုပ်ဆောင်ချက် အဆင့်ဆင့်</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
            {postSteps.map((step) => (
              <div key={step.id} style={{ border: `1px solid ${currentTheme.border}`, borderRadius: '16px', background: isDarkMode ? '#1e293b' : '#ffffff', overflow: 'hidden' }}>
                {step.image_url && (
                  <img src={step.image_url} alt={step.title_my} style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', display: 'block' }} />
                )}
                <div style={{ padding: '20px' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: currentTheme.textMain, fontSize: '16px' }}>{step.step_number}. {step.title_my}</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: currentTheme.textSub }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ၄။ Vocabularies Component */}
      <Vocabulary vocabularies={vocabularies} currentTheme={currentTheme} isDarkMode={isDarkMode} />

      {/* ၅။ မှတ်သားသင့်တဲ့ ဗဟုသုတ (Note) */}
      {post.note_my && (
        <div style={{ marginBottom: '24px', padding: '20px', borderRadius: '16px', background: isDarkMode ? '#1e293b' : '#f8fafc', border: `1px solid ${currentTheme.border}`, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)' }}>
          <h3 style={{ color: '#2563eb', marginTop: 0, marginBottom: '10px', fontSize: '16px', fontWeight: '700' }}>
            ၅။ မှတ်သားသင့်တဲ့ ဗဟုသုတ
          </h3>
          <p style={{ margin: 0, lineHeight: '1.8', fontSize: '15px', color: currentTheme.textMain, whiteSpace: 'pre-line', textAlign: 'left' }}>
            {post.note_my}
          </p>
        </div>
      )}

      {/* ၆။ Knowledge Check Quiz Component */}
      <Quiz postId={post.id} currentTheme={currentTheme} isDarkMode={isDarkMode} />

    </article>
  );
}