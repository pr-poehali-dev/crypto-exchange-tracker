import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AnimeData {
  id: string;
  title: string;
  titleJP: string;
  year: number;
  episodes: number;
  genre: string[];
  rating: number;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  poster: string;
  featured?: boolean;
}

const animeData: AnimeData[] = [
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    titleJP: '進撃の巨人',
    year: 2013,
    episodes: 75,
    genre: ['Action', 'Drama', 'Fantasy'],
    rating: 9.0,
    description: 'Эпическая история человечества, защищающего себя от гигантских титанов за высокими стенами.',
    status: 'Completed',
    poster: '/img/785eda60-8345-463f-9b73-89bcfe111d35.jpg',
    featured: true
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    titleJP: '鬼滅の刃',
    year: 2019,
    episodes: 32,
    genre: ['Action', 'Supernatural', 'Historical'],
    rating: 8.7,
    description: 'Танджиро Камадо становится охотником на демонов, чтобы спасти свою сестру.',
    status: 'Ongoing',
    poster: '/img/fcb9561b-4af1-4be8-a02a-b6ed43b98c8e.jpg',
    featured: true
  },
  {
    id: 'my-hero-academia',
    title: 'My Hero Academia',
    titleJP: '僕のヒーローアカデミア',
    year: 2016,
    episodes: 138,
    genre: ['Action', 'School', 'Superhero'],
    rating: 8.4,
    description: 'В мире, где почти у всех есть суперсилы, Изуку мечтает стать героем.',
    status: 'Ongoing',
    poster: '/img/36d2636f-db81-4836-8630-c9b15b6e4dd4.jpg'
  },
  {
    id: 'naruto',
    title: 'Naruto',
    titleJP: 'ナルト',
    year: 2002,
    episodes: 720,
    genre: ['Action', 'Adventure', 'Ninja'],
    rating: 8.3,
    description: 'Молодой ниндзя Наруто стремится стать Хокаге своей деревни.',
    status: 'Completed',
    poster: 'https://via.placeholder.com/300x400/6B46C1/FFFFFF?text=NARUTO'
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    titleJP: 'ワンピース',
    year: 1999,
    episodes: 1000,
    genre: ['Adventure', 'Comedy', 'Pirates'],
    rating: 9.1,
    description: 'Пират Луффи и его команда ищут легендарное сокровище One Piece.',
    status: 'Ongoing',
    poster: 'https://via.placeholder.com/300x400/EC4899/FFFFFF?text=ONE+PIECE'
  },
  {
    id: 'death-note',
    title: 'Death Note',
    titleJP: 'デスノート',
    year: 2006,
    episodes: 37,
    genre: ['Psychological', 'Thriller', 'Supernatural'],
    rating: 9.0,
    description: 'Школьник находит тетрадь смерти, способную убивать людей.',
    status: 'Completed',
    poster: 'https://via.placeholder.com/300x400/1E293B/FFFFFF?text=DEATH+NOTE'
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    titleJP: '千と千尋の神隠し',
    year: 2001,
    episodes: 1,
    genre: ['Adventure', 'Family', 'Fantasy'],
    rating: 9.3,
    description: 'Девочка попадает в волшебный мир духов и должна найти путь домой.',
    status: 'Completed',
    poster: 'https://via.placeholder.com/300x400/10B981/FFFFFF?text=SPIRITED+AWAY'
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    titleJP: '呪術廻戦',
    year: 2020,
    episodes: 24,
    genre: ['Action', 'School', 'Supernatural'],
    rating: 8.6,
    description: 'Юдзи поглощает проклятый палец и вступает в школу магии.',
    status: 'Ongoing',
    poster: 'https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=JUJUTSU+KAISEN'
  }
];

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredAnime, setFilteredAnime] = useState(animeData);

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Thriller', 'School', 'Supernatural'];

  useEffect(() => {
    let filtered = animeData;

    if (searchQuery) {
      filtered = filtered.filter(anime => 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.titleJP.includes(searchQuery)
      );
    }

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(anime => anime.genre.includes(selectedGenre));
    }

    setFilteredAnime(filtered);
  }, [searchQuery, selectedGenre]);

  const featuredAnime = animeData.filter(anime => anime.featured);

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-pink/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-neon-pink/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 animate-float">
            <span className="text-6xl">🎌</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 neon-text animate-neon-pulse">
            AnimeVortex
          </h1>
          <p className="text-2xl japanese-text mb-4 text-neon-blue">アニメの世界へようこそ</p>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Погрузись в бесконечную вселенную аниме. Тысячи тайтлов, HD качество, без рекламы.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/90 hover:to-neon-pink/90 neon-border">
              <Icon name="Play" size={24} className="mr-3" />
              Начать просмотр
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-neon-blue hover:bg-neon-blue/10">
              <Icon name="Star" size={24} className="mr-3" />
              Топ аниме
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Anime */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            🔥 Рекомендуемые
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredAnime.map((anime, index) => (
              <Card 
                key={anime.id}
                className="group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-card/80 to-card/40 border border-neon-purple/30 hover:border-neon-pink/50 overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <img 
                    src={anime.poster} 
                    alt={anime.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-neon-purple text-white border-0">
                    {anime.status}
                  </Badge>
                  <div className="absolute top-4 right-4 flex items-center bg-background/80 rounded-full px-3 py-1">
                    <Icon name="Star" size={16} className="text-neon-pink mr-1" />
                    <span className="text-sm font-bold">{anime.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-neon-purple transition-colors">
                      {anime.title}
                    </h3>
                    <p className="text-neon-blue japanese-text">{anime.titleJP}</p>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{anime.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {anime.genre.map(g => (
                      <Badge key={g} variant="outline" className="border-neon-purple/50 text-neon-purple">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{anime.year} год</span>
                    <span>{anime.episodes} эпизодов</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/90 hover:to-neon-pink/90">
                    <Icon name="Play" size={18} className="mr-2" />
                    Смотреть
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderCatalog = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          📚 Каталог аниме
        </h2>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1">
            <Input
              placeholder="Поиск аниме... (например: Naruto или ナルト)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card/50 border-neon-purple/30 focus:border-neon-pink/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className={selectedGenre === genre 
                  ? "bg-gradient-to-r from-neon-purple to-neon-pink" 
                  : "border-neon-purple/50 hover:bg-neon-purple/10"
                }
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAnime.map((anime, index) => (
            <Card 
              key={anime.id}
              className="group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-card/80 to-card/40 border border-neon-purple/30 hover:border-neon-pink/50 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={anime.poster} 
                  alt={anime.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Badge className="absolute top-3 left-3 bg-neon-purple text-white border-0">
                  {anime.status}
                </Badge>
                <div className="absolute top-3 right-3 flex items-center bg-background/80 rounded-full px-2 py-1">
                  <Icon name="Star" size={14} className="text-neon-pink mr-1" />
                  <span className="text-xs font-bold">{anime.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="w-full bg-gradient-to-r from-neon-purple to-neon-pink">
                    <Icon name="Play" size={16} className="mr-2" />
                    Смотреть
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1 group-hover:text-neon-purple transition-colors truncate">
                  {anime.title}
                </h3>
                <p className="text-sm text-neon-blue japanese-text mb-2 truncate">{anime.titleJP}</p>
                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <span>{anime.year}</span>
                  <span>{anime.episodes} эп.</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {anime.genre.slice(0, 2).map(g => (
                    <Badge key={g} variant="outline" className="text-xs border-neon-purple/50 text-neon-purple">
                      {g}
                    </Badge>
                  ))}
                  {anime.genre.length > 2 && (
                    <Badge variant="outline" className="text-xs border-neon-purple/50 text-neon-purple">
                      +{anime.genre.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnime.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </section>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHome();
      case 'catalog':
        return renderCatalog();
      case 'genres':
        return (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                🎭 Жанры
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {genres.slice(1).map((genre, index) => (
                  <Card 
                    key={genre}
                    className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-card/80 to-card/40 border border-neon-purple/30 hover:border-neon-pink/50 cursor-pointer text-center p-8"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-4xl mb-4">
                      {genre === 'Action' && '⚔️'}
                      {genre === 'Adventure' && '🗺️'}
                      {genre === 'Comedy' && '😂'}
                      {genre === 'Drama' && '🎭'}
                      {genre === 'Fantasy' && '🧙‍♂️'}
                      {genre === 'Thriller' && '😱'}
                      {genre === 'School' && '🏫'}
                      {genre === 'Supernatural' && '👻'}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-neon-purple transition-colors">{genre}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {animeData.filter(anime => anime.genre.includes(genre)).length} аниме
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      case 'top':
        return (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                🏆 Топ рейтинг
              </h2>
              <div className="max-w-4xl mx-auto space-y-6">
                {animeData
                  .sort((a, b) => b.rating - a.rating)
                  .map((anime, index) => (
                    <Card 
                      key={anime.id}
                      className="group hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-card/80 to-card/40 border border-neon-purple/30 hover:border-neon-pink/50"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <div className="text-4xl font-bold text-neon-purple w-12 text-center">
                            #{index + 1}
                          </div>
                          <img 
                            src={anime.poster} 
                            alt={anime.title}
                            className="w-20 h-28 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold group-hover:text-neon-purple transition-colors">
                              {anime.title}
                            </h3>
                            <p className="text-neon-blue japanese-text mb-2">{anime.titleJP}</p>
                            <p className="text-muted-foreground mb-3">{anime.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center">
                                <Icon name="Star" size={16} className="text-neon-pink mr-1" />
                                <span className="font-bold">{anime.rating}</span>
                              </div>
                              <span>{anime.year}</span>
                              <span>{anime.episodes} эпизодов</span>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-neon-purple to-neon-pink">
                            <Icon name="Play" size={18} className="mr-2" />
                            Смотреть
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </section>
        );
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-float">🎌</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                  AnimeVortex
                </h1>
                <p className="text-xs text-neon-blue japanese-text">アニメの世界</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-1 bg-card/30 rounded-full p-1 backdrop-blur-sm border border-border/30">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'catalog', label: 'Каталог', icon: 'Grid3X3' },
                { id: 'genres', label: 'Жанры', icon: 'Tags' },
                { id: 'top', label: 'Топ', icon: 'Trophy' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white shadow-lg scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <Icon name={item.icon as any} size={16} className="mr-2" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="hidden md:flex border border-border/50 hover:border-neon-purple/50">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/90 hover:to-neon-pink/90">
                Премиум
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border/30 z-50">
        <div className="flex justify-around py-2">
          {[
            { id: 'home', label: 'Главная', icon: 'Home' },
            { id: 'catalog', label: 'Каталог', icon: 'Grid3X3' },
            { id: 'genres', label: 'Жанры', icon: 'Tags' },
            { id: 'top', label: 'Топ', icon: 'Trophy' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                activeTab === item.id
                  ? 'text-neon-purple'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="pb-20 md:pb-0">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/30 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="text-2xl">🎌</div>
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                AnimeVortex
              </span>
              <p className="text-xs text-neon-blue japanese-text">最高のアニメ体験</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Лучшая платформа для просмотра аниме в HD качестве
          </p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-neon-purple transition-colors">О нас</a>
            <a href="#" className="hover:text-neon-purple transition-colors">Поддержка</a>
            <a href="#" className="hover:text-neon-purple transition-colors">Правила</a>
            <a href="#" className="hover:text-neon-purple transition-colors">Контакты</a>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground">© 2024 AnimeVortex. Погружайся в мир аниме 🌸</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;