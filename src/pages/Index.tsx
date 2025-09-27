import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
}

const mockCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67250.45,
    change24h: 2.34,
    volume: 18.5e9,
    marketCap: 1.32e12
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.78,
    change24h: -1.23,
    volume: 12.8e9,
    marketCap: 415e9
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.4567,
    change24h: 5.67,
    volume: 1.2e9,
    marketCap: 16.2e9
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 156.89,
    change24h: 3.45,
    volume: 2.1e9,
    marketCap: 72.4e9
  }
];

const Index: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(mockCryptoData);
  const [activeSection, setActiveSection] = useState('Торговля');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.02),
        change24h: crypto.change24h + (Math.random() - 0.5) * 2
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 4 : 2
    }).format(price);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const navItems = ['Торговля', 'Рынки', 'Новости', 'Аналитика', 'Поддержка'];

  const renderContent = () => {
    switch (activeSection) {
      case 'Торговля':
        return (
          <>
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
              <div className="absolute inset-0">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
              </div>
              <div className="container mx-auto text-center relative z-10">
                <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-up">
                  Торговля криптовалютами
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
                  Профессиональная платформа для торговли с лучшими курсами и минимальными комиссиями
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-2xl">
                    <Icon name="TrendingUp" size={24} className="mr-3" />
                    Начать торговлю
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-card/50">
                    <Icon name="PlayCircle" size={24} className="mr-3" />
                    Демо режим
                  </Button>
                </div>
              </div>
            </section>

            {/* Market Stats */}
            <section className="py-16 px-4">
              <div className="container mx-auto">
                <h3 className="text-3xl font-bold text-center mb-12">Состояние рынка</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/50 border border-border/50">
                    <CardContent className="pt-8 pb-8">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {formatNumber(2.1e12)}
                      </div>
                      <div className="text-sm text-muted-foreground">Общая капитализация</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/50 border border-border/50">
                    <CardContent className="pt-8 pb-8">
                      <div className="text-3xl font-bold text-accent mb-2">
                        45.6%
                      </div>
                      <div className="text-sm text-muted-foreground">Доминация BTC</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/50 border border-border/50">
                    <CardContent className="pt-8 pb-8">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {formatNumber(98.7e9)}
                      </div>
                      <div className="text-sm text-muted-foreground">Объем за 24ч</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/50 border border-border/50">
                    <CardContent className="pt-8 pb-8">
                      <div className="text-3xl font-bold text-success mb-2">
                        12,847
                      </div>
                      <div className="text-sm text-muted-foreground">Активных монет</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Crypto Trading Cards */}
            <section className="py-16 px-4 bg-gradient-to-b from-background to-card/20">
              <div className="container mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Топ криптовалют</h3>
                  <Button variant="outline" className="border-2 hover:bg-card/50">
                    <Icon name="BarChart3" size={18} className="mr-2" />
                    Все рынки
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {cryptoData.map((crypto, index) => (
                    <Card 
                      key={crypto.id} 
                      className="hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer bg-gradient-to-br from-card to-card/80 border border-border/50 hover:border-primary/30"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-primary/30">
                              <span className="text-lg font-bold text-primary">
                                {crypto.symbol.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <CardTitle className="text-xl text-foreground">{crypto.name}</CardTitle>
                              <p className="text-muted-foreground font-medium">{crypto.symbol}</p>
                            </div>
                          </div>
                          <Badge 
                            variant={crypto.change24h > 0 ? "default" : "destructive"}
                            className="text-sm px-3 py-1 animate-pulse"
                          >
                            {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {formatPrice(crypto.price)}
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 text-sm">
                            <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                              <span className="text-muted-foreground">Объем 24ч</span>
                              <span className="font-bold text-foreground">{formatNumber(crypto.volume)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                              <span className="text-muted-foreground">Капитализация</span>
                              <span className="font-bold text-foreground">{formatNumber(crypto.marketCap)}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg">
                              <Icon name="ShoppingCart" size={18} className="mr-2" />
                              Купить {crypto.symbol}
                            </Button>
                            <Button variant="outline" className="w-full border-2 hover:bg-card/50">
                              <Icon name="Activity" size={18} className="mr-2" />
                              График
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        );

      case 'Рынки':
        return (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Криптовалютные рынки</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/80 border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">Популярные пары</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'SOL/USDT'].map((pair, i) => (
                        <div key={pair} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">{pair.split('/')[0].charAt(0)}</span>
                            </div>
                            <span className="font-medium">{pair}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{(Math.random() * 100000 + 1000).toFixed(2)} $</div>
                            <div className={`text-sm ${Math.random() > 0.5 ? 'text-success' : 'text-destructive'}`}>
                              {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 10).toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl">Тренды</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <Icon name="TrendingUp" size={32} className="text-primary mx-auto mb-2" />
                        <div className="font-bold text-lg">Растущие</div>
                        <div className="text-sm text-muted-foreground">124 монеты</div>
                      </div>
                      <div className="text-center p-4 bg-destructive/10 rounded-lg">
                        <Icon name="TrendingDown" size={32} className="text-destructive mx-auto mb-2" />
                        <div className="font-bold text-lg">Падающие</div>
                        <div className="text-sm text-muted-foreground">76 монет</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        );

      case 'Новости':
        return (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Криптовалютные новости</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: 'Bitcoin достиг нового максимума', time: '2 часа назад', category: 'Рынок' },
                  { title: 'Ethereum 2.0 показывает отличные результаты', time: '4 часа назад', category: 'Технологии' },
                  { title: 'Новое регулирование криптовалют в ЕС', time: '6 часов назад', category: 'Регулирование' },
                  { title: 'DeFi протоколы набирают популярность', time: '8 часов назад', category: 'DeFi' },
                  { title: 'Институциональные инвесторы входят в крипто', time: '12 часов назад', category: 'Инвестиции' },
                  { title: 'NFT рынок показывает рост', time: '1 день назад', category: 'NFT' }
                ].map((news, i) => (
                  <Card key={i} className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-card/80 border border-border/50">
                    <CardContent className="p-6">
                      <Badge className="mb-3">{news.category}</Badge>
                      <h3 className="font-bold text-lg mb-3 leading-tight">{news.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Icon name="Clock" size={16} className="mr-2" />
                        {news.time}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );

      case 'Аналитика':
        return (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Аналитика и прогнозы</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Icon name="BarChart3" size={24} className="mr-3 text-primary" />
                      Рыночные показатели
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-secondary/30 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Индекс страха и жадности</span>
                          <span className="text-2xl font-bold text-success">74</span>
                        </div>
                        <div className="text-sm text-success mt-1">Жадность</div>
                      </div>
                      <div className="p-4 bg-secondary/30 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Volatility Index</span>
                          <span className="text-2xl font-bold text-warning">2.3%</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">Средняя волатильность</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Icon name="TrendingUp" size={24} className="mr-3 text-primary" />
                      Прогнозы экспертов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { coin: 'Bitcoin', prediction: '+15%', period: '3 месяца', confidence: 'Высокая' },
                        { coin: 'Ethereum', prediction: '+25%', period: '6 месяцев', confidence: 'Средняя' },
                        { coin: 'Solana', prediction: '+40%', period: '1 год', confidence: 'Высокая' }
                      ].map((forecast, i) => (
                        <div key={i} className="p-4 bg-secondary/30 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold">{forecast.coin}</div>
                              <div className="text-sm text-muted-foreground">{forecast.period}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-success">{forecast.prediction}</div>
                              <div className="text-sm text-muted-foreground">{forecast.confidence}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        );

      case 'Поддержка':
        return (
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Поддержка и помощь</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Icon name="MessageCircle" size={24} className="mr-3 text-primary" />
                      Связаться с нами
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start bg-gradient-to-r from-primary to-accent">
                      <Icon name="MessageSquare" size={18} className="mr-3" />
                      Онлайн чат (24/7)
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-2">
                      <Icon name="Mail" size={18} className="mr-3" />
                      Email: support@cryptopro.com
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-2">
                      <Icon name="Phone" size={18} className="mr-3" />
                      Телефон: +7 (495) 123-45-67
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Icon name="HelpCircle" size={24} className="mr-3 text-primary" />
                      Часто задаваемые вопросы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Как создать аккаунт?',
                        'Как пополнить баланс?',
                        'Какие комиссии за торговлю?',
                        'Как вывести средства?',
                        'Безопасно ли хранить криптовалюту?'
                      ].map((question, i) => (
                        <div key={i} className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{question}</span>
                            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20 bg-background/80 backdrop-blur-xl sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
                <Icon name="Zap" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CryptoPro</h1>
                <p className="text-xs text-muted-foreground">Professional Trading</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex space-x-1 bg-card/30 rounded-full p-1 backdrop-blur-sm border border-border/30">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeSection === item
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="hidden md:flex border border-border/50 hover:border-primary/50">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg">
                Регистрация
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 p-4 bg-card/50 rounded-lg backdrop-blur-sm border border-border/20 animate-fade-in">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveSection(item);
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                      activeSection === item
                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Dynamic Content */}
      {renderContent()}

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-card/20 to-background">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Преимущества платформы</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/80 border border-border/50">
              <CardContent className="pt-10 pb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
                  <Icon name="Shield" size={40} className="text-primary" />
                </div>
                <h4 className="text-2xl font-semibold mb-4">Безопасность</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Многоуровневая защита средств с холодным хранением и 2FA
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/80 border border-border/50">
              <CardContent className="pt-10 pb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
                  <Icon name="Zap" size={40} className="text-primary" />
                </div>
                <h4 className="text-2xl font-semibold mb-4">Быстрые сделки</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Мгновенное исполнение ордеров с минимальными задержками
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/80 border border-border/50">
              <CardContent className="pt-10 pb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
                  <Icon name="PieChart" size={40} className="text-primary" />
                </div>
                <h4 className="text-2xl font-semibold mb-4">Аналитика</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Продвинутые инструменты анализа и торговые сигналы
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CryptoPro</span>
                <p className="text-xs text-muted-foreground">Professional Trading Platform</p>
              </div>
            </div>
            <div className="flex space-x-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors hover:underline">О нас</a>
              <a href="#" className="hover:text-foreground transition-colors hover:underline">API</a>
              <a href="#" className="hover:text-foreground transition-colors hover:underline">Условия</a>
              <a href="#" className="hover:text-foreground transition-colors hover:underline">Поддержка</a>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground">© 2024 CryptoPro. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;