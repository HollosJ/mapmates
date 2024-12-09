import AuthButton from '@/components/AuthButton';
import Image from 'next/image';

export default async function Home() {
  return (
    <div className="container py-8 md:py-16 grid justify-center">
      <h1 className="text-5xl md:text-7xl font-black text-white text-background text-center">
        Map Mates
      </h1>

      <Image
        src={'/assets/map.svg'}
        alt="Test"
        width={500}
        height={500}
        className="mt-8"
      />

      <AuthButton className="mt-8" />
    </div>
  );
}
