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
  return (
    <>
      {dropdownOpen && (
        <ul className="w-full flex flex-col items-start pop-card z-50 mt-2 no-scroll max-h-[200px] rounded-lg overflow-y-scroll">
          {countries.sort().map((sug, ind) => (
            <li
              className="capitalize cursor-pointer hover:text-orange-600 font-semibold px-4 py-2"
              key={ind}
              onClick={() => onOptionSelected(sug)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {sug}
            </li>
          ))}
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
  const initialSearchInput = "";

  const [searchInput, setSearchInput] = useState(initialSearchInput);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<string[]>(lcSuggestions);

  const filterSuggestions = (value: string) => {
    const val = value.trim();
    const newSug = lcSuggestions.filter((sug) => ` ${sug}`.includes(` ${val}`));
    if (!newSug.includes(val) && val !== "") newSug.unshift(val);
    setFilteredSuggestions([...newSug]);
  };

  useEffect(() => filterSuggestions(searchInput), [searchInput]);

  return (
    <div
      className={`font-poppins flex flex-col items-start md:w-72 w-56 mb-3
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
            placeholder={placeholder}
            className={`capitalize h-12 flex-grow ${
              dropdownOpen
                ? "rounded-t-[7px] xl:rounded-t-xl"
                : "rounded-[7px] xl:rounded-xl"
            }  border-none transition duration-300 ease-in-out focus:bg-gray-300 leading-tight ${"placeholder-black"}`}
            onChange={(e) => {
              setSearchInput(e.target.value.toLowerCase());
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
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
