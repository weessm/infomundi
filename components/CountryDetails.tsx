import handleError from "@/errors/HandleError";
import { Country } from "@/types/CountryType";

const CountryDetailsComponent = ({ country }: { country: Country }) => {
  if (!country) {
    throw new Error(handleError.countryNotFoundError());
  }

  const formatter = new Intl.NumberFormat("en-US");

  const renderDetails = (label: string, value: string | number) => (
    <h2 className="text-xl text-gray-800 mt-7">
      <b>{label}</b> {value}
    </h2>
  );

  const renderList = (label: string, list: string[]) => (
    <h2 className="text-xl text-gray-800 mt-7">
      <b>{label}</b>
      <div>
        {Object.values(list).map((item) => (
          <span
            key={item}
            className="inline-block px-2 bg-gray-600 w-fit text-white rounded-full mr-2 text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </h2>
  );

  return (
    <>
      {renderDetails("🆔 Official Name:", country.name.official)}
      {country.capital && renderDetails("🏙️ Capital:", country.capital)}
      {renderDetails(
        "🗺️ Region:",
        `${country.region} ${country.subregion ? `- ${country.subregion}` : ""}`
      )}
      {renderDetails("👪 Population:", formatter.format(country.population))}
      {renderDetails("👩🏻‍🤝‍🧑🏽 Demonym:", country.demonyms.eng.m)}
      {country.languages &&
        renderList("🗣️ Language:", Object.values(country.languages))}
      {country.currencies &&
        renderList(
          "💰 Currency:",
          Object.values(country.currencies).map(
            (currency) =>
              `${currency.name} ${currency.symbol && `( ${currency.symbol} )`}`
          )
        )}
      {country.timezones &&
        renderList("⌛ Timezone:", Object.values(country.timezones))}
    </>
  );
};

export default CountryDetailsComponent;
