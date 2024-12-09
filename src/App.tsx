import { useEffect, useState } from "react";
import "./App.css";
import { countries } from "countries-list";
import { SearchCountryCityInput } from "./components/SearchSelect";
import { CardDetail } from "./components/Card";

function App() {
  const [countryAndCapitals, setCountryAndCapitals] = useState<string[]>([]);
  const allCountries = Object.values(countries);
  const [selectedVal, setSelectedVal] = useState("");

  const handleTextChange = (text: string) => {
    setSelectedVal(text);
  };
  useEffect(() => {
    const getCountryNames = allCountries.map((country) => country.name);
    const getCountryCapitals = allCountries.map((country) => country.capital);
    const combinedSortedArray = [
      ...getCountryNames,
      ...getCountryCapitals,
    ].sort();

    setCountryAndCapitals(combinedSortedArray);
  }, [allCountries]);
  return (
    <div className="p-20">
      <SearchCountryCityInput
        label="Search country or city"
        placeholder="Search or input a country or city name"
        countries={countryAndCapitals}
        onTextChange={handleTextChange}
      />
      <CardDetail title={selectedVal} />
    </div>
  );
}

export default App;
