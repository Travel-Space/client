import React, { useState } from "react";
import { Input, Select } from "antd";

const { Option } = Select;

import * as S from "./index.styled";

interface OptionItem {
  value: string;
  label: string;
}

const searchOptions: { [key: string]: OptionItem[] } = {
  users: [
    { value: "name", label: "이름" },
    { value: "email", label: "이메일" },
    { value: "nickName", label: "닉네임" },
  ],
  posts: [
    { value: "name", label: "행성명" },
    { value: "authorNickname", label: "작성자" },
    { value: "title", label: "제목" },
  ],
  planets: [
    { value: "name", label: "행성명" },
    { value: "hashtag", label: "해시태그" },
    { value: "ownerNickname", label: "행성 관리자" },
  ],
  reports: [
    { value: "name", label: "이름" },
    { value: "email", label: "이메일" },
  ],
};

interface SearchBarProps {
  searchType: string;
  onSearch: (data: { [key: string]: string }) => void;
}

export default function SearchBar({ searchType, onSearch }: SearchBarProps) {
  const [selectedOption, setSelectedOption] = useState<string>("선택");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    const searchFields = searchOptions[searchType];
    const searchField = searchFields.find(item => item.value === selectedOption);
    if (searchField) {
      const data: { [key: string]: string } = {};
      data[searchField.value] = searchValue;
      onSearch(data);
    }
  };

  return (
    <S.SearchBarContainer>
      <S.SearchSelect
        placeholder="선택"
        value={selectedOption}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange={(value: string, _: any) => setSelectedOption(value as string)}
      >
        {searchOptions[searchType].map(option => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </S.SearchSelect>
      <Input.Search
        placeholder="검색어 입력"
        onSearch={handleSearch}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </S.SearchBarContainer>
  );
}
