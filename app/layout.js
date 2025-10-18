import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tic Tac Toe | Multiplayer Gaming',
  description: 'Play Tic Tac Toe online with friends. Modern multiplayer gaming experience.',
  keywords: ['tic tac toe', 'multiplayer', 'game', 'online', 'gaming'],
  authors: [{ name: 'Gaming Platform' }],
  openGraph: {
    title: 'Tic Tac Toe Multiplayer',
    description: 'Modern multiplayer gaming experience',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen relative">
          <Navigation />
          <main className="container mx-auto px-4 py-8 relative z-10">
            {children}
          </main>
          <footer className="mt-16 py-8 text-center relative z-10 border-t border-[var(--border)]">
            <div className="max-w-4xl mx-auto">
              <p className="text-[var(--text-secondary)] font-medium">
                © 2024 Tic Tac Toe Multiplayer
              </p>
              <p className="text-[var(--text-secondary)] text-sm mt-2 opacity-60">
                Built with Next.js & MongoDB
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
