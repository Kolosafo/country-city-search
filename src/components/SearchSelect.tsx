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
        <ul className="w-full max-h-[140px] rounded-b-[7px] border-x border-b border-solid border-primary-gray xl:rounded-b-xl overflow-y-scroll divide-y">
          {countries.sort().map((sug, ind) => (
            <li
              className="capitalize cursor-pointer hover:text-orange-600 px-7 py-3"
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
  const [selectedOptions, setSelectedOptions] = useState<string>("");
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
  useEffect(() => {
    onTextChange(selectedOptions.toString());
  }, [selectedOptions]);

  return (
    <div
      className={`font-poppins w-full mb-3
        ${minWidth ? "min-w-[267px]" : ""}
        `}
    >
      {label !== undefined && (
        <span className="font-normal text-base capitalize">{label}</span>
      )}

      <>
        <div
          className={`mt-3 w-full shrink-0 flex flex-row ${
            dropdownOpen
              ? "rounded-t-[7px] xl:rounded-t-xl"
              : "rounded-[7px] xl:rounded-xl"
          } shadow appearance-none border border-solid border-primary-gray ${"hover:border-orange-600 hover:shadow-golden hover:placeholder-transparent"}`}
        >
          <Input
            placeholder={placeholder}
            className={`capitalize h-16 flex-grow ${
              dropdownOpen
                ? "rounded-t-[7px] xl:rounded-t-xl"
                : "rounded-[7px] xl:rounded-xl"
            }  border-none transition duration-300 ease-in-out leading-tight focus:outline-none focus:shadow-outline ${"placeholder-black"}`}
            onChange={(e) => {
              setSearchInput(e.target.value.toLowerCase());
              setSelectedOptions(e.target.value.toLowerCase());
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
            setSelectedOptions(option.toLowerCase());
            setSearchInput(option.toLowerCase());
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
