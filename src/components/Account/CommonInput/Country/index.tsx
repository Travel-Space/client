import { useEffect, useState } from "react";
import axios from "axios";

import Input, { Label } from "@/components/common/Input";

import { InputGroup, SmallBtnGroup } from "../../index.styled";
import * as S from "./index.styled";
import { CountryInfo } from "@/@types/User";

interface PropsType {
  onCountry: (country: string) => void;
}

let initCountryList: CountryInfo[];

async function fetchCountryList() {
  try {
    const response = await axios.get("http://localhost:3000/data/getCountryFlagList.json");
    initCountryList = response.data;
  } catch (error) {
    console.error(error);
  }
}
fetchCountryList();

export default function Country({ onCountry }: PropsType) {
  const [country, setCountry] = useState({
    name: "",
    engName: "",
    imageUrl: "",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [countryList, setCountryList] = useState<CountryInfo[]>(initCountryList);

  // CORS 에러 수정 예정
  async function currentCountry() {
    try {
      // 현재 ip 기준 국적 코드
      const countryCode = await axios.get("https://ipapi.co/country");
      // 국적 정보
      const country = await axios.get(
        `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=sCpHMLPz%2FblcixtApQnF3nZPFJsIZH3AbF4f67%2BSbTTtFvQzHvZFufYkHaVZawgvV2%2B%2BnAyP7uiiO7HTnQNXoQ%3D%3D&returnType=JSON&cond[country_iso_alp2::EQ]=${countryCode.data}`,
      );
      const { country_nm, country_eng_nm, download_url } = country.data.data[0];
      setCountry({ name: country_nm, engName: country_eng_nm, imageUrl: download_url });
    } catch (error) {
      console.error(error);
    }
  }

  function onSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  function onChangeCountry(value: CountryInfo) {
    const { country_nm, country_eng_nm, download_url } = value;
    setCountry({ name: country_nm, engName: country_eng_nm, imageUrl: download_url });
    setShowSearch(false);
    setSearchInput("");
  }

  useEffect(() => {
    currentCountry();
    fetchCountryList();
  }, []);

  useEffect(() => {
    onCountry(country.name);
  }, [country]);

  useEffect(() => {
    const re = new RegExp(searchInput, "gi");
    const filterdList = initCountryList.filter(country => {
      return re.test(country.country_nm) || re.test(country.country_eng_nm);
    });
    setCountryList(filterdList);
  }, [searchInput]);

  return (
    <>
      <InputGroup>
        <Label id="nationality">국적</Label>
        <S.Group>
          <Input
            id="nationality"
            type="text"
            name="nationality"
            readOnly
            value={`${country.name}, ${country.engName}`}
            onClick={() => setShowSearch(prev => !prev)}
          />
          <SmallBtnGroup $country>
            <img src={country.imageUrl} alt={country.name} />
          </SmallBtnGroup>
          {showSearch && (
            <S.SearchBox>
              <S.Search>
                <input type="text" onChange={onSearchInput} placeholder="나라이름을 검색해보세요." />
              </S.Search>
              <S.SearchList>
                {countryList.map((country: CountryInfo) => (
                  <li key={country.country_eng_nm} onClick={() => onChangeCountry(country)}>
                    <p>
                      {country.country_nm}, <span>{country.country_eng_nm}</span>
                    </p>
                    <img src={country.download_url} alt={country.country_nm} />
                  </li>
                ))}
              </S.SearchList>
            </S.SearchBox>
          )}
        </S.Group>
      </InputGroup>
    </>
  );
}
