import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface AnimeData {
  mal_id: number;
  title: string;
  title_japanese: string;
  year: number;
  score: number;
  genres: Array<{ name: string }>;
  synopsis: string;
  status: string;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
    };
  };
  trailer?: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  episodes: number;
  duration: string;
  rating: string;
}

interface User {
  id: string;
  email: string;
  username: string;
}

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [animeList, setAnimeList] = useState<AnimeData[]>([]);
  const [filteredAnime, setFilteredAnime] = useState<AnimeData[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [watchlist, setWatchlist] = useState<number[]>([]);

  // Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'];

  // Fetch popular anime from Jikan API
  const fetchAnime = async (query = '', genre = '') => {
    setIsLoading(true);
    try {
      let url = 'https://api.jikan.moe/v4/anime';
      
      if (query) {
        url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=20`;
      } else if (genre && genre !== 'All') {
        // Get genre ID mapping (simplified)
        const genreMap: Record<string, number> = {
          'Action': 1, 'Adventure': 2, 'Comedy': 4, 'Drama': 8,
          'Fantasy': 10, 'Horror': 14, 'Romance': 22, 'Sci-Fi': 24,
          'Slice of Life': 36, 'Sports': 30, 'Supernatural': 37, 'Thriller': 41
        };
        const genreId = genreMap[genre];
        if (genreId) {
          url = `https://api.jikan.moe/v4/anime?genres=${genreId}&limit=20&order_by=score&sort=desc`;
        }
      } else {
        url = 'https://api.jikan.moe/v4/top/anime?limit=20';
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.data) {
        setAnimeList(data.data);
        setFilteredAnime(data.data);
      }
    } catch (error) {
      console.error('Error fetching anime:', error);
      // Fallback to static data if API fails
      setAnimeList([]);
      setFilteredAnime([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchAnime(searchQuery);
    } else if (selectedGenre !== 'All') {
      fetchAnime('', selectedGenre);
    } else {
      fetchAnime();
    }
  }, [searchQuery, selectedGenre]);

  // Auth functions
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMode === 'login') {
      // Mock login
      const user: User = {
        id: Date.now().toString(),
        email,
        username: email.split('@')[0]
      };
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // Mock register
      const user: User = {
        id: Date.now().toString(),
        email,
        username
      };
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    setShowAuthDialog(false);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    setWatchlist([]);
  };

  const toggleWatchlist = (animeId: number) => {
    if (!currentUser) {
      setShowAuthDialog(true);
      return;
    }
    
    setWatchlist(prev => 
      prev.includes(animeId) 
        ? prev.filter(id => id !== animeId)
        : [...prev, animeId]
    );
  };

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const openPlayer = (anime: AnimeData) => {
    setSelectedAnime(anime);
    setActiveTab('player');
  };

  const closePlayer = () => {
    setSelectedAnime(null);
    setActiveTab('home');
  };

  const renderPlayer = () => {
    if (!selectedAnime) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video glass-effect">
                {selectedAnime.trailer?.embed_url ? (
                  <iframe
                    src={selectedAnime.trailer.embed_url}
                    className="w-full h-full"
                    allowFullScreen
                    title={selectedAnime.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🎬</div>
                      <h3 className="text-xl font-semibold mb-2">Трейлер недоступен</h3>
                      <p className="text-gray-300">Официальный трейлер для этого аниме не найден</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Episode Info */}
              <div className="glass-effect rounded-2xl p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedAnime.title}</h1>
                    <p className="text-purple-300 text-lg">{selectedAnime.title_japanese}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={closePlayer}
                    className="glass-effect border-purple-500/50 text-white hover:bg-purple-500/20"
                  >
                    ✕ Закрыть
                  </Button>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white font-medium">{selectedAnime.score || 'N/A'}</span>
                  </div>
                  <span className="text-gray-300">{selectedAnime.year}</span>
                  <span className="text-gray-300">{selectedAnime.episodes} эпизодов</span>
                  <span className="text-gray-300">{selectedAnime.duration}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedAnime.genres.map((genre, index) => (
                    <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-gray-300 leading-relaxed">{selectedAnime.synopsis}</p>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Информация</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Статус:</span>
                    <span className="text-white">{selectedAnime.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Рейтинг:</span>
                    <span className="text-white">{selectedAnime.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Эпизоды:</span>
                    <span className="text-white">{selectedAnime.episodes || 'Unknown'}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => toggleWatchlist(selectedAnime.mal_id)}
                  className="w-full mt-4 anime-button"
                >
                  {watchlist.includes(selectedAnime.mal_id) ? '❤️ В избранном' : '🤍 Добавить в избранное'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-32 px-4 overflow-hidden"
        style={{
          backgroundImage: `url('/img/ba41a0dc-0c0a-4352-8b16-e472bd1b9c21.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/60 to-blue-900/80"></div>
        <div className="relative container mx-auto text-center">
          <div className="animate-float">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white text-glow">
              AniVerse
            </h1>
            <div className="inline-block anime-gradient bg-clip-text text-transparent text-2xl md:text-3xl font-semibold mb-8">
              Вселенная аниме в твоих руках
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Окунись в мир японской анимации с нашим продвинутым стримингом. 
            Тысячи тайтлов, HD качество, без рекламы.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in">
            <Button size="lg" className="anime-button text-lg px-8 py-4">
              🚀 Начать просмотр
            </Button>
            <Button variant="outline" size="lg" className="glass-effect border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
              📖 Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Anime */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 text-glow">
            🔥 Популярное аниме
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="anime-card h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse">
                  <div className="h-full bg-gray-700/50 rounded-2xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredAnime.slice(0, 10).map((anime, index) => (
                <Card 
                  key={anime.mal_id} 
                  className="anime-card hover-float cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openPlayer(anime)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={anime.images.jpg.large_image_url} 
                      alt={anime.title}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Overlay buttons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="anime-button mr-2">
                        ▶️ Смотреть
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(anime.mal_id);
                        }}
                        className="glass-effect border-white/30 text-white hover:bg-white/10"
                      >
                        {watchlist.includes(anime.mal_id) ? '❤️' : '🤍'}
                      </Button>
                    </div>
                    
                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 glass-effect px-2 py-1 rounded-lg">
                      <div className="flex items-center space-x-1 text-xs">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white font-medium">{anime.score || 'N/A'}</span>
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {anime.status}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2 hover:text-purple-300 transition-colors">
                      {anime.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-1">{anime.title_japanese}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{anime.year}</span>
                      <span className="text-gray-500">{anime.episodes} эп.</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderCatalog = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-glow text-center">
          📚 Каталог аниме
        </h2>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <Input
            placeholder="🔍 Поиск аниме..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="anime-input flex-1"
          />
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="anime-input w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-effect border-purple-500/30">
              {genres.map(genre => (
                <SelectItem key={genre} value={genre} className="text-white hover:bg-purple-500/20">
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="anime-card h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse">
                <div className="h-full bg-gray-700/50 rounded-2xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredAnime.map((anime, index) => (
              <Card 
                key={anime.mal_id} 
                className="anime-card hover-float cursor-pointer group"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => openPlayer(anime)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={anime.images.jpg.image_url} 
                    alt={anime.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="anime-button">
                      ▶️
                    </Button>
                  </div>
                  
                  <div className="absolute top-2 right-2 glass-effect px-2 py-1 rounded-lg">
                    <div className="flex items-center space-x-1 text-xs">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white font-medium">{anime.score || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-3">
                  <h3 className="font-semibold text-white text-xs mb-1 line-clamp-2">{anime.title}</h3>
                  <p className="text-gray-400 text-xs">{anime.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'player':
        return renderPlayer();
      case 'catalog':
        return renderCatalog();
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      {activeTab !== 'player' && (
        <header className="glass-effect border-b border-purple-500/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold anime-gradient bg-clip-text text-transparent">
                  🌟 AniVerse
                </h1>
                <nav className="hidden md:flex space-x-6">
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === 'home' 
                        ? 'anime-gradient text-white font-medium' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    🏠 Главная
                  </button>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === 'catalog' 
                        ? 'anime-gradient text-white font-medium' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    📚 Каталог
                  </button>
                </nav>
              </div>
              
              <div className="flex items-center space-x-4">
                {currentUser ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-white">👋 {currentUser.username}</span>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout}
                      className="glass-effect border-red-500/50 text-red-300 hover:bg-red-500/20"
                    >
                      Выйти
                    </Button>
                  </div>
                ) : (
                  <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                    <DialogTrigger asChild>
                      <Button className="anime-button">
                        🔐 Войти
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-effect border border-purple-500/30">
                      <DialogHeader>
                        <DialogTitle className="text-white text-center text-xl">
                          {authMode === 'login' ? '🔑 Вход в аккаунт' : '✨ Регистрация'}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <form onSubmit={handleAuth} className="space-y-4">
                        {authMode === 'register' && (
                          <Input
                            placeholder="👤 Имя пользователя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="anime-input"
                            required
                          />
                        )}
                        <Input
                          type="email"
                          placeholder="📧 Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="anime-input"
                          required
                        />
                        <Input
                          type="password"
                          placeholder="🔒 Пароль"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="anime-input"
                          required
                        />
                        
                        <Button type="submit" className="w-full anime-button">
                          {authMode === 'login' ? '🚀 Войти' : '✨ Зарегистрироваться'}
                        </Button>
                        
                        <p className="text-center text-gray-300">
                          {authMode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                          <button
                            type="button"
                            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                            className="text-purple-400 hover:text-purple-300 ml-2 underline"
                          >
                            {authMode === 'login' ? 'Регистрация' : 'Войти'}
                          </button>
                        </p>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Content */}
      <main className="scroll-smooth">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;