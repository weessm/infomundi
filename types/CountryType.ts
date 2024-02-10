export type Country = {
  name: {
    official: string;
    common: string;
  };
  capital: string;
  region: string;
  subregion: string;
  population: number;
  demonyms: {
    eng: {
      m: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  timezones: string[];
};
