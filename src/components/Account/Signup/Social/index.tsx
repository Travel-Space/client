import Input, { Label } from "@/components/common/Input";
import * as S from "../index.styled";
import Button from "@/components/common/Button";
import axios from "axios";
import { useEffect, useState } from "react";

// 소셜 최초 가입 - 이름, 닉네임, 국적
export default function Social() {
  const [country, setCountry] = useState({ name: "", imageUrl: "" });
  async function currentCountry() {
    try {
      // 현재 ip 기준 국적 코드
      const countryCode = await axios.get("https://ipapi.co/country");
      // 국적 정보
      const country = await axios.get(
        `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=sCpHMLPz%2FblcixtApQnF3nZPFJsIZH3AbF4f67%2BSbTTtFvQzHvZFufYkHaVZawgvV2%2B%2BnAyP7uiiO7HTnQNXoQ%3D%3D&returnType=JSON&cond[country_iso_alp2::EQ]=${countryCode.data}`,
      );
      const { country_nm, country_eng_nm, download_url } = country.data.data[0];
      setCountry({ name: `${country_nm}, ${country_eng_nm}`, imageUrl: download_url });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    currentCountry();
  }, []);

  return (
    <>
      <S.InputGroup>
        <Label id="user-name">이름</Label>
        <Input id="user-name" type="text" name="user-name" placeholder="Name" disabled />
      </S.InputGroup>
      <S.InputGroup>
        <Label id="user-nickName">닉네임</Label>
        <S.InputGroup>
          <Input id="user-nickName" type="text" name="user-nickName" placeholder="NickName" />
          <S.SmallBtnGroup>
            <Button variant="confirm" shape="small" size="smallWithXsFont">
              중복확인
            </Button>
          </S.SmallBtnGroup>
        </S.InputGroup>
      </S.InputGroup>
      <S.InputGroup>
        <Label id="user-country">국적</Label>
        <S.InputGroup>
          <Input id="user-country" type="text" name="user-country" readOnly value={country.name} />
          <S.SmallBtnGroup $country>
            <img src={country.imageUrl} />
          </S.SmallBtnGroup>
        </S.InputGroup>
      </S.InputGroup>
    </>
  );
}
