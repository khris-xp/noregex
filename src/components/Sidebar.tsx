"use client";

import { Category } from "@/constants/category.constant";
import { CountryType } from "@/types/country";
import { SearchParamsProps } from "@/types/search";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import Checkbox from "./Checkbox";
import Divider from "./Divider";

type Props = {
  country: CountryType[];
  searchParams: SearchParamsProps;
};

type SidebarState = {
  isSidebarOpen: boolean;
  isDropdownCategoryOpen: boolean;
  isDropdownCountryOpen: boolean;
  searchedCountry: boolean;
  searchName: string;
  searchTerm: string;
  startYear: string;
  endYear: string;
  startBornYear: string;
  endBornYear: string;
  motivationSearch: string;
  selectedCategories: string[];
  selectedCountries: string[];
  checkboxStates: Record<string, boolean>;
  countryCheckboxState: Record<string, boolean>;
};

export default function Sidebar(props: Props) {
  const router = useRouter();
  const countryRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [state, setState] = useState<SidebarState>({
    isSidebarOpen: false,
    isDropdownCategoryOpen: false,
    isDropdownCountryOpen: false,
    searchedCountry: false,
    searchName: "",
    searchTerm: "",
    startYear: "",
    endYear: "",
    startBornYear: "",
    endBornYear: "",
    motivationSearch: "",
    selectedCategories: [],
    selectedCountries: [],
    checkboxStates: Object.fromEntries(
      Array.from({ length: 6 }, (_, i) => [`checkbox${i + 1}`, false]),
    ),
    countryCheckboxState: Object.fromEntries(
      Array.from({ length: 255 }, (_, i) => [`checkbox${i + 1}`, false]),
    ),
  });

  const updateState = (updates: Partial<SidebarState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const handleCheckboxChange = (
    checkboxKey: string,
    stateKey: "checkboxStates" | "countryCheckboxState",
    selectedKey: "selectedCategories" | "selectedCountries",
  ) => {
    setState((prevState) => {
      const newCheckboxState = {
        ...prevState[stateKey],
        [checkboxKey]: !prevState[stateKey][checkboxKey],
      };

      const index = checkboxKey.match(/\d+/)?.[0];
      if (index) {
        const selectedIndex = parseInt(index);
        const newSelected = newCheckboxState[checkboxKey]
          ? [...prevState[selectedKey], `${selectedIndex}`]
          : prevState[selectedKey].filter(
              (item) => item !== `${selectedIndex}`,
            );

        return {
          ...prevState,
          [stateKey]: newCheckboxState,
          [selectedKey]: newSelected,
        };
      }

      return { ...prevState, [stateKey]: newCheckboxState };
    });
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchTerm: e.target.value });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const matchedCountryIndex = props.country.findIndex((c) =>
        c.name.common.toLowerCase().includes(state.searchTerm.toLowerCase()),
      );
      if (matchedCountryIndex !== -1) {
        const checkbox = countryRefs.current[matchedCountryIndex];
        if (checkbox) {
          checkbox.scrollIntoView({ behavior: "smooth", block: "nearest" });
          handleCountryCheckboxChange(`checkbox${matchedCountryIndex + 1}`);
        }
      }
    }
  };
  const handleSearch = () => {
    const getCheckedItems = <T extends CountryType | string>(
      items: T[],
      state: { [key: string]: boolean },
    ): T[] => {
      if (Array.isArray(items)) {
        return items.filter((_, idx) => state[`checkbox${idx + 1}`]);
      }
      return [];
    };

    const categories = getCheckedItems(Category, state.checkboxStates);
    const countries = getCheckedItems(
      props.country,
      state.countryCheckboxState,
    ).map((c) => (c as CountryType).name.common);

    const filters = [
      categories.length && `category_filter=${categories.join(",")}`,
      state.searchName && `name_filter=${state.searchName}`,
      state.startYear && `prize_year_start=${state.startYear}`,
      state.endYear && `prize_year_end=${state.endYear}`,
      state.startBornYear && `birth_year_start=${state.startBornYear}`,
      state.endBornYear && `birth_year_end=${state.endBornYear}`,
      countries.length && `country_filter=${countries.join(",")}`,
      state.motivationSearch && `motivation_filter=${state.motivationSearch}`,
    ]
      .filter(Boolean)
      .join("&");

    const query = filters ? `?${filters}` : "";
    router.push(query);

    setState({
      ...state,
      searchedCountry: false,
      searchTerm: "",
      isSidebarOpen: false,
    });
  };

  const clearFilter = () => {
    setState({
      ...state,
      searchName: "",
      searchTerm: "",
      startYear: "",
      endYear: "",
      startBornYear: "",
      endBornYear: "",
      motivationSearch: "",
      selectedCategories: [],
      selectedCountries: [],
      searchedCountry: false,
      checkboxStates: Object.fromEntries(
        Array.from({ length: 6 }, (_, i) => [`checkbox${i + 1}`, false]),
      ),
      countryCheckboxState: Object.fromEntries(
        Array.from({ length: 255 }, (_, i) => [`checkbox${i + 1}`, false]),
      ),
    });
    router.push("/");
  };

  const toggleDropdown = (
    key: "isDropdownCategoryOpen" | "isDropdownCountryOpen",
  ) => {
    updateState({ [key]: !state[key] });
  };

  const handleCategoryCheckboxChange = (checkboxKey: string) => {
    handleCheckboxChange(checkboxKey, "checkboxStates", "selectedCategories");
  };

  const handleCountryCheckboxChange = (checkboxKey: string) => {
    handleCheckboxChange(
      checkboxKey,
      "countryCheckboxState",
      "selectedCountries",
    );
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
      <button
        onClick={() => updateState({ isSidebarOpen: !state.isSidebarOpen })}
        className={`md:hidden ${state.isSidebarOpen && "hidden"} fixed top-11 left-4 z-50 p-2 bg-primary text-white rounded-lg`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>

      <button
        onClick={() => updateState({ isSidebarOpen: !state.isSidebarOpen })}
        className={`md:hidden ${!state.isSidebarOpen && "hidden"} fixed top-4 right-4 z-50 p-2 bg-primary text-white rounded-lg`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-full md:w-96 h-screen p-4 bg-white transition-transform ${
          state.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
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
                value={state.searchName}
                onChange={(e) => updateState({ searchName: e.target.value })}
              />
            </li>
            <li>
              <Divider />
            </li>
            <li className="pb-2">
              {renderDropdown(
                state.isDropdownCategoryOpen,
                "Category",
                () => toggleDropdown("isDropdownCategoryOpen"),
                <div className="mt-3">
                  {Category.map((category, idx) => (
                    <li key={idx}>
                      <Checkbox
                        title={category}
                        checked={state.checkboxStates[`checkbox${idx + 1}`]}
                        onChange={() =>
                          handleCategoryCheckboxChange(`checkbox${idx + 1}`)
                        }
                      />
                    </li>
                  ))}
                </div>,
              )}
            </li>
            <li>
              <Divider />
            </li>
            <li>
              <label className="block mb-2 font-semibold">Year</label>
              <div className="flex items-center space-x-5">
                <input
                  type="text"
                  className="bg-input w-1/2 p-2.5 rounded-lg placeholder:font-light"
                  placeholder="Year"
                  value={state.startYear}
                  onChange={(e) => updateState({ startYear: e.target.value })}
                />
                <div>-</div>
                <input
                  type="text"
                  className="bg-input w-1/2 p-2.5 rounded-lg placeholder:font-light"
                  placeholder="Year"
                  value={state.endYear}
                  onChange={(e) => updateState({ endYear: e.target.value })}
                />
              </div>
            </li>
            <li>
              <Divider />
            </li>
            <li className="pb-3">
              <label className="block mb-2 font-semibold">Birthyear</label>
              <div className="flex items-center space-x-5">
                <input
                  type="text"
                  className="bg-input w-1/2 p-2.5 rounded-lg placeholder:font-light"
                  placeholder="Year"
                  value={state.startBornYear}
                  onChange={(e) =>
                    updateState({ startBornYear: e.target.value })
                  }
                />
                <div>-</div>
                <input
                  type="text"
                  className="bg-input w-1/2 p-2.5 rounded-lg placeholder:font-light"
                  placeholder="Year"
                  value={state.endBornYear}
                  onChange={(e) => updateState({ endBornYear: e.target.value })}
                />
              </div>
            </li>
            <li>
              <Divider />
            </li>
            <li className="pb-2">
              {renderDropdown(
                state.isDropdownCountryOpen,
                "Country",
                () => toggleDropdown("isDropdownCountryOpen"),
                <div className="relative">
                  <div className="sticky top-0 bg-white z-10 pb-2 p-1 m-1 my-2">
                    <input
                      type="text"
                      className="bg-input w-full p-2.5 rounded-lg"
                      placeholder="Search country"
                      value={state.searchTerm}
                      onChange={handleSearchInput}
                      onKeyDown={handleSearchKeyDown}
                    />
                  </div>
                  <ul
                    className={`overflow-y-auto max-h-60 transition-all duration-500 space-y-3 ease-in-out ${
                      state.isDropdownCountryOpen ? "opacity-100" : "opacity-0"
                    }`}
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
                          checked={
                            state.countryCheckboxState[`checkbox${idx + 1}`]
                          }
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
                value={state.motivationSearch}
                onChange={(e) =>
                  updateState({ motivationSearch: e.target.value })
                }
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
