import Image from 'next/image';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold">DermAssist</h1>
        <p className="mt-4 text-lg text-muted-foreground">AI dermatology assistant for melanated skin.</p>
        <div className="mt-8">
          <Button variant="hero">Try Demo</Button>
        </div>
      </div>
    </section>
  );
}
