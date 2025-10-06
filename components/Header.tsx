import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/favicon.ico" alt="logo" width={32} height={32} />
          <span className="font-bold">DermAssist</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost">Demo</Button>
          <Button variant="outline">Providers</Button>
        </nav>
      </div>
    </header>
  );
}
