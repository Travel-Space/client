import { Input, Select } from "antd";
const { Option } = Select;

import * as S from "./index.styled";

const options = [];

export default function SearchBar() {
  return (
    <S.SearchBarContainer>
      <S.SearchSelect placeholder="선택">
        <Option value="option1">옵션 1</Option>
      </S.SearchSelect>
      <Input.Search
        placeholder="검색어 입력"
        onSearch={value => {
          console.log("검색어:", value);
        }}
      />
    </S.SearchBarContainer>
  );
}
