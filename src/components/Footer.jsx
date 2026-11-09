export default function Footer({ currentTheme }) {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '24px 16px',
      marginTop: '40px',
      borderTop: `1px solid ${currentTheme.border || '#eaeaea'}`,
      color: currentTheme.textSub || '#666',
      fontSize: '13px',
      lineHeight: '1.6'
    }}>
      <p style={{ margin: '0 0 6px 0', fontWeight: '600' }}>
        MYO Platform • Knowledge Hub
      </p>
      <p style={{ margin: 0 }}>
        အသက် ၁၀ နှစ်မှ ၄၀ အတွင်း လေ့လာနိုင်သော Category ကြီး ၄ ခု
      </p>
    </footer>
  );
}