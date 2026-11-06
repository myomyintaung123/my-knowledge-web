import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { themes } from './theme';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

function App() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const saved = localStorage.getItem('selectedCategory');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedPost, setSelectedPost] = useState(() => {
    const saved = localStorage.getItem('selectedPost');
    return saved ? JSON.parse(saved) : null;
  });

  const [postSteps, setPostSteps] = useState([]);
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
      fetchPostsForCategory(selectedCategory.id);
    } else {
      localStorage.removeItem('selectedCategory');
      setPosts([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedPost) {
      localStorage.setItem('selectedPost', JSON.stringify(selectedPost));
      fetchPostDetails(selectedPost.id);
    } else {
      localStorage.removeItem('selectedPost');
      setPostSteps([]);
      setVocabularies([]);
    }
  }, [selectedPost]);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase.from('categories').select('*');
    if (error) console.error('Error fetching categories:', error.message);
    else setCategories(data || []);
    setLoading(false);
  }

  async function fetchPostsForCategory(categoryId) {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category_id', categoryId);
    if (error) console.error('Error fetching posts:', error.message);
    else setPosts(data || []);
    setLoading(false);
  }

  async function fetchPostDetails(postId) {
    setLoading(true);
    const { data: stepsData } = await supabase
      .from('post_steps')
      .select('*')
      .eq('post_id', postId)
      .order('step_number', { ascending: true });
    setPostSteps(stepsData || []);

    const { data: vocabData } = await supabase
      .from('vocabularies')
      .select('*')
      .eq('post_id', postId);
    setVocabularies(vocabData || []);

    setLoading(false);
  }

  function handleBack() {
    if (selectedPost) {
      setSelectedPost(null);
      localStorage.removeItem('selectedPost');
    } else {
      setSelectedCategory(null);
      localStorage.removeItem('selectedCategory');
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: currentTheme.bg, color: currentTheme.textMain, fontFamily: 'sans-serif', paddingBottom: '40px', transition: 'background-color 0.3s ease' }}>
      
      {/* Header Component */}
      <Header currentTheme={currentTheme} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Main Content Area */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
        
        {/* Back Button */}
        {(selectedCategory || selectedPost) && (
          <button 
            onClick={handleBack}
            style={{ 
              marginBottom: '20px', 
              padding: '8px 16px', 
              borderRadius: '8px', 
              border: `1px solid ${currentTheme.border}`, 
              background: currentTheme.cardBg, 
              color: currentTheme.textMain, 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ← နောက်သို့ ပြန်သွားရန်
          </button>
        )}

        {selectedPost ? (
          <PostDetail 
            post={selectedPost} 
            postSteps={postSteps} 
            vocabularies={vocabularies} 
            currentTheme={currentTheme} 
            isDarkMode={isDarkMode} 
          />
        ) : selectedCategory && !selectedPost ? (
          <PostList 
            category={selectedCategory} 
            posts={posts} 
            loading={loading} 
            onSelectPost={setSelectedPost} 
            currentTheme={currentTheme} 
          />
        ) : loading ? (
          <p style={{ textAlign: 'center', color: currentTheme.textSub }}>Loading categories...</p>
        ) : (
          <CategoryList 
            categories={categories} 
            onSelectCategory={setSelectedCategory} 
            currentTheme={currentTheme} 
            isDarkMode={isDarkMode} 
          />
        )}
      </main>
    </div>
  );
}

export default App;