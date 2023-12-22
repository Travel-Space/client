import { useState } from "react";

import { Default } from "@/@types/Modal";

import Side from "@/components/common/Side";

import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import * as ACCOUNT from "./index.styled";

const ACCOUNT_PAGE = {
  LOGIN: "Log in",
  SIGNUP: "Sign up",
  RESET_PW: "Reset password",
} as const;

type ACCOUNT_PAGE = (typeof ACCOUNT_PAGE)[keyof typeof ACCOUNT_PAGE];

export default function Account({ onClose }: Default) {
  const [currentPage, setCurrentPage] = useState<ACCOUNT_PAGE>(ACCOUNT_PAGE.LOGIN);

  return (
    <Side>
      <ACCOUNT.Buttons $right={currentPage === ACCOUNT_PAGE.LOGIN}>
        {currentPage !== ACCOUNT_PAGE.LOGIN && (
          <ACCOUNT.Button className="prev" onClick={() => setCurrentPage(ACCOUNT_PAGE.LOGIN)}>
            뒤로
          </ACCOUNT.Button>
        )}
        <ACCOUNT.Button className="close" onClick={onClose}>
          닫기
        </ACCOUNT.Button>
      </ACCOUNT.Buttons>
      <ACCOUNT.Wrap>
        <ACCOUNT.Title>
          <p>
            {currentPage} to
            <br />
            Travel Space
          </p>
        </ACCOUNT.Title>

        {currentPage === ACCOUNT_PAGE.LOGIN ? (
          <Login
            goToResetPassword={() => setCurrentPage(ACCOUNT_PAGE.RESET_PW)}
            goToSignup={() => setCurrentPage(ACCOUNT_PAGE.SIGNUP)}
            onClose={onClose}
          />
        ) : currentPage === ACCOUNT_PAGE.SIGNUP ? (
          <Signup goToLogin={() => setCurrentPage(ACCOUNT_PAGE.LOGIN)} />
        ) : currentPage === ACCOUNT_PAGE.RESET_PW ? (
          <ResetPassword goToLogin={() => setCurrentPage(ACCOUNT_PAGE.LOGIN)} />
        ) : null}
      </ACCOUNT.Wrap>
    </Side>
  );
}
