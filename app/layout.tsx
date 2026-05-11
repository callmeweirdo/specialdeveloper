import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'David Joseph | Special Developer',
  description: 'A high-end, animated portfolio and lead generation platform for OGDevs web design studio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
