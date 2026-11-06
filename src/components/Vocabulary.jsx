export default function Vocabulary({ vocabularies, currentTheme, isDarkMode }) {
  if (!vocabularies || vocabularies.length === 0) return null;

  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ color: '#2563eb', borderBottom: `2px solid ${currentTheme.border}`, paddingBottom: '8px' }}>
        ၄။ Vocabulary – ဝေါဟာရများ
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: isDarkMode ? '#1e293b' : '#f1f5f9' }}>
            <th style={{ padding: '12px 16px', border: `1px solid ${currentTheme.border}`, textAlign: 'left', width: '50%' }}>
              English
            </th>
            <th style={{ padding: '12px 16px', border: `1px solid ${currentTheme.border}`, textAlign: 'left', width: '50%' }}>
              မြန်မာအဓိပ္ပာယ်
            </th>
          </tr>
        </thead>
        <tbody>
          {vocabularies.map((vocab) => (
            <tr key={vocab.id}>
              <td style={{ 
                padding: '12px 16px', 
                border: `1px solid ${currentTheme.border}`, 
                fontWeight: '600',
                textAlign: 'left',
                verticalAlign: 'middle'
              }}>
                {vocab.word}
              </td>
              <td style={{ 
                padding: '12px 16px', 
                border: `1px solid ${currentTheme.border}`,
                textAlign: 'left',
                verticalAlign: 'middle'
              }}>
                {vocab.meaning}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}