import type { Country } from "@/types/CountryType";
import Image from "next/image";
import CountryCardComponent from "@/components/CountryCard";
import LinkComponent from "@/components/Link";
import handleError from "@/errors/HandleError";

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
      <h1 className="text-5xl text-center font-bold text-gray-800 my-16">
        {country.name.common}
      </h1>
      <LinkComponent link="/" text="◀ Back to Homepage" target="_self" />

      <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
        <section className="flex flex-col w-2/5">
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🆔 Official Name:</b> {country.name.official}
          </h2>
          {country.capital && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🏙️ Capital:</b>
              <div>
                {Object.values(country.capital).map((capital) => (
                  <span
                    key={country.population}
                    className="inline-block px-2 bg-indigo-700 w-fit text-white rounded-full mr-2 text-sm"
                  >
                    {capital}
                  </span>
                ))}
              </div>
            </h2>
          )}
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Region:</b> {country.region}{" "}
            {country.subregion && `- ${country.subregion}`}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👪 Population:</b> {formatter.format(country.population)}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👩🏻‍🤝‍🧑🏽 Demonym:</b> {country.demonyms.eng.m}
          </h2>
          {country.languages && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🗣️ Language:</b>
              <div>
                {Object.values(country.languages).map((language) => (
                  <span
                    key={language}
                    className="inline-block px-2 bg-indigo-700 w-fit text-white rounded-full mr-2 text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </h2>
          )}
          {country.currencies && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>💰 Currency:</b>
              <div>
                {Object.values(country.currencies).map((currency) => (
                  <span
                    key={currency.symbol}
                    className="inline-block px-2 bg-indigo-700 w-fit text-white rounded-full mr-2 text-sm"
                  >
                    {currency.name}{" "}
                    {currency.symbol && `( ${currency.symbol} )`}
                  </span>
                ))}
              </div>
            </h2>
          )}
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🕒 Timezone:</b>{" "}
            <div>
              {Object.values(country.timezones).map((time) => (
                <span
                  key={time}
                  className="inline-block px-2 bg-indigo-700 w-fit text-white rounded-full mr-2 text-sm"
                >
                  {time}
                </span>
              ))}
            </div>
          </h2>
        </section>
        <div className="relative w-1/2">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            width={500}
            height={336}
            className="object-cover shadow-2xl border-slate-100 border-2 rounded-xl"
          />
        </div>
      </article>
      <div className="flex gap-5 mt-3">
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
          <div className="grid grid-cols-5 w-full mt-3 mb-16 gap-5">
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
