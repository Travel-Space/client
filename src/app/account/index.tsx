import Side from "@/components/layout/Side";
import { ModalType } from "@/@types";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";

enum Page {
  Login = "Log in",
  Signup = "Sign up",
  ResetPassword = "Reset password",
}

export default function Account({ onClose }: ModalType) {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);

  return (
    <Side>
      {currentPage !== "Log in" && <button onClick={() => setCurrentPage(Page.Login)}>뒤로</button>}

      <button onClick={() => onClose()}>닫기</button>
      <div>{currentPage} to Travel Space</div>

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
    </Side>
  );
}
