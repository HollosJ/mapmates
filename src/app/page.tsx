import AuthButton from "@/components/AuthButton";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="min-h-dvh bg-primary py-8 md:py-16">
      <section className="container grid justify-center gap-4 md:max-w-screen-lg md:grid-cols-2">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-background text-5xl font-bold text-white md:text-7xl">
            Map Mates
          </h1>

          <p className="mt-4 text-pretty text-xl text-white md:text-2xl">
            Track your travels, connect with friends, and explore the world
            together.
          </p>

          <AuthButton className="mt-8" signInText="Get Started" />
        </div>

        <Image
          src={"/assets/map.svg"}
          alt="Test"
          width={500}
          height={500}
          className="mt-8"
          priority
        />
      </section>

      <section className="my-8 bg-indigo-700 py-8 text-white md:my-16 md:py-16">
        <div className="container grid gap-8 text-center md:max-w-screen-lg md:grid-cols-3">
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">🌍 Interactive Map</h2>
            <p className="mt-4 text-pretty text-xl md:text-2xl">
              Showcase your travel history visually.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">🤝 Connect With Friends</h2>
            <p className="mt-4 text-pretty text-xl md:text-2xl">
              Compare maps and share your journeys.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">✈️ Track Your Progress</h2>
            <p className="mt-4 text-pretty text-xl md:text-2xl">
              See where you've been and where to go next.
            </p>
          </div>
        </div>
      </section>

      <footer className="container text-center text-white md:max-w-screen-lg">
        © {new Date().getFullYear()}{" "}
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
