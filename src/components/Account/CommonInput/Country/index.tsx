import axios from "axios";
import { useEffect, useState } from "react";
import { InputGroup, SmallBtnGroup } from "../../index.styled";
import Input, { Label } from "@/components/common/Input";

interface PropsType {
  onCountry: (country: string) => void;
}

export default function Country({ onCountry }: PropsType) {
  const [country, setCountry] = useState({
    name: "",
    engName: "",
    imageUrl: "",
  });

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

  useEffect(() => {
    currentCountry();
  }, []);

  useEffect(() => {
    onCountry(country.name);
  }, [country]);
  return (
    <>
      <InputGroup>
        <Label id="nationality">국적</Label>
        <InputGroup>
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
    </>
  );
}
