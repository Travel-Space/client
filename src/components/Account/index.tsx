import Side from "@/components/common/Side";
import { ModalType } from "@/@types";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import * as S from "./index.styled";

enum Page {
  Login = "Log in",
  Signup = "Sign up",
  ResetPassword = "Reset password",
}

export default function Account({ onClose }: ModalType) {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);

  return (
    <Side>
      <S.Buttons $right={currentPage === "Log in"}>
        {currentPage !== "Log in" && (
          <S.Button className="prev" onClick={() => setCurrentPage(Page.Login)}>
            뒤로
          </S.Button>
        )}
        <S.Button className="close" onClick={onClose}>
          닫기
        </S.Button>
      </S.Buttons>
      <S.Wrap>
        <S.Title>
          <p>
            {currentPage} to <br />
            Travel Space
          </p>
        </S.Title>

        {currentPage === Page.Login ? (
          <Login
            goToResetPassword={() => setCurrentPage(Page.ResetPassword)}
            goToSignup={() => setCurrentPage(Page.Signup)}
          />
        ) : currentPage === Page.Signup ? (
          <Signup />
        ) : currentPage === Page.ResetPassword ? (
          <ResetPassword />
        ) : null}
      </S.Wrap>
    </Side>
  );
}
