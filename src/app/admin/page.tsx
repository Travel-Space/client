"use client";
import Notification from "@/components/Notification";
import * as S from "./admin.styled";
import ReasonsRestrictionActivityModal from "./Modal/ReasonsRestrictionActivityModal";
import ReportAcceptModal from "./Modal/ReportAcceptModal";
import ReportNameModal from "./Modal/ReportNameModal";
import ActivityRestrictionNotification from "@/components/Notification/ActivityRestrictionNotification";
import SearchBar from "./SearchBar";
import AdminTable from "./Table";
import TotalText from "./TotalText";

// import { useModal } from "@/hooks/useModal";

const sideMenuItem = ["사용자 관리", "게시글 관리", "행성 리스트 관리", "신고 관리"];

export default function Admin() {
  // const { openModal } = useModal();

  // const modal = {
  //   title: "제한 사유 작성",
  //   content: <ReasonsRestrictionActivityModal />,
  //   callback: () => {
  //     alert("닫힐 때");
  //   },
  // };

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
        {/* <button onClick={() => openModal(modal)}>클릭</button> */}
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
