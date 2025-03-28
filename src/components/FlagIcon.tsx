import { Country } from "@/types";
import Image from "next/image";

type Props = {
  className?: string;
  country: Country;
  dark?: boolean;
  isHighlighted?: boolean;
};

/**
 * A component that displays a country's flag as an image with a tooltip.
 * @param {Props} props - The properties for the FlagIcon component.
 * @param {string} [props.className] - Optional class name for styling.
 * @param {Country} props.country - The country object containing the flag image URL and country name.
 * @param {boolean} [props.dark] - Optional flag to determine tooltip styling (dark or light).
 * @param {boolean} [props.isHighlighted] - Optional flag to determine if the country is highlighted.
 *
 * @returns {JSX.Element} A JSX element that displays the flag and the country's name as a tooltip.
 */
const FlagIcon = (props: Props) => {
  const { className, country, dark, isHighlighted } = props;

  return (
    <div className="group relative">
      <Image
        src={country.flag}
        alt={country.name}
        width={90}
        height={60}
        className={`h-12 w-16 object-contain drop-shadow-md ${className || ""}`}
        priority
      />

      {isHighlighted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute -right-2 -top-2 size-6 fill-green-700"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
      )}

      <div
        className={`pointer-events-none absolute left-1/2 top-[calc(100%+1rem)] z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded px-2 py-1 text-xs font-bold opacity-0 shadow-md transition group-hover:opacity-100 ${
          dark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {isHighlighted ? "You have both visited " : ""} {country.name}
      </div>
    </div>
  );
};

export default FlagIcon;
