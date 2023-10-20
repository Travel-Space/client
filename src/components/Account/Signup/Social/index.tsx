import Input, { Label } from "@/components/common/Input";
import * as S from "../index.styled";
import Button from "@/components/common/Button";

// 소셜 최초 가입 - 이름, 닉네임, 국적
export default function Social() {
  return (
    <>
      <S.InputGroup>
        <Label id="user-name">이름</Label>
        <Input id="user-name" type="text" name="user-name" placeholder="Name" disabled />
      </S.InputGroup>
      <S.InputGroup>
        <Label id="user-nickName">닉네임</Label>
        <S.InputGroup>
          <Input id="user-nickName" type="text" name="user-nickName" placeholder="NickName" />
          <S.SmallBtnGroup>
            <Button variant="confirm" shape="small" size="smallWithXsFont">
              중복확인
            </Button>
          </S.SmallBtnGroup>
        </S.InputGroup>
      </S.InputGroup>
      <S.InputGroup>
        <Label id="user-country">국적</Label>
        <S.InputGroup>
          <Input id="user-country" type="text" name="user-country" readOnly />
          <S.SmallBtnGroup>
            <button>
              <img src="" />
            </button>
          </S.SmallBtnGroup>
        </S.InputGroup>
      </S.InputGroup>
    </>
  );
}
