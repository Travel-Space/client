const getCurrentCountry = async () => {
  try {
    const response1 = await fetch("https://ipapi.co/country");
    if (!response1.ok) {
      throw new Error("ipapi 서버 응답 실패");
    }
    const data = await response1.text();

    const response2 = await fetch(
      `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=${process.env.NEXT_PUBLIC_COUNTRY_API_KEY}&returnType=JSON&cond[country_iso_alp2::EQ]=${data}`,
    );
    if (!response2.ok) {
      throw new Error("공공데이터 서버 응답 실패");
    }

    const secondData = await response2.json();
    return secondData.data[0];
  } catch (error) {
    console.error("fetch 오류:", error);
  }
};

export default getCurrentCountry;
