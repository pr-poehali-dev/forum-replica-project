import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type Page = 'home' | 'users' | 'rules';

interface Topic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastPost: string;
  isPinned?: boolean;
}

interface User {
  id: number;
  username: string;
  avatar: string;
  posts: number;
  reputation: number;
  role: string;
  isOnline: boolean;
}

const mockTopics: Topic[] = [
  { id: 1, title: 'Обновление сервера 2.0 - Новые возможности', author: 'Admin', category: 'Новости', replies: 145, views: 2890, lastPost: '5 мин назад', isPinned: true },
  { id: 2, title: 'Правила сервера - Обязательно к прочтению', author: 'Moderator', category: 'Правила', replies: 23, views: 8450, lastPost: '1 час назад', isPinned: true },
  { id: 3, title: 'Гайд для новичков: Как начать играть', author: 'Helper_Alex', category: 'Гайды', replies: 67, views: 1234, lastPost: '10 мин назад' },
  { id: 4, title: 'Обсуждение последнего ивента', author: 'Player123', category: 'Обсуждения', replies: 89, views: 956, lastPost: '15 мин назад' },
  { id: 5, title: 'Баг с оружием в последнем обновлении', author: 'BugHunter', category: 'Баги', replies: 34, views: 445, lastPost: '30 мин назад' },
];

const mockUsers: User[] = [
  { id: 1, username: 'Admin', avatar: 'A', posts: 1520, reputation: 999, role: 'Администратор', isOnline: true },
  { id: 2, username: 'Moderator', avatar: 'M', posts: 856, reputation: 750, role: 'Модератор', isOnline: true },
  { id: 3, username: 'Helper_Alex', avatar: 'HA', posts: 445, reputation: 520, role: 'Хелпер', isOnline: false },
  { id: 4, username: 'Player123', avatar: 'P1', posts: 234, reputation: 180, role: 'Игрок', isOnline: true },
  { id: 5, username: 'BugHunter', avatar: 'BH', posts: 189, reputation: 145, role: 'Игрок', isOnline: false },
  { id: 6, username: 'NewPlayer', avatar: 'NP', posts: 12, reputation: 15, role: 'Новичок', isOnline: true },
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Администратор': return 'bg-red-600';
      case 'Модератор': return 'bg-purple-600';
      case 'Хелпер': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="MessageSquare" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Black Russia Forum</h1>
                <p className="text-xs text-muted-foreground">Сообщество игроков</p>
              </div>
            </div>
            
            <nav className="flex gap-2">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button
                variant={currentPage === 'users' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('users')}
                className="gap-2"
              >
                <Icon name="Users" size={18} />
                Пользователи
              </Button>
              <Button
                variant={currentPage === 'rules' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('rules')}
                className="gap-2"
              >
                <Icon name="Shield" size={18} />
                Правила
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Последние темы</h2>
              <Button className="gap-2">
                <Icon name="Plus" size={18} />
                Создать тему
              </Button>
            </div>

            <Card className="bg-card/50 border-border overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Тема</div>
                <div className="col-span-2 text-center">Ответы</div>
                <div className="col-span-2 text-center">Просмотры</div>
                <div className="col-span-2 text-right">Последний пост</div>
              </div>

              {mockTopics.map((topic) => (
                <div
                  key={topic.id}
                  className={`grid grid-cols-12 gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer ${
                    topic.isPinned ? 'bg-muted/20' : ''
                  }`}
                >
                  <div className="col-span-6 flex items-start gap-3">
                    <div className="mt-1">
                      {topic.isPinned ? (
                        <Icon name="Pin" size={20} className="text-primary" />
                      ) : (
                        <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {topic.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          от {topic.author}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center text-foreground font-medium">
                    {topic.replies}
                  </div>
                  <div className="col-span-2 flex items-center justify-center text-muted-foreground">
                    {topic.views}
                  </div>
                  <div className="col-span-2 flex items-center justify-end text-xs text-muted-foreground">
                    {topic.lastPost}
                  </div>
                </div>
              ))}
            </Card>

            <Card className="p-6 bg-card/50 border-border">
              <div className="flex items-center gap-4">
                <Icon name="TrendingUp" size={24} className="text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Статистика форума</h3>
                  <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                    <span>Темы: 1,245</span>
                    <span>Сообщения: 15,678</span>
                    <span>Участники: 3,421</span>
                    <span className="text-green-500">Онлайн: 156</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentPage === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Пользователи</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Icon name="Search" size={18} />
                  Поиск
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockUsers.map((user) => (
                <Card key={user.id} className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all cursor-pointer hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{user.username}</h3>
                      <Badge className={`${getRoleBadgeColor(user.role)} text-xs mt-1`}>
                        {user.role}
                      </Badge>
                      <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Сообщений</p>
                          <p className="font-semibold text-foreground">{user.posts}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Репутация</p>
                          <p className="font-semibold text-primary">{user.reputation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'rules' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Правила форума</h2>
              <p className="text-muted-foreground mt-2">Пожалуйста, ознакомьтесь с правилами перед использованием форума</p>
            </div>

            <Card className="p-8 bg-card/50 border-border space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Уважение к участникам</h3>
                    <p className="text-muted-foreground">
                      Запрещены любые формы оскорблений, угроз, дискриминации по любому признаку. 
                      Относитесь к другим участникам так, как хотели бы, чтобы относились к вам.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Запрещенный контент</h3>
                    <p className="text-muted-foreground">
                      Запрещено размещение материалов 18+, пропаганда насилия, экстремизма, наркотиков. 
                      Также запрещен спам, реклама сторонних ресурсов без разрешения администрации.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Создание тем и сообщений</h3>
                    <p className="text-muted-foreground">
                      Создавайте темы в соответствующих разделах. Используйте понятные заголовки. 
                      Запрещен флуд, офтоп, дублирование тем. Пишите грамотно и по существу.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Аккаунты и безопасность</h3>
                    <p className="text-muted-foreground">
                      Один человек - один аккаунт. Запрещена передача аккаунтов, взлом, использование ботов. 
                      Не размещайте личные данные других пользователей.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Модерация</h3>
                    <p className="text-muted-foreground">
                      Решения модераторов и администрации обязательны к исполнению. 
                      При несогласии с модерацией обращайтесь в личные сообщения администрации, а не создавайте публичные темы.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="AlertTriangle" size={24} className="text-destructive flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-destructive mb-1">Нарушение правил</h4>
                      <p className="text-sm text-muted-foreground">
                        За нарушение правил предусмотрены санкции: предупреждение, временный или постоянный бан. 
                        Администрация оставляет за собой право решать, какое наказание применить в каждом конкретном случае.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Последнее обновление правил: 15 декабря 2024
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Icon name="Copyright" size={16} />
              <span>2024 Black Russia Forum. Все права защищены.</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Icon name="Mail" size={16} />
                Поддержка
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Icon name="MessageCircle" size={16} />
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}