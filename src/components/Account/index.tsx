import { useState } from "react";

import Side from "@/components/common/Side";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";

import * as S from "./index.styled";
import { Default } from "@/@types/Modal";

enum Page {
  Login = "Log in",
  Signup = "Sign up",
  ResetPassword = "Reset password",
}

export default function Account({ onClose }: Default) {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);

  return (
    <Side>
      <S.Buttons $right={currentPage === Page.Login}>
        {currentPage !== Page.Login && (
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
            {currentPage} to
            <br />
            Travel Space
          </p>
        </S.Title>

        {currentPage === Page.Login ? (
          <Login
            goToResetPassword={() => setCurrentPage(Page.ResetPassword)}
            goToSignup={() => setCurrentPage(Page.Signup)}
            onClose={onClose}
          />
        ) : currentPage === Page.Signup ? (
          <Signup goToLogin={() => setCurrentPage(Page.Login)} />
        ) : currentPage === Page.ResetPassword ? (
          <ResetPassword goToLogin={() => setCurrentPage(Page.Login)} />
        ) : null}
      </S.Wrap>
    </Side>
  );
}
