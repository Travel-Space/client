import { useEffect, useState } from "react";
import axios from "axios";

import Input, { Label } from "@/components/common/Input";

import { InputGroup, SmallBtnGroup } from "../../index.styled";

interface PropsType {
  onCountry: (country: string) => void;
}

export default function Country({ onCountry }: PropsType) {
  const [country, setCountry] = useState({
    name: "",
    engName: "",
    imageUrl: "",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [countryList, setCountryList] = useState([]);

  async function fetchCountryList() {
    try {
      const response = await axios.get("/data/getCountryFlagList.json");
      setCountryList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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

  useEffect(() => {
    currentCountry();
    fetchCountryList();
  }, []);

  useEffect(() => {
    onCountry(country.name);
  }, [country]);

  useEffect(() => {
    // setCountryList(
    //   countryList.filter(country => {
    //     const re = new RegExp(searchInput, "gi");
    //     return country.name.match(re);
    //   }),
    // );
  }, [searchInput]);
  return (
    <>
      <InputGroup>
        <Label id="nationality">국적</Label>
        <InputGroup onClick={() => setShowSearch(prev => !prev)}>
          <Input
            id="nationality"
            type="text"
            name="nationality"
            readOnly
            value={`${country.name}, ${country.engName}`}
          />
          <SmallBtnGroup $country>
            <img src={country.imageUrl} alt={country.name} />
          </SmallBtnGroup>
        </InputGroup>
      </InputGroup>
      {showSearch && (
        <div>
          <input type="text" onChange={onSearchInput} placeholder="나라이름을 검색해보세요." />
          <span className="length">
            {countryList.length > 0 ? `검색 결과: ${countryList.length}건` : "검색 결과 없음"}
          </span>
          <ul>
            {countryList.map((country: { country_eng_nm: string; country_nm: string; download_url: string }) => (
              <li key={country.country_eng_nm} onClick={() => onChangeCountry(country)}>
                <p>
                  {country.country_nm}, {country.country_eng_nm}
                </p>
                <img src={country.download_url} alt={country.country_nm} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
