import type { Country } from "@/types/CountryType";
import Link from "next/link";
import Image from "next/image";

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  return (await response.json())[0];
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(name);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold text-gray-800 my-16">
        {country.name.common}
      </h1>
      <Link href={"/"} className="flex items-center py-2 gap-2 text-lg w-fit">
        <Image src={"/back-arrow.svg"} alt="Back icon" width={16} height={16} />
        Back
      </Link>

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
                    key={`${capital}${country.population}`}
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
    </section>
  );
}
