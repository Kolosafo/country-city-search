/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect, HTMLInputTypeAttribute } from "react";
import { Input } from "./ui/input";
export interface TextInputProps {
  label?: string;
  placeholder?: string;
  textArea?: boolean;
  errorMessage?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  minWidth?: boolean;
  charCount?: number;

  // ACTIONS
  onTextChange: (text: string) => void;
  onKeyDown?: (keyCode: number) => void;
}

interface SuggestionInputProps extends TextInputProps {
  limit?: number;
  countries: string[];
}

interface SuggestionDropdownProps {
  dropdownOpen: boolean;
  countries: string[];
  onOptionSelected: (option: string) => void;
}

const SearchSelect = ({
  dropdownOpen,
  countries,
  onOptionSelected,
}: SuggestionDropdownProps) => {
  console.log("Dropdown Open: ", countries);
  return (
    <>
      {dropdownOpen && (
        <ul className="absolute md:w-72 w-56 top-[75px] left-0 flex flex-col items-start pop-card p-1 z-50 mt-2 no-scroll h-[200px] rounded-lg overflow-y-scroll">
          {countries.sort().map((sug, ind) =>
            sug ? (
              <li
                className="capitalize cursor-pointer text-start w-full rounded-lg hover:bg-green-200 font-semibold px-4 py-2"
                key={ind}
                onClick={() => onOptionSelected(sug)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {sug}
              </li>
            ) : null
          )}
        </ul>
      )}
    </>
  );
};

export const SearchCountryCityInput = ({
  label,
  placeholder,
  countries,
  onTextChange,
  minWidth = false,
  errorMessage = "",
}: SuggestionInputProps) => {
  const lcSuggestions: string[] = [];
  countries?.forEach((uni) => {
    if (!lcSuggestions.includes(uni.trim().toLowerCase()))
      lcSuggestions.push(uni.trim().toLowerCase());
  });
  const [searchInput, setSearchInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<string[]>(lcSuggestions);

  // OPTIMIZING THE FILTER FUNCTION TO USE A TIME COMPLEXITY OF 0(n)
  const filterSuggestions = (value: string) => {
    const val = value.trim();
    const newSug = lcSuggestions.filter((sug) => ` ${sug}`.includes(` ${val}`));
    if (!newSug.length && !newSug.includes(val) && val !== "") newSug.push(val); // USING THE PUSH METHOD WITH A TIME COMPLEXITY OF 0(1)
    setFilteredSuggestions([...newSug]);
  };

  useEffect(() => filterSuggestions(searchInput), [searchInput]);

  // INITIALIZE THE fILTEREd sUGs WHENEVER THE COUNTRIES ARRAY MOUNTS
  // (USUALLY WITH AN API, IT DOESNT SHOW INSTANTLY UNTIL THERE'S A RESPONSE)
  useEffect(() => setFilteredSuggestions(countries), [countries]);

  return (
    <div
      className={`font-poppins relative  flex flex-col items-start md:w-72 w-56 mb-3
        ${minWidth ? "min-w-[267px]" : ""}
        `}
    >
      {label !== undefined && (
        <span className="font-bold required text-base capitalize">{label}</span>
      )}

      <>
        <div
          className={`mt-1 w-full shrink-0 flex flex-row ${
            dropdownOpen
              ? "rounded-t-[7px] xl:rounded-t-xl"
              : "rounded-[7px] xl:rounded-xl"
          } shadow appearance-none border-none ${"hover:border-orange-600 hover:shadow-golden hover:placeholder-transparent"}`}
        >
          <Input
            placeholder={countries.length ? placeholder : "loading..."}
            className={`capitalize h-12 flex-grow ${
              dropdownOpen
                ? "rounded-t-[7px] xl:rounded-t-xl"
                : "rounded-[7px] xl:rounded-xl"
            }  border-none transition duration-300 ease-in-out focus:bg-gray-300 leading-tight ${"placeholder-black"}`}
            onChange={(e) => {
              setSearchInput(e.target.value.toLowerCase());
              setDropdownOpen(true);
            }}
            onFocus={() => {
              countries.length ? setDropdownOpen(true) : null; // hide dropdown while loading
            }}
            onBlur={() => setDropdownOpen(false)}
            type="text"
            value={searchInput}
          />
          {/* <input
            
          /> */}
        </div>
        <SearchSelect
          countries={filteredSuggestions}
          dropdownOpen={dropdownOpen}
          onOptionSelected={(option: string) => {
            setSearchInput(option.toLowerCase());
            onTextChange(option.toLowerCase());
            setDropdownOpen(false);
          }}
        />
      </>
      {
        <span className="text-red-600 text-xs">
          {errorMessage.length !== 0 && errorMessage}
        </span>
      }
    </div>
  );
};
