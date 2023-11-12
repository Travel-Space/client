import styled from "styled-components";
import { flexAlignCenter, flexCenter, flexColumn } from "@/styles/common";
import { Table } from "antd";

export const AdminTableContainer = styled.div``;

export const AdminTable = styled(Table)`
  table {
    text-align: center;
  }

  table > thead > tr > th {
    text-align: center !important ;
  }
`;

export const PaginationWrapper = styled.div`
  padding-top: 32px;
  text-align: center;
`;
