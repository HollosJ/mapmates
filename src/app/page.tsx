import AuthButton from '@/components/AuthButton';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="py-8 md:py-16">
      <section className="container grid justify-center md:grid-cols-2 gap-4 md:max-w-screen-lg">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-background">
            Map Mates
          </h1>

          <p className="text-xl md:text-2xl text-pretty text-white mt-4">
            Track your travels, connect with friends, and explore the world
            together.
          </p>

          <AuthButton className="mt-8" signInText="Get Started" />
        </div>

        <Image
          src={'/assets/map.svg'}
          alt="Test"
          width={500}
          height={500}
          className="mt-8"
          priority
        />
      </section>

      <section className="bg-indigo-800 text-white my-8 md:my-16 py-8 md:py-16">
        <div className="container md:max-w-screen-lg grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">🌍 Interactive Map</h2>
            <p className="text-xl md:text-2xl text-pretty mt-4">
              Showcase your travel history visually.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">🤝 Connect With Friends</h2>
            <p className="text-xl md:text-2xl text-pretty mt-4">
              Compare maps and share your journeys.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">✈️ Track Your Progress</h2>
            <p className="text-xl md:text-2xl text-pretty mt-4">
              See where you've been and where to go next.
            </p>
          </div>
        </div>
      </section>

      <footer className="container md:max-w-screen-lg text-center text-white">
        © 2024{' '}
        <Link
          href="https://www.hollos.dev/"
          target="_blank"
          className="underline"
        >
          James Hollos
        </Link>
      </footer>
    </div>
  );
}
