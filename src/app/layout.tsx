import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ACC Office Dashboard',
  description: 'Pixel Perfect Agent Command Center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#2c1a1a' }}>
        {children}
      </body>
    </html>
  );
}
