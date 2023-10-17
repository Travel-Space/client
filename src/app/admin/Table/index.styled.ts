import styled from "styled-components";
import { flexAlignCenter, flexCenter, flexColumn } from "@/styles/common";
import { Table } from "antd";

export const AdminTable = styled(Table)`
  & table {
    text-align: center;
  }

  & table > thead > tr > th {
    text-align: center !important ;
  }
`;
