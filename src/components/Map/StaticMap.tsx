import MapBase from '@/components/Map/MapBase';

type Props = {
  visitedCountries: string[];
  className?: string;
  backgroundColor?: string;
  unvisitedCountryColor?: string;
  visitedCountryColor?: string;
};

export default function StaticMap(props: Props) {
  return <MapBase {...props} interactive={false} />;
}
