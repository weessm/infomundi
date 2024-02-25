import handleError from "@/errors/HandleError";
import { Country } from "@/types/CountryType";

const CountryDetailsComponent = ({ country }: { country: Country }) => {
  if (!country) {
    throw new Error(handleError.countryNotFoundError());
  }

  const formatter = new Intl.NumberFormat("en-US");

  const renderDetailList = (label: string, list: string[] | string) => (
    <h2 className="text-xl text-gray-800 mt-3">
      <b>{label}</b>
      <div>
        {Object.values(list).map((item) => (
          <span
            key={item}
            className="inline-block px-4 bg-gray-600 w-fit text-white rounded-full my-1 mr-2 text-lg"
          >
            {item}
          </span>
        ))}
      </div>
    </h2>
  );

  return (
    <>
      {renderDetailList("🆔 Official Name:", [country.name.official])}
      {country.capital && renderDetailList("🏙️ Capital:", country.capital)}
      {renderDetailList("🗺️ Region:", [
        `${country.region} ${
          country.subregion ? `- ${country.subregion}` : ""
        }`,
      ])}
      {renderDetailList("👪 Population:", [
        `${
          country.population > 0
            ? formatter.format(country.population)
            : "Uninhabited"
        }`,
      ])}
      {country.demonyms &&
        renderDetailList("🧑 Demonym:", country.demonyms.eng.m.split(","))}
      {country.languages &&
        renderDetailList("🗣️ Language:", Object.values(country.languages))}
      {country.currencies &&
        renderDetailList(
          "💰 Currency:",
          Object.values(country.currencies).map(
            (currency) =>
              `${currency.name} ${
                currency.symbol ? `( ${currency.symbol} )` : ""
              }`
          )
        )}
      {country.timezones &&
        renderDetailList("⌛ Timezone:", Object.values(country.timezones))}
    </>
  );
};

export default CountryDetailsComponent;
