import { Country } from "../types/CountryType";
import CountryCardComponent from "@/components/CountryCard";

async function getCountries(): Promise<Country[]> {
  const response: Response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  countries.sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
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
        <CountryCardComponent
          key={country.name.common}
          name={country.name.common}
          flagSvg={country.flags.svg}
          flagAlt={country.flags.alt}
        />
      ))}
    </section>
  );
}
