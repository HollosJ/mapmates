import InteractiveMap from "@/components/Map/InteractiveMap";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Map | Map Mates",
};

const MyMapPage = async () => {
  return (
    <>
      <InteractiveMap />

      <div className="absolute left-0 top-4 flex items-center gap-2 rounded-e-lg bg-white px-4 py-2 text-lg shadow-md">
        <Link href={"/profile"}>
          <HomeIcon
            className="size-6"
            aria-label="Go to your profile"
            title="Go to your profile"
          />
        </Link>

        <div className="h-6 w-px rounded-full bg-black"></div>

        <h1 className="text-lg">Where have you been?</h1>
      </div>
    </>
  );
};

export default MyMapPage;
