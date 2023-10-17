import { bodyContainer, flexAlignCenter } from "@/styles/common";
import styled from "styled-components";
import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

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
    min-height: 100vh;
    background: #fff !important;
  }
`;

export const Side = styled(Sider)`
  background-color: #fff;
  width: 300px;
  height: 100%;
  text-align: center;
  color: #fff;
`;

export const SideMenu = styled(Menu)``;

export const MenuItem = styled(Menu.Item)`
  color: #6d7b92;
  font-weight: bold;
`;

export const AdminContent = styled(Content)``;

export const TableContainer = styled.div`
  padding: 64px 100px;
  width: 100%;
`;

export const TopContent = styled.div`
  ${flexAlignCenter}
  margin-bottom: 24px;
`;
