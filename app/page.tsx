import Image from "next/image";
import { Country } from "../types/CountryType";
import Link from "next/link";

async function getCountries(): Promise<Country[]> {
  const response: Response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  countries.sort((a, b) => {
    const nameA = a.name.common.toUpperCase();
    const nameB = b.name.common.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return countries;
}

export default async function Home() {
  const countries = await getCountries();

  return (
    <section className="grid grid-cols-5 w-full container gap-2  mt-16">
      {countries.map((country) => (
        <Link
          key={country.name.common}
          href={`/country/${country.name.common.toLowerCase()}`}
        >
          <article className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 hover:shadow-xl transition-all">
            <div className="relative w-full h-40 overflow-hidden p-2 rounded-xl">
              <Image
                src={country.flags.svg}
                alt={country.flags.alt}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="font-bold text-xl text-center mt-3">
              {country.name.common}
            </h1>
          </article>
        </Link>
      ))}
    </section>
  );
}
