// src/theme.js - Dark နှင့် Light Mode အတွက် အရောင်များသီးသန့်ခွဲထုတ်ထားခြင်း
export const themes = {
  light: {
    bg: '#f8fafc',
    cardBg: '#ffffff',
    textMain: '#1e293b',
    textSub: '#64748b',
    border: '#e2e8f0',
    headerBg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    badgeBg: 'rgba(255, 255, 255, 0.2)',
    badgeText: '#ffffff',
    cardShadow: '0 2px 4px rgba(0,0,0,0.02)',
    toggleBg: '#ffffff',
    toggleText: '#1e293b',
  },
  dark: {
    bg: '#0f172a',
    cardBg: '#1e293b',
    textMain: '#f8fafc',
    textSub: '#94a3b8',
    border: '#334155',
    headerBg: 'linear-gradient(135deg, #1e293b, #020617)',
    badgeBg: 'rgba(255, 255, 255, 0.1)',
    badgeText: '#38bdf8',
    cardShadow: '0 4px 6px rgba(0,0,0,0.3)',
    toggleBg: '#334155',
    toggleText: '#f8fafc',
  }
};