import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Quiz({ postId, currentTheme, isDarkMode }) {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchQuizzesWithOptions() {
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('post_id', postId);

      if (quizError) {
        console.error('Error fetching quizzes:', quizError);
        return;
      }

      if (quizData && quizData.length > 0) {
        const quizzesWithOptions = await Promise.all(
          quizData.map(async (quiz) => {
            const { data: optionsData, error: optError } = await supabase
              .from('quiz_options')
              .select('*')
              .eq('quiz_id', quiz.id);

            return {
              ...quiz,
              quiz_options: optError ? [] : optionsData
            };
          })
        );
        setQuizzes(quizzesWithOptions);
      }
    }

    if (postId) {
      fetchQuizzesWithOptions();
    }
  }, [postId]);

  const handleOptionSelect = (quizId, optionId) => {
    if (submitted) return; // Submitted ပြီးရင် ပြန်မပြောင်းနိုင်အောင် တားမြစ်ခြင်း
    setSelectedAnswers({ ...selectedAnswers, [quizId]: optionId });
  };

  const handleSubmit = () => {
    let currentScore = 0;
    quizzes.forEach((quiz) => {
      const selectedOptId = selectedAnswers[quiz.id];
      const correctOpt = quiz.quiz_options.find((opt) => opt.is_correct);
      if (correctOpt && selectedOptId === correctOpt.id) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };

  if (quizzes.length === 0) return null;

  return (
    <div style={{ marginTop: '30px', padding: '24px', borderRadius: '16px', background: isDarkMode ? '#1e293b' : '#f8fafc', border: `1px solid ${currentTheme.border}`, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)' }}>
      <h3 style={{ color: '#2563eb', marginTop: 0, marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>
        ၆။ Knowledge Check (စစ်ဆေးချက် မေးခွန်းများ)
      </h3>
      
      {quizzes.map((quiz, qIndex) => {
        const selectedOptId = selectedAnswers[quiz.id];
        const correctOpt = quiz.quiz_options?.find((opt) => opt.is_correct);
        const isUserCorrect = submitted && selectedOptId === correctOpt?.id;

        return (
          <div key={quiz.id} style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: qIndex < quizzes.length - 1 ? `1px solid ${currentTheme.border}` : 'none' }}>
            <p style={{ fontWeight: '600', color: currentTheme.textMain, marginBottom: '12px' }}>
              {qIndex + 1}. {quiz.question}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '10px' }}>
              {quiz.quiz_options && quiz.quiz_options.map((opt) => {
                let labelColor = currentTheme.textMain;
                if (submitted) {
                  if (opt.is_correct) labelColor = '#16a34a'; // အမှန်ကို အစိမ်းပြမည်
                  else if (selectedOptId === opt.id) labelColor = '#dc2626'; // ရွေးထားတာမှားရင် အနီပြမည်
                }

                return (
                  <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: submitted ? 'default' : 'pointer', color: labelColor, fontSize: '14px', fontWeight: submitted && (opt.is_correct || selectedOptId === opt.id) ? '600' : '400' }}>
                    <input
                      type="radio"
                      name={`quiz-${quiz.id}`}
                      checked={selectedAnswers[quiz.id] === opt.id}
                      onChange={() => handleOptionSelect(quiz.id, opt.id)}
                      disabled={submitted}
                    />
                    {opt.option_text} {submitted && opt.is_correct && ' ✓'}
                  </label>
                );
              })}
            </div>

            {/* ChatGPT ပုံစံ ရှင်းလင်းချက် Feedback (အဖြေစစ်ပြီးမှ ပေါ်မည်) */}
            {submitted && (
              <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', background: isUserCorrect ? (isDarkMode ? 'rgba(22, 163, 74, 0.15)' : '#f0fdf4') : (isDarkMode ? 'rgba(220, 38, 38, 0.15)' : '#fef2f2'), border: `1px solid ${isUserCorrect ? '#16a34a' : '#dc2626'}`, color: isUserCorrect ? '#16a34a' : '#dc2626', fontSize: '13px', fontWeight: '600' }}>
                {isUserCorrect ? 'မှန်ပါတယ်! ' : 'မှားပါတယ်၊ '} {quiz.explanation_my}
              </div>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          style={{ marginTop: '10px', padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          အဖြေစစ်ဆေးမည်
        </button>
      ) : (
        <div style={{ marginTop: '15px', padding: '12px', background: isDarkMode ? '#0f172a' : '#e2e8f0', borderRadius: '8px', color: currentTheme.textMain, fontWeight: '600', textAlign: 'center' }}>
          ရလဒ် - {score} / {quizzes.length} မှတ် ရရှိပါသည်။
        </div>
      )}
    </div>
  );
}