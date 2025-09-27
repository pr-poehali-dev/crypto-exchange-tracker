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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse-glow">
                <Icon name="Zap" size={20} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">CryptoPro</h1>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
              <Button size="sm" className="animate-pulse-glow">
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 animate-slide-up">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Торговля криптовалютами
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Профессиональная платформа для торговли с лучшими курсами и минимальными комиссиями
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="animate-pulse-glow">
              <Icon name="TrendingUp" size={20} className="mr-2" />
              Начать торговлю
            </Button>
            <Button variant="outline" size="lg">
              <Icon name="PlayCircle" size={20} className="mr-2" />
              Демо режим
            </Button>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(2.1e12)}
                </div>
                <div className="text-sm text-muted-foreground">Общая капитализация</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">
                  45.6%
                </div>
                <div className="text-sm text-muted-foreground">Доминация BTC</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(98.7e9)}
                </div>
                <div className="text-sm text-muted-foreground">Объем за 24ч</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-success">
                  12,847
                </div>
                <div className="text-sm text-muted-foreground">Активных монет</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Crypto Trading Cards */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Топ криптовалют</h3>
            <Button variant="outline">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Все рынки
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cryptoData.map((crypto, index) => (
              <Card 
                key={crypto.id} 
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {crypto.symbol.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{crypto.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={crypto.change24h > 0 ? "default" : "destructive"}
                      className="animate-pulse"
                    >
                      {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {formatPrice(crypto.price)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Объем 24ч</p>
                        <p className="font-medium">{formatNumber(crypto.volume)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Капитализация</p>
                        <p className="font-medium">{formatNumber(crypto.marketCap)}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        Купить {crypto.symbol}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Icon name="Activity" size={16} className="mr-2" />
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

      {/* Features Section */}
      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Преимущества платформы</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Безопасность</h4>
                <p className="text-muted-foreground">
                  Многоуровневая защита средств с холодным хранением и 2FA
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Быстрые сделки</h4>
                <p className="text-muted-foreground">
                  Мгновенное исполнение ордеров с минимальными задержками
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="PieChart" size={32} className="text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Аналитика</h4>
                <p className="text-muted-foreground">
                  Продвинутые инструменты анализа и торговые сигналы
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">CryptoPro</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">О нас</a>
              <a href="#" className="hover:text-foreground transition-colors">API</a>
              <a href="#" className="hover:text-foreground transition-colors">Условия</a>
              <a href="#" className="hover:text-foreground transition-colors">Поддержка</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;