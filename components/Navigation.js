'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, History, Zap } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Arena', icon: Home },
    { href: '/leaderboard', label: 'Rankings', icon: Trophy },
    { href: '/history', label: 'Battles', icon: History },
  ];

  return (
    <nav className="relative z-20 border-b border-cyan-500/20">
      <div className="gaming-card rounded-none border-x-0 border-t-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Zap className="w-10 h-10 text-cyan-400 icon-glow animate-pulse" />
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
              </div>
              <div>
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 neon-text">
                  TIC TAC TOE
                </div>
                <div className="text-xs font-bold text-cyan-400/60 tracking-widest">
                  ARENA
                </div>
              </div>
            </Link>
            
            {/* Navigation Links */}
            <div className="flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center space-x-2 px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-2 border-cyan-400/50'
                        : 'text-cyan-300/60 hover:text-cyan-400 border-2 border-transparent hover:border-cyan-400/30'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-lg"></div>
                    )}
                    <Icon size={18} className={`relative z-10 ${isActive ? 'icon-glow' : ''}`} />
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
