"use client";
import ActivityRestrictionNotification from "@/components/common/Notification/ActivityRestrictionNotification";
import * as S from "./admin.styled";
import SearchBar from "./SearchBar";
import AdminTable from "./Table";
import TotalText from "./TotalText";

const sideMenuItem = ["사용자 관리", "게시글 관리", "행성 리스트 관리", "신고 관리"];
export default function Admin() {
  return (
    <S.AdminLayout>
      <S.Side>
        <S.SideMenu theme="light" mode="vertical" defaultSelectedKeys={["0"]}>
          {sideMenuItem.map((item, idx) => (
            <S.MenuItem key={idx}>{item}</S.MenuItem>
          ))}
        </S.SideMenu>
      </S.Side>

      <S.TableContainer>
        {/* <Notification /> */}

        <ActivityRestrictionNotification />
        <S.AdminContent>
          <S.TopContent>
            <TotalText titleText={"사용자"} totalNum={100} unit={"명"} />
            <SearchBar />
          </S.TopContent>

          <AdminTable />
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
