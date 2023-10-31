import { bodyContainer, flexAlignCenter } from "@/styles/common";
import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

export const Container = styled.div`
  ${bodyContainer}
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

export const AdminLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;

  > aside {
    border-right: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
    padding-top: 100px;
    height: auto;
    background: #fff !important;
  }
`;

export const AdminContent = styled(Content)`
  min-width: 1239px;
  padding: 22px 35px;
`;

export const TableContainer = styled.div`
  width: 100%;
`;

export const TopContent = styled.div`
  ${flexAlignCenter}
  margin-bottom: 24px;
`;
