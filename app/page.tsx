import { Country } from "../types/CountryType";
import CountryCardComponent from "@/components/CountryCard";
import handleError from "@/errors/HandleError";

async function getCountries(): Promise<Country[]> {
  try {
    const response: Response = await fetch(
      "https://restcountries.com/v3.1/all"
    );
    if (!response.ok) {
      throw new Error(handleError.fetchCountryError());
    }

    const countries: Country[] = await response.json();
    countries.sort((a, b) => {
      const nameA = a.name && a.name.common ? a.name.common.toLowerCase() : "";
      const nameB = b.name && b.name.common ? b.name.common.toLowerCase() : "";
      return nameA.localeCompare(nameB);
    });

    return countries;
  } catch (error) {
    throw new Error(handleError.fetchCountryError());
  }
}

export default async function Home() {
  const countries = await getCountries();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-4 my-16">
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
