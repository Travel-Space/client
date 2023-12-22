import { useEffect, useState } from "react";
import axios from "axios";

import { CountryInfo } from "@/@types/User";
import { Default } from "@/@types/Modal";

import * as S from "./index.styled";

interface PropsType extends Default {
  onCountry: (country: CountryInfo) => void;
}

let initCountryList: CountryInfo[];

const getCountryList = async () => {
  try {
    const response = await axios.get(`${window.location.origin}/data/getCountryFlagList.json`);
    initCountryList = response.data;
  } catch (error) {
    console.error(error);
  }
};
getCountryList();

export default function SearchCountry({ onCountry, onClose }: PropsType) {
  const [searchInput, setSearchInput] = useState("");
  const [countryList, setCountryList] = useState<CountryInfo[]>(initCountryList);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleChangeCountry = (value: CountryInfo) => {
    onCountry(value);
    onClose();
  };

  useEffect(() => {
    getCountryList();
  }, []);

  useEffect(() => {
    const re = new RegExp(searchInput, "gi");
    const filterdList = initCountryList.filter(country => {
      return re.test(country.country_nm) || re.test(country.country_eng_nm);
    });
    setCountryList(filterdList);
  }, [searchInput]);

  return (
    <S.SearchBox>
      <S.Search>
        <input type="text" onChange={handleSearch} placeholder="나라 이름을 검색해 보세요." />
      </S.Search>
      <S.SearchList>
        {countryList.map((country: CountryInfo) => (
          <li key={country.country_eng_nm} onClick={() => handleChangeCountry(country)}>
            <p>
              {country.country_nm}, <span>{country.country_eng_nm}</span>
            </p>
            <img src={country.download_url} alt={country.country_nm} />
          </li>
        ))}
      </S.SearchList>
    </S.SearchBox>
  );
}
