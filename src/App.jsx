import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { themes } from './theme';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Footer from './components/Footer';

function App() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // For global search across all posts
  
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const saved = localStorage.getItem('selectedCategory');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedPost, setSelectedPost] = useState(() => {
    const saved = localStorage.getItem('selectedPost');
    return saved ? JSON.parse(saved) : null;
  });

  const [showFavorites, setShowFavorites] = useState(false);
  const [postSteps, setPostSteps] = useState([]);
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchCategories();
    fetchAllPosts();
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

  async function fetchAllPosts() {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) console.error('Error fetching all posts:', error.message);
    else setAllPosts(data || []);
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

  function handleGoHome() {
    setSelectedPost(null);
    setSelectedCategory(null);
    setShowFavorites(false);
    setSearchQuery('');
    localStorage.removeItem('selectedPost');
    localStorage.removeItem('selectedCategory');
  }

  function handleBack() {
    if (showFavorites) {
      setShowFavorites(false);
    } else if (selectedPost) {
      setSelectedPost(null);
      localStorage.removeItem('selectedPost');
    } else {
      setSelectedCategory(null);
      localStorage.removeItem('selectedCategory');
    }
  }

  function toggleFavorite(post) {
    if (favorites.some((fav) => fav.id === post.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== post.id));
    } else {
      setFavorites([...favorites, post]);
    }
  }

  // Filter posts based on search query globally or within category
  const targetPostsForSearch = selectedCategory ? posts : allPosts;
  const filteredPosts = targetPostsForSearch.filter((post) => {
    const q = searchQuery.toLowerCase();
    return (
      post.title_my?.toLowerCase().includes(q) ||
      post.title_en?.toLowerCase().includes(q) ||
      post.article_code?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: currentTheme.bg, color: currentTheme.textMain, fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', transition: 'background-color 0.3s ease' }}>
      
      <Header 
        currentTheme={currentTheme} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        selectedCategory={selectedCategory || showFavorites}
        selectedPost={selectedPost}
        handleBack={handleBack}
        handleGoHome={handleGoHome}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        onOpenFavorites={() => {
          setShowFavorites(true);
          setSelectedPost(null);
          setSelectedCategory(null);
        }}
      />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        
        {/* If user is typing in search bar, show search results directly */}
        {searchQuery.trim() !== '' ? (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: currentTheme.textSub }}>
              🔍 ရှာဖွေတွေ့ရှိမှုများ ({filteredPosts.length})
            </h2>
            {filteredPosts.length === 0 ? (
              <p style={{ textAlign: 'center', color: currentTheme.textSub, marginTop: '40px' }}>
                ရှာဖွေမှုနှင့် ကိုက်ညီသော Post များ မတွေ့ရှိပါ။
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredPosts.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => {
                      setSelectedPost(post);
                      setSearchQuery(''); // Clear search on select
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      backgroundColor: currentTheme.cardBg,
                      border: `1px solid ${currentTheme.border}`,
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '12px', color: currentTheme.badgeText, fontWeight: '600' }}>
                      {post.article_code}
                    </span>
                    <h3 style={{ margin: '6px 0', fontSize: '18px', color: currentTheme.textMain }}>
                      {post.title_my}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', color: currentTheme.textSub }}>
                      {post.title_en}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : showFavorites ? (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', borderBottom: `2px solid ${currentTheme.border}`, paddingBottom: '10px' }}>
              ❤️ Saved Favorites ({favorites.length})
            </h2>
            {favorites.length === 0 ? (
              <p style={{ textAlign: 'center', color: currentTheme.textSub, marginTop: '40px' }}>
                သိမ်းဆည်းထားသော Post များ မရှိသေးပါ။
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {favorites.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => {
                      setSelectedPost(post);
                      setShowFavorites(false);
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      backgroundColor: currentTheme.cardBg,
                      border: `1px solid ${currentTheme.border}`,
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '12px', color: currentTheme.badgeText, fontWeight: '600' }}>
                      {post.article_code}
                    </span>
                    <h3 style={{ margin: '6px 0', fontSize: '18px', color: currentTheme.textMain }}>
                      {post.title_my}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', color: currentTheme.textSub }}>
                      {post.title_en}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : selectedPost ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <button
                onClick={() => toggleFavorite(selectedPost)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: `1px solid ${currentTheme.border}`,
                  background: currentTheme.cardBg,
                  color: currentTheme.textMain,
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                {favorites.some((fav) => fav.id === selectedPost.id) ? '❤️ Saved' : '🤍 Save to Favorites'}
              </button>
            </div>
            <PostDetail 
              post={selectedPost} 
              postSteps={postSteps} 
              vocabularies={vocabularies} 
              currentTheme={currentTheme} 
              isDarkMode={isDarkMode} 
            />
          </div>
        ) : selectedCategory && !selectedPost ? (
          <PostList 
            category={selectedCategory} 
            posts={filteredPosts} 
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

      <Footer currentTheme={currentTheme} />

    </div>
  );
}

export default App;