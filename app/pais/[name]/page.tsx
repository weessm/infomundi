import type { Country } from "@/types/CountryType";
import Link from "next/link";
import Image from "next/image";

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  return (await response.json())[0];
}

function getCurrencyName(country: Country): string[] {
  const currencyName = Object.values(country.currencies).map(
    (currency) => currency.name
  );
  return currencyName;
}

function getOfficialNativeName(country: Country): string[] {
  const nativeName = Object.values(country.name.nativeName).map(
    (name) => name.official
  );
  return nativeName;
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(name);

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold text-gray-800 my-16">
        {country.translations.por.common}
      </h1>
      <Link href={"/"} className="flex items-center py-2 gap-2 text-lg w-fit">
        <Image
          src={"/back-arrow.svg"}
          alt="Ícone de voltar"
          width={16}
          height={16}
        />
        Voltar
      </Link>

      <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🆔 Nome Oficial:</b> {getOfficialNativeName(country)}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🏙️ Capital:</b> {country.capital}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Continente:</b> {country.region} - {country.subregion}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨 População:</b> {country.population}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗣️ Línguas Faladas:</b>
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
          <h2 className="text-xl text-gray-800 mt-3">
            <b>💰 Moeda:</b> {getCurrencyName(country)}
          </h2>
        </section>
      </article>
    </section>
  );
}
