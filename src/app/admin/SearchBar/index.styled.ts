import { flexAlignCenter } from "@/styles/common";
import styled from "styled-components";
import { Select } from "antd";

export const SearchBarContainer = styled.div`
  ${flexAlignCenter}
  margin-left: auto;
  max-width: 652px;
`;

export const SearchSelect = styled(Select)`
  width: 80px;
  margin-right: 8px;
`;
