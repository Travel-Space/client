import styled from "styled-components";
import { Layout, Menu } from "antd";
const { Sider, Content } = Layout;

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
