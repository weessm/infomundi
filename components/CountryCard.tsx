import Image from "next/image";
import Link from "next/link";

const CountryCardComponent = ({
  name,
  flagSvg,
  flagAlt,
}: {
  name: string;
  flagSvg: string;
  flagAlt: string;
}) => {
  return (
    <Link href={`/country/${name.toLowerCase()}`} passHref>
      <article
        key={name}
        className="h-64 min-w-full p-2 bg-gray-300 border-gray-300 rounded-xl border-2 hover:border-gray-400 hover:bg-gray-200 hover:shadow-xl transition-all"
      >
        <div className="relative w-full h-40 overflow-hidden p-2 rounded-xl">
          <Image src={flagSvg} alt={flagAlt} fill className="object-cover" />
        </div>
        <h1 className="font-bold text-xl text-center mt-3">{name}</h1>
      </article>
    </Link>
  );
};

export default CountryCardComponent;
