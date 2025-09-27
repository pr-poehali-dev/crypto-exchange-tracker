import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Episode {
  id: number;
  title: string;
  duration: string;
  description: string;
}

interface Season {
  id: number;
  title: string;
  episodes: Episode[];
}

interface AnimeData {
  id: string;
  title: string;
  titleJP: string;
  year: number;
  genre: string[];
  rating: number;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  poster: string;
  cover: string;
  seasons: Season[];
  featured?: boolean;
}

const animeData: AnimeData[] = [
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    titleJP: '進撃の巨人',
    year: 2013,
    genre: ['Action', 'Drama', 'Fantasy'],
    rating: 9.0,
    description: 'Эпическая история человечества, защищающего себя от гигантских титанов за высокими стенами.',
    status: 'Completed',
    poster: '/img/785eda60-8345-463f-9b73-89bcfe111d35.jpg',
    cover: '/img/785eda60-8345-463f-9b73-89bcfe111d35.jpg',
    featured: true,
    seasons: [
      {
        id: 1,
        title: 'Сезон 1',
        episodes: [
          { id: 1, title: 'В тот день', duration: '24:30', description: 'Человечество вспоминает ужас быть под властью титанов' },
          { id: 2, title: 'В тот день', duration: '24:30', description: 'Эрен клянется уничтожить всех титанов' },
          { id: 3, title: 'Тусклый свет среди отчаяния', duration: '24:30', description: 'Начинается тренировка в корпусе кадетов' }
        ]
      }
    ]
  },
  {
    id: 'tokyo-ghoul',
    title: 'Tokyo Ghoul',
    titleJP: '東京喰種',
    year: 2014,
    genre: ['Action', 'Horror', 'Supernatural'],
    rating: 8.7,
    description: 'Кен Канеки становится полугулем после встречи с таинственной девушкой в кафе.',
    status: 'Completed',
    poster: '/img/32ba239b-e487-47eb-bbe7-6f7ea214b0d6.jpg',
    cover: '/img/32ba239b-e487-47eb-bbe7-6f7ea214b0d6.jpg',
    featured: true,
    seasons: [
      {
        id: 1,
        title: 'Сезон 1',
        episodes: [
          { id: 1, title: 'Трагедия', duration: '23:40', description: 'Кен Канеки встречает Ризе в кафе' },
          { id: 2, title: 'Инкубационный период', duration: '23:40', description: 'Канеки узнает правду о гулях' },
          { id: 3, title: 'Белый голубь', duration: '23:40', description: 'Канеки учится жить как гуль' }
        ]
      }
    ]
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    titleJP: '鬼滅の刃',
    year: 2019,
    genre: ['Action', 'Supernatural', 'Historical'],
    rating: 8.7,
    description: 'Танджиро Камадо становится охотником на демонов, чтобы спасти свою сестру.',
    status: 'Ongoing',
    poster: '/img/fcb9561b-4af1-4be8-a02a-b6ed43b98c8e.jpg',
    cover: '/img/fcb9561b-4af1-4be8-a02a-b6ed43b98c8e.jpg',
    seasons: [
      {
        id: 1,
        title: 'Сезон 1',
        episodes: [
          { id: 1, title: 'Жестокость', duration: '23:40', description: 'Семья Танджиро подвергается нападению демонов' },
          { id: 2, title: 'Ученик Сагиридани Урокодаки', duration: '23:40', description: 'Танджиро начинает тренировки' }
        ]
      }
    ]
  },
  {
    id: 'one-punch-man',
    title: 'One Punch Man',
    titleJP: 'ワンパンマン',
    year: 2015,
    genre: ['Action', 'Comedy', 'Superhero'],
    rating: 8.7,
    description: 'Сайтама - герой, который может победить любого врага одним ударом.',
    status: 'Ongoing',
    poster: '/img/b1b6c9d0-ce3d-402b-b5a2-800f6eda7f94.jpg',
    cover: '/img/b1b6c9d0-ce3d-402b-b5a2-800f6eda7f94.jpg',
    seasons: [
      {
        id: 1,
        title: 'Сезон 1',
        episodes: [
          { id: 1, title: 'Самый сильный мужчина', duration: '23:40', description: 'Знакомство с Сайтамой' },
          { id: 2, title: 'Одинокий киборг', duration: '23:40', description: 'Сайтама встречает Геноса' }
        ]
      }
    ]
  },
  {
    id: 'my-hero-academia',
    title: 'My Hero Academia',
    titleJP: '僕のヒーローアカデミア',
    year: 2016,
    genre: ['Action', 'School', 'Superhero'],
    rating: 8.4,
    description: 'В мире, где почти у всех есть суперсилы, Изуку мечтает стать героем.',
    status: 'Ongoing',
    poster: '/img/36d2636f-db81-4836-8630-c9b15b6e4dd4.jpg',
    cover: '/img/36d2636f-db81-4836-8630-c9b15b6e4dd4.jpg',
    seasons: [
      {
        id: 1,
        title: 'Сезон 1',
        episodes: [
          { id: 1, title: 'Изуку Мидория: Начало', duration: '23:40', description: 'Знакомство с миром героев' },
          { id: 2, title: 'Что нужно, чтобы стать героем', duration: '23:40', description: 'Мидория получает силу от All Might' }
        ]
      }
    ]
  },
  {
    id: 'fullmetal-alchemist',
    title: 'Fullmetal Alchemist: Brotherhood',
    titleJP: '鋼の錬金術師',
    year: 2009,
    genre: ['Action', 'Adventure', 'Military'],
    rating: 9.1,
    description: 'Братья Элрики ищут философский камень, чтобы вернуть свои тела.',
    status: 'Completed',
    poster: '/img/74ae8fd0-a175-4368-878a-1996ee8d0fee.jpg',
    cover: '/img/74ae8fd0-a175-4368-878a-1996ee8d0fee.jpg',
    seasons: [
      {
        id: 1,
        title: 'Сезон 1',
        episodes: [
          { id: 1, title: 'Элрик Фуллметал', duration: '23:40', description: 'Знакомство с братьями алхимиками' },
          { id: 2, title: 'Первый день', duration: '23:40', description: 'Эдвард становится государственным алхимиком' }
        ]
      }
    ]
  },
  {
    id: 'naruto',
    title: 'Naruto',
    titleJP: 'ナルト',
    year: 2002,
    genre: ['Action', 'Adventure', 'Ninja'],
    rating: 8.3,
    description: 'Молодой ниндзя Наруто стремится стать Хокаге своей деревни.',
    status: 'Completed',
    poster: 'https://via.placeholder.com/300x400/6B46C1/FFFFFF?text=NARUTO',
    cover: 'https://via.placeholder.com/300x400/6B46C1/FFFFFF?text=NARUTO',
    seasons: [
      {
        id: 1,
        title: 'Сезон 1',
        episodes: [
          { id: 1, title: 'Вход Узумаки Наруто!', duration: '23:40', description: 'Знакомство с Наруто' },
          { id: 2, title: 'Меня зовут Коного Мару!', duration: '23:40', description: 'Наруто получает команду' }
        ]
      }
    ]
  },
  {
    id: 'death-note',
    title: 'Death Note',
    titleJP: 'デスノート',
    year: 2006,
    genre: ['Psychological', 'Thriller', 'Supernatural'],
    rating: 9.0,
    description: 'Школьник находит тетрадь смерти, способную убивать людей.',
    status: 'Completed',
    poster: 'https://via.placeholder.com/300x400/1E293B/FFFFFF?text=DEATH+NOTE',
    cover: 'https://via.placeholder.com/300x400/1E293B/FFFFFF?text=DEATH+NOTE',
    seasons: [
      {
        id: 1,
        title: 'Сезон 1',
        episodes: [
          { id: 1, title: 'Возрождение', duration: '23:40', description: 'Лайт находит тетрадь смерти' },
          { id: 2, title: 'Противостояние', duration: '23:40', description: 'Появляется детектив L' }
        ]
      }
    ]
  }
];

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredAnime, setFilteredAnime] = useState(animeData);
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Psychological', 'School', 'Supernatural', 'Thriller'];

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

  const openPlayer = (anime: AnimeData) => {
    setSelectedAnime(anime);
    setSelectedSeason(anime.seasons[0]);
    setSelectedEpisode(anime.seasons[0].episodes[0]);
    setActiveTab('player');
  };

  const closePlayer = () => {
    setSelectedAnime(null);
    setSelectedSeason(null);
    setSelectedEpisode(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveTab('home');
  };

  const selectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderPlayer = () => {
    if (!selectedAnime || !selectedSeason || !selectedEpisode) return null;

    return (
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'container mx-auto px-4 py-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          {/* Video Player */}
          <div className={`${isFullscreen ? 'col-span-4' : 'lg:col-span-3'} space-y-4`}>
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <img 
                src={selectedAnime.cover} 
                alt={selectedAnime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </Button>
              </div>
              
              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div className="flex items-center space-x-3">
                    <span className="text-white text-sm">{formatTime(currentTime)}</span>
                    <Slider
                      value={[currentTime]}
                      max={1440}
                      step={1}
                      className="flex-1"
                      onValueChange={(value) => setCurrentTime(value[0])}
                    />
                    <span className="text-white text-sm">24:00</span>
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </Button>
                      
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                        <Slider
                          value={[volume]}
                          max={100}
                          step={1}
                          className="w-20"
                          onValueChange={(value) => setVolume(value[0])}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-white hover:bg-white/20"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Episode Info */}
            {!isFullscreen && (
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{selectedAnime.title}</h1>
                  <p className="text-muted-foreground">{selectedAnime.titleJP}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {selectedSeason.title} - Эпизод {selectedEpisode.id}: {selectedEpisode.title}
                  </h2>
                  <p className="text-muted-foreground">{selectedEpisode.description}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-medium">{selectedAnime.rating}</span>
                  </div>
                  <span className="text-muted-foreground">{selectedAnime.year}</span>
                  <span className="text-muted-foreground">{selectedEpisode.duration}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Episodes List */}
          {!isFullscreen && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Эпизоды</h3>
                <Button variant="outline" size="sm" onClick={closePlayer}>
                  Закрыть
                </Button>
              </div>
              
              <Select value={selectedSeason.id.toString()} onValueChange={(value) => {
                const season = selectedAnime.seasons.find(s => s.id === parseInt(value));
                if (season) {
                  setSelectedSeason(season);
                  setSelectedEpisode(season.episodes[0]);
                }
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedAnime.seasons.map(season => (
                    <SelectItem key={season.id} value={season.id.toString()}>
                      {season.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedSeason.episodes.map(episode => (
                  <Card 
                    key={episode.id}
                    className={`cursor-pointer transition-colors ${
                      selectedEpisode.id === episode.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                    }`}
                    onClick={() => selectEpisode(episode)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl font-bold text-muted-foreground">
                          {episode.id}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{episode.title}</h4>
                          <p className="text-sm text-muted-foreground">{episode.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{episode.duration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AnimeStream
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Смотрите любимые аниме в высоком качестве. Тысячи серий доступны сразу.
            </p>
            <Button size="lg" className="mr-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Начать просмотр
            </Button>
            <Button variant="outline" size="lg">
              Узнать больше
            </Button>
          </div>
          
          {/* Featured Anime */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {animeData.filter(anime => anime.featured).map((anime) => (
              <Card key={anime.id} className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in">
                <div className="relative">
                  <img 
                    src={anime.poster} 
                    alt={anime.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Button 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => openPlayer(anime)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Смотреть
                  </Button>
                  <Badge className="absolute top-4 left-4">
                    {anime.status}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{anime.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{anime.titleJP}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{anime.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-sm font-medium">{anime.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{anime.year}</span>
                  </div>
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
        <h2 className="text-4xl font-bold mb-8">Каталог аниме</h2>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Поиск аниме..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAnime.map((anime) => (
            <Card key={anime.id} className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={anime.poster} 
                  alt={anime.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Button 
                  size="sm"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => openPlayer(anime)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </Button>
                <div className="absolute top-2 right-2 flex items-center bg-black/60 rounded px-2 py-1">
                  <svg className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-white text-xs">{anime.rating}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1 truncate">{anime.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{anime.titleJP}</p>
                <p className="text-xs text-muted-foreground mt-1">{anime.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      {activeTab !== 'player' && (
        <header className="border-b bg-white/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AnimeStream
                </h1>
                <nav className="hidden md:flex space-x-6">
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`px-3 py-2 transition-colors ${
                      activeTab === 'home' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Главная
                  </button>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className={`px-3 py-2 transition-colors ${
                      activeTab === 'catalog' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Каталог
                  </button>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost">Войти</Button>
                <Button>Регистрация</Button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Content */}
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;