import { useEffect, useState } from "react";
import "./App.css";
import { countries } from "countries-list";
import { SearchCountryCityInput } from "./components/SearchSelect";

function App() {
  const [countryAndCapitals, setCountryAndCapitals] = useState<string[]>([]);
  const [selectedVal, setSelectedVal] = useState("");

  const handleTextChange = (text: string) => {
    setSelectedVal(text);
  };
  useEffect(() => {
    const allCountries = Object.values(countries);
    const getCountryNames = allCountries.map((country) => country.name);
    const getCountryCapitals = allCountries.map((country) => country.capital);
    const combinedSortedArray = [
      ...getCountryNames,
      ...getCountryCapitals,
    ].sort();

    // SET TIMEOUT TO MIMIC API CALL

    // setTimeout(() => {
    setCountryAndCapitals(combinedSortedArray);
    // }, 5000);
  }, []);
  return (
    <div className="md:p-20 p-10 flex flex-col justify-center items-center">
      <SearchCountryCityInput
        label="country or city"
        placeholder="Search country or city"
        countries={countryAndCapitals}
        onTextChange={handleTextChange}
      />
    </div>
  );
}

export default App;
