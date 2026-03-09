import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Courses', href: '/courses', icon: '📚' },
    { label: 'Lectures', href: '/lectures', icon: '🎓' },
    { label: 'Assignments', href: '/assignments', icon: '✅' },
    { label: 'Notes', href: '/notes', icon: '📝' },
    { label: 'Progress', href: '/progress', icon: '📈' },
  ];

  const isActive = (href) => location.pathname.startsWith(href);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 shadow-lg flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold">SmartBee</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-500 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.href)
                  ? 'bg-blue-500 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-500 space-y-2">
          <Link
            to="/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive('/profile')
                ? 'bg-blue-500 text-white'
                : 'text-blue-100 hover:bg-blue-500 hover:text-white'
            }`}
            title={!sidebarOpen ? 'Profile' : ''}
          >
            <Settings size={20} />
            {sidebarOpen && <span>Profile</span>}
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-500 hover:text-white transition"
            title={!sidebarOpen ? 'Sign Out' : ''}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            {profile?.full_name || 'Welcome'} to SmartBee
          </h2>
          <div className="text-sm text-gray-600">
            {profile?.degree_program && <span>{profile.degree_program}</span>}
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
