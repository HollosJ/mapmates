import InteractiveMap from '@/components/Map/InteractiveMap';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Map | Map Mates',
};

const MyMapPage = async () => {
  return (
    <>
      <h1 className="absolute top-4 left-0 px-4 py-2 text-lg bg-white rounded-e-lg shadow-md">
        Where have you visited?
      </h1>

      <InteractiveMap />
    </>
  );
};

export default MyMapPage;
