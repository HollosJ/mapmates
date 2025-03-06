import InteractiveMap from '@/components/Map/InteractiveMap';
import { HomeIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Map | Map Mates',
};

const MyMapPage = async () => {
  return (
    <>
      <InteractiveMap />

      <div className="absolute left-0 flex items-center gap-2 px-4 py-2 text-lg bg-white shadow-md top-4 rounded-e-lg">
        <Link href={'/profile'}>
          <HomeIcon
            className="size-6"
            aria-label="Go to your profile"
            title="Go to your profile"
          />
        </Link>

        <div className="w-px h-6 bg-black rounded-full"></div>

        <h1 className="text-lg">Where have you been?</h1>
      </div>
    </>
  );
};

export default MyMapPage;
