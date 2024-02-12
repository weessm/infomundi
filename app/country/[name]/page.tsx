import type { Country } from "@/types/CountryType";
import Image from "next/image";
import CountryCardComponent from "@/components/CountryCard";
import LinkComponent from "@/components/Link";
import handleError from "@/errors/HandleError";
import CountryDetailsComponent from "@/components/CountryDetails";

async function getCountryByName(name: string): Promise<Country> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error(handleError.fetchCountryError());
    }

    const countries: Country[] = await response.json();
    const foundCountry = countries.find(
      (country: Country) =>
        country.name.common.toLowerCase() === name.toLowerCase()
    );
    if (!foundCountry) {
      throw new Error(handleError.countryNotFoundError());
    }
    return foundCountry!;
  } catch (error) {
    throw new Error(handleError.countryNotFoundError());
  }
}

async function getCountryBorderByName(
  name: string
): Promise<{ name: string; flagSvg: string; flagAlt: string }[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error(handleError.fetchCountryError());
    }

    const countries: Country[] = await response.json();

    const country = countries.find(
      (country: Country) =>
        country.name.common.toLowerCase() === name.toLowerCase()
    );
    if (!country) {
      throw new Error(handleError.countryNotFoundError());
    }

    if (!country.borders) {
      return [];
    }

    const borderCountries = country.borders.map((border) => {
      const borderCountry = countries.find(
        (country) => country.cca3 === border
      )!;

      return {
        name: borderCountry.name.common,
        flagSvg: borderCountry.flags.svg,
        flagAlt: borderCountry.flags.alt,
      };
    });

    return borderCountries;
  } catch (error) {
    throw new Error(handleError.fetchCountryBorderError());
  }
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));
  const borderCountry = await getCountryBorderByName(decodeURI(name));

  const formatter = Intl.NumberFormat("en-US", { notation: "compact" });

  return (
    <section className="flex flex-col container">
      <h1 className="text-4xl sm:text-5xl text-center font-bold text-gray-800 my-16">
        {country.name.common.toUpperCase()}
      </h1>
      <LinkComponent link="/" text="◀ Back to Homepage" target="_self" />

      <article className="flex flex-col-reverse lg:flex-row justify-between min-w-full gap-4 p-6 bg-slate-300 rounded-xl">
        <section className="flex flex-col w-full lg:w-1/2">
          <CountryDetailsComponent country={country} />
        </section>
        <div className="relative mb-10 w-full lg:w-1/2 flex items-center justify-center lg:justify-start">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            width={500}
            height={340}
            className="object-cover mx-auto my-auto shadow-2xl border-slate-500 border-1 rounded-lg"
          />
        </div>
      </article>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-4">
        <LinkComponent
          link={country.maps.googleMaps}
          text="🌐 Google Maps"
          target="_blank"
        />
        <LinkComponent
          link={country.maps.openStreetMaps}
          text="🌐 Open Street Maps"
          target="_blank"
        />
        <LinkComponent
          link={`https://en.wikipedia.org/wiki/${country.name.common}`}
          text="🌐 Wikipedia"
          target="_blank"
        />
      </div>
      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">Borders</h3>
        {borderCountry.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4 mt-6">
            {borderCountry.map((border) => (
              <CountryCardComponent key={border.name} {...border} />
            ))}
          </div>
        )}
        {borderCountry.length <= 0 && (
          <div className="w-full mt-3 mb-16">
            <p className="text-xl text-gray-800 mt-3">
              This country has no land borders
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
