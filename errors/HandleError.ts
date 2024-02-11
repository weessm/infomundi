const realoadSolution =
  "Possible solution: Wait a few seconds and press F5 or Ctrl+F5 to reload the page";

const handleError = {
  fetchCountryError: () => {
    return `Error: Failed to fetch countries/${realoadSolution}`;
  },
  fetchCountryBorderError: () => {
    return `Error: Failed to fetch country borders/${realoadSolution}`;
  },
  countryNotFoundError: () => {
    return `Error: Country not found/Possible Solution: Check the spelling and existence of the country and try again`;
  },
};

export default handleError;
