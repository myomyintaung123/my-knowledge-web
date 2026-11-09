// src/theme.js - Dark နှင့် Light Mode အတွက် အရောင်များသီးသန့်ခွဲထုတ်ထားခြင်း
export const themes = {
  light: {
    bg: '#f8fafc',
    cardBg: '#ffffff',
    textMain: '#1e293b',
    textSub: '#64748b',
    border: '#e2e8f0',
    headerBg: 'linear-gradient(135deg, #3b82f6, #2563eb)', // ပိုမိုလင်းထိန်သော အပြာရောင် Gradient
    headerText: '#ffffff', // Header စာသားအရောင်
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
    headerBg: 'linear-gradient(135deg, #334155, #1e293b)', // Dark mode အတွက် ပိုမိုလင်းပြီး သပ်ရပ်သော Slate အရောင်
    headerText: '#f8fafc', // Dark mode တွင် စာသားများ ရှင်းလင်းစွာ ပေါ်စေရန်
    badgeBg: 'rgba(255, 255, 255, 0.15)',
    badgeText: '#38bdf8',
    cardShadow: '0 4px 6px rgba(0,0,0,0.3)',
    toggleBg: '#334155',
    toggleText: '#f8fafc',
  }
};