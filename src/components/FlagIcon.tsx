import { Country } from '@/types';
import Image from 'next/image';

type Props = {
  className?: string;
  country: Country;
  dark?: boolean;
};

/**
 * A component that displays a country's flag as an image with a tooltip.
 * @param {Props} props - The properties for the FlagIcon component.
 * @param {string} [props.className] - Optional class name for styling.
 * @param {Country} props.country - The country object containing the flag image URL and country name.
 * @param {boolean} [props.dark] - Optional flag to determine tooltip styling (dark or light).
 *
 * @returns {JSX.Element} A JSX element that displays the flag and the country's name as a tooltip.
 */
const FlagIcon = (props: Props) => {
  const { className, country, dark } = props;

  return (
    <div className="relative group">
      <Image
        src={country.flag}
        alt={country.name}
        width={90}
        height={60}
        className={`object-contain w-16 h-12 drop-shadow-md ${className || ''}`}
        style={{
          // Add a slight rotation to the flag
          transform: `rotate(${Math.random() * 10 - 5}deg)`,
        }}
        priority
      />

      <div
        className={`absolute top-[calc(100%+1rem)] whitespace-nowrap text-xs z-10 font-bold px-2 py-1 transition -translate-x-1/2 -translate-y-1/2 shadow-md rounded opacity-0 left-1/2 group-hover:opacity-100 pointer-events-none ${
          dark ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        {country.name}
      </div>
    </div>
  );
};

export default FlagIcon;
