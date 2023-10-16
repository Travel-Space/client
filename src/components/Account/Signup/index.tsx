import * as S from "../common.styled";
import Basic from "./Basic";
import Social from "./Social";

export default function Signup() {
  return (
    <>
      <form>
        {/* 소셜 최초 가입 */}
        <Social />
        {/* 일반 가입 */}
        <Basic />
        <S.FillButton type="submit">Sign Up</S.FillButton>
      </form>
    </>
  );
}
