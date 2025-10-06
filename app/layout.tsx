import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'DermAssist - AI for African Skin | Equitable Dermatological Care',
  description: 'DermAssist is an Afrocentric digital dermatology assistant designed for melanated skin. AI-powered diagnosis, culturally-aware healthcare, and equitable dermatological care across Africa.',
  authors: [{ name: 'DermAssist Team' }],
  openGraph: {
    title: 'DermAssist - AI for African Skin | Equitable Dermatological Care',
    description: 'Revolutionary Afrocentric dermatology AI trained specifically on melanated skin conditions. Bridging healthcare equity gaps with culturally-aware diagnostic technology.',
    type: 'website',
    images: 'https://lovable.dev/opengraph-image-p98pqg.png',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dermassist',
    images: 'https://lovable.dev/opengraph-image-p98pqg.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
