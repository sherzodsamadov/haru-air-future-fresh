import { Link } from 'react-router-dom';
import { Package, Newspaper, Briefcase, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export default function AdminDashboard() {
  const { getStats, products, news, vacancies, applications, messages } = useData();
  const stats = getStats();

  const statCards = [
    { icon: Package, label: 'Mahsulotlar', value: stats.totalProducts, href: '/admin/products', color: 'bg-primary' },
    { icon: Newspaper, label: 'Yangiliklar', value: stats.totalNews, href: '/admin/news', color: 'bg-secondary' },
    { icon: Briefcase, label: 'Vakansiyalar', value: stats.totalVacancies, href: '/admin/vacancies', color: 'bg-eco-moss' },
    { icon: FileText, label: 'Arizalar', value: stats.totalApplications, href: '/admin/applications', color: 'bg-accent' },
    { icon: MessageSquare, label: "O'qilmagan xabarlar", value: stats.unreadMessages, href: '/admin/messages', color: 'bg-destructive' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">HARU AIR admin paneliga xush kelibsiz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <Link key={index} to={stat.href} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon size={20} className="text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Items */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-card rounded-xl shadow-sm">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">So'nggi xabarlar</h2>
            <Link to="/admin/messages" className="text-sm text-primary hover:underline">Barchasini ko'rish</Link>
          </div>
          <div className="p-4 space-y-3">
            {messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className={`p-3 rounded-lg ${msg.isRead ? 'bg-muted/50' : 'bg-primary/5 border border-primary/20'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{msg.name}</span>
                  <span className="text-xs text-muted-foreground">{msg.submittedAt}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{msg.subject}</p>
              </div>
            ))}
            {messages.length === 0 && <p className="text-muted-foreground text-sm">Xabarlar yo'q</p>}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-card rounded-xl shadow-sm">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">So'nggi arizalar</h2>
            <Link to="/admin/applications" className="text-sm text-primary hover:underline">Barchasini ko'rish</Link>
          </div>
          <div className="p-4 space-y-3">
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{app.fullName}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${app.status === 'new' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {app.status === 'new' ? 'Yangi' : app.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{app.vacancyTitle}</p>
              </div>
            ))}
            {applications.length === 0 && <p className="text-muted-foreground text-sm">Arizalar yo'q</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
