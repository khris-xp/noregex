"use client";

import { SearchParamsProps } from "@/app/page";
import { Category } from "@/constants/category.constant";
import { CountryType } from "@/types/country";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import Checkbox from "./Checkbox";
import Divider from "./Divider";

type Props = {
  country: CountryType[];
  searchParams: SearchParamsProps;
};

export default function Sidebar(props: Props) {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchedCountry, setSearchedCountry] = useState<boolean>(false);
  const [isDropdownCategoryOpen, setIsDropdownCategoryOpen] =
    useState<boolean>(false);
  const [isDropdownCountryOpen, setIsDropdownCountryOpen] =
    useState<boolean>(false);
  const [searchName, setSearchName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const countryRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [checkboxStates, setCheckboxStates] = useState(
    Array(6)
      .fill(false)
      .reduce(
        (acc, _, idx) => ({
          ...acc,
          [`checkbox${idx + 1}`]: false,
        }),
        {},
      ),
  );

  const [countryCheckboxState, setCountryCheckBoxState] = useState(
    Array(255)
      .fill(false)
      .reduce(
        (acc, _, idx) => ({
          ...acc,
          [`checkbox${idx + 1}`]: false,
        }),
        {},
      ),
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const matchedCountryIndex = props.country.findIndex((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (matchedCountryIndex !== -1) {
        countryRefs.current[matchedCountryIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        handleCountryCheckboxChange(`checkbox${matchedCountryIndex + 1}`);
      }
      setSearchedCountry(true);
    }
  };

  const handleSearch = () => {
    const categories = Category.filter(
      (_, idx) => checkboxStates[`checkbox${idx + 1}`],
    );
    const country = props.country.filter(
      (_, idx) => countryCheckboxState[`checkbox${idx + 1}`],
    );

    const countryName = country.map((c) => c.name.common);

    let query = "?";

    if (categories.length > 0) {
      query += `category_filter=${categories.join(",")}&`;
    }

    if (searchName !== "") {
      query += `name_filter=${searchName}&`;
    }

    if (countryName.length > 0) {
      query += `country_filter=${countryName.join(",")}&`;
    }

    if (searchTerm) {
      query += `name_filter=${searchTerm}&`;
    }

    router.push(`${query}`);

    setSearchedCountry(true);
  };

  const clearFilter = () => {
    setSelectedCategories([]);
    setSelectedCountries([]);
    setSearchName("");
    setSearchTerm("");
    setSearchedCountry(false);
    setCheckboxStates(
      Array(6)
        .fill(false)
        .reduce(
          (acc, _, idx) => ({
            ...acc,
            [`checkbox${idx + 1}`]: false,
          }),
          {},
        ),
    );
    setCountryCheckBoxState(
      Array(255)
        .fill(false)
        .reduce(
          (acc, _, idx) => ({
            ...acc,
            [`checkbox${idx + 1}`]: false,
          }),
          {},
        ),
    );
    router.push("/");
  };

  const toggleDropdown = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => setter((prev) => !prev);

  interface CheckboxState {
    [key: string]: boolean;
  }

  type SetStateAction = React.Dispatch<React.SetStateAction<CheckboxState>>;

  const handleCategoryCheckboxChange = (checkboxKey: string) => {
    handleCheckboxChange(
      setCheckboxStates,
      checkboxKey,
      setSelectedCategories,
      selectedCategories,
    );
  };

  const handleCountryCheckboxChange = (checkboxKey: string) => {
    handleCheckboxChange(
      setCountryCheckBoxState,
      checkboxKey,
      setSelectedCountries,
      selectedCountries,
    );
  };

  const handleCheckboxChange = (
    setState: SetStateAction,
    checkboxKey: string,
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    selectedItems: string[],
  ) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        [checkboxKey]: !prevState[checkboxKey],
      };

      const index = checkboxKey.match(/\d+/)?.[0];
      if (index) {
        const selectedIndex = parseInt(index);

        if (newState[checkboxKey]) {
          setSelectedItems([...selectedItems, `${selectedIndex}`]);
        } else {
          setSelectedItems(
            selectedItems.filter((item) => item !== `${selectedIndex}`),
          );
        }
      }

      return newState;
    });
  };

  const renderDropdown = (
    isOpen: boolean,
    title: string,
    toggle: () => void,
    content: JSX.Element,
  ) => (
    <div>
      <button
        type="button"
        className="flex items-center w-full text-base text-gray-900 transition duration-75 rounded-lg group"
        onClick={toggle}
      >
        <span className="flex-1 text-left font-semibold whitespace-nowrap">
          {title}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="m1 1 4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul
        className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {content}
      </ul>
    </div>
  );

  return (
    <div>
      <button className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>

      <aside className="fixed top-0 left-0 z-40 w-96 h-screen p-4">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <h1 className="text-3xl font-semibold text-primary">NoRegEX</h1>
            </li>
            <li>
              <h1 className="text-xl font-semibold py-4">
                Find Your Nobel Inspiration!
              </h1>
            </li>
            <li>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                className="bg-input w-full p-2.5 rounded-lg"
                placeholder="Search name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </li>
            <li>
              <Divider />
            </li>
            <li className="pb-2">
              {renderDropdown(
                isDropdownCategoryOpen,
                "Category",
                () => toggleDropdown(setIsDropdownCategoryOpen),
                <Fragment>
                  {Category.map((category, idx) => (
                    <li
                      className={`overflow-hidden transition-all duration-500 space-y-3 my-3 ease-in-out ${
                        isDropdownCategoryOpen
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                      key={idx}
                    >
                      <Checkbox
                        title={category}
                        checked={checkboxStates[`checkbox${idx + 1}`]}
                        onChange={() =>
                          handleCategoryCheckboxChange(`checkbox${idx + 1}`)
                        }
                      />
                    </li>
                  ))}
                </Fragment>,
              )}
            </li>
            <li>
              <Divider />
            </li>
            <li className="pb-2">
              {renderDropdown(
                isDropdownCountryOpen,
                "Country",
                () => toggleDropdown(setIsDropdownCountryOpen),
                <div className="relative">
                  <input
                    type="text"
                    className="bg-input w-11/12 p-2.5 rounded-lg my-2 ml-2 mb-5 mr-14 z-10 sticky top-1"
                    placeholder="Search country"
                    value={searchTerm}
                    onChange={handleSearchInput}
                    onKeyDown={handleSearchKeyDown}
                  />
                  <ul
                    className={`overflow-y-auto transition-all duration-500 space-y-3 ease-in-out ${
                      isDropdownCountryOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    } ${searchedCountry ? "mt-16" : "mt-0"}`}
                  >
                    {props.country.map((c, idx) => (
                      <li
                        key={idx}
                        ref={(el) => {
                          countryRefs.current[idx] = el;
                        }}
                      >
                        <Checkbox
                          title={c.name.common}
                          checked={countryCheckboxState[`checkbox${idx + 1}`]}
                          onChange={() =>
                            handleCountryCheckboxChange(`checkbox${idx + 1}`)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>,
              )}
            </li>
            <li>
              <Divider />
            </li>
            <li>
              <label className="block mb-2 font-semibold">Quote</label>
              <input
                type="text"
                className="bg-input w-full p-2.5 rounded-lg"
                placeholder="Search quote"
              />
            </li>
            <li>
              <button
                onClick={handleSearch}
                className="w-full bg-primary py-2 text-white rounded-xl mb-5 mt-3"
              >
                Search
              </button>
              <button
                onClick={clearFilter}
                className="w-1/4 py-1 text-gray-400 rounded-xl border border-gray-400"
              >
                <div className="flex items-center justify-center space-x-1">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_78_580)">
                        <path
                          d="M0.666687 2.66666V6.66666H4.66669"
                          stroke="#B5B5B5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.34002 10C2.77228 11.2269 3.59158 12.2801 4.67446 13.0009C5.75734 13.7217 7.04514 14.0711 8.34383 13.9963C9.64252 13.9216 10.8817 13.4268 11.8748 12.5865C12.8678 11.7462 13.5609 10.606 13.8495 9.33758C14.1381 8.06917 14.0067 6.74131 13.4751 5.55407C12.9435 4.36684 12.0404 3.38454 10.9019 2.75518C9.76345 2.12583 8.45129 1.88352 7.16314 2.06475C5.87499 2.24599 4.68063 2.84095 3.76002 3.76001L0.666687 6.66667"
                          stroke="#B5B5B5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_78_580">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>Clear</div>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
