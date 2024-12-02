import InteractiveMap from '@/components/Map/InteractiveMap';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Map | Map Mates',
  description: 'Show off your own online scratch map',
};

const MyMapPage = async () => {
  return (
    <>
      <h1 className="absolute top-4 left-0 px-4 py-2 text-lg bg-white rounded-e-lg">
        Where have you visited?
      </h1>

      <InteractiveMap />
    </>
  );
};

export default MyMapPage;
