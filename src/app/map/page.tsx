import InteractiveMap from '@/components/Map/InteractiveMap';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Map | Map Mates',
  description: 'Show off your own online scratch map',
};

const MyMapPage = async () => {
  return (
    <>
      <div className="container">
        <h1 className="absolute text-3xl font-bold text-center -translate-x-1/2 text-pretty top-4 left-1/2">
          Where have you visited?
        </h1>
      </div>

      <InteractiveMap />
    </>
  );
};

export default MyMapPage;
