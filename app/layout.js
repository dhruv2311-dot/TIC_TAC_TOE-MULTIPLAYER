import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tic Tac Toe Arena | Pro Gaming',
  description: 'Professional multiplayer Tic Tac Toe arena. Compete, dominate, and climb the leaderboard!',
  keywords: ['tic tac toe', 'multiplayer', 'game', 'esports', 'gaming', 'arena'],
  authors: [{ name: 'Gaming Arena' }],
  openGraph: {
    title: 'Tic Tac Toe Arena - Pro Gaming',
    description: 'Professional multiplayer gaming arena',
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
          <footer className="mt-16 py-8 text-center relative z-10 border-t border-cyan-500/20">
            <div className="gaming-card max-w-4xl mx-auto p-6">
              <p className="text-cyan-400 font-bold tracking-wider">
                © 2024 TIC TAC TOE ARENA | PROFESSIONAL GAMING PLATFORM
              </p>
              <p className="text-cyan-300/60 text-sm mt-2">
                Built with Next.js & MongoDB | Powered by Gaming Excellence
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
