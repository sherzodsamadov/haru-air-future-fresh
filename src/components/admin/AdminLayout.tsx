import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Package, FolderTree, Newspaper, Megaphone, 
  Briefcase, FileText, MessageSquare, Settings, Menu, X, LogOut
} from 'lucide-react';
import logo from '@/assets/logo.png';
import { useData } from '@/contexts/DataContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Mahsulotlar', href: '/admin/products' },
  { icon: FolderTree, label: 'Kategoriyalar', href: '/admin/categories' },
  { icon: Newspaper, label: 'Yangiliklar', href: '/admin/news' },
  { icon: Megaphone, label: "E'lonlar", href: '/admin/announcements' },
  { icon: Briefcase, label: 'Vakansiyalar', href: '/admin/vacancies' },
  { icon: FileText, label: 'Arizalar', href: '/admin/applications' },
  { icon: MessageSquare, label: 'Xabarlar', href: '/admin/messages' },
  { icon: Settings, label: 'Sozlamalar', href: '/admin/settings' },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { getStats } = useData();
  const stats = getStats();

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center px-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2">
          <Menu size={24} />
        </button>
        <img src={logo} alt="HARU AIR" className="h-8 ml-3" />
        <span className="ml-2 font-semibold">Admin</span>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-foreground/50 z-50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HARU AIR" className="h-8" />
            <span className="font-semibold">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {item.label === 'Xabarlar' && stats.unreadMessages > 0 && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                  {stats.unreadMessages}
                </span>
              )}
              {item.label === 'Arizalar' && stats.pendingApplications > 0 && (
                <span className="ml-auto bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                  {stats.pendingApplications}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={18} />
            Saytga qaytish
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
