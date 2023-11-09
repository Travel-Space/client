import { ItemType } from "@/@types/Modal";
import * as S from "./index.styled";
import { RoleName } from "@/@types/Planet";
import Button from "@/components/common/Button";
import DropDown from "@/components/common/DropDown";
import { CommonUserInfo } from "@/@types/User";
import { useState } from "react";

interface Type {
  mode: "select" | "manage";
  type?: ItemType;
  user: CommonUserInfo;
  onSelectMember?: (value: number) => void;
  onInvite?: (value: number) => void;
  onApprove?: (value: number) => void;
  onReject?: (value: number) => void;
  onKick?: (value: number) => void;
}

export default function Member({ mode, type, user, onSelectMember, onInvite, onApprove, onReject, onKick }: Type) {
  const roleName = user.role && RoleName[user.role];
  const [selectedMenu, setSelectedMenu] = useState(roleName as string);
  console.log("user", user);

  const dropDownProps = {
    menuList: [RoleName.ADMIN, RoleName.MEMBER],
    selectedMenu: selectedMenu,
    handleClick: setSelectedMenu,
  };

  return (
    <S.Wrap>
      {mode === "select" ? (
        <S.Label>
          <S.ProfileImg src={user.profileImage} />
          <S.InfoGroup>
            <S.NicknameRole>
              <span className="nickname">{user.nickName}</span>
              {type === ItemType.Planet && <span className="role">{roleName}</span>}
            </S.NicknameRole>
            <S.Email>{user.email}</S.Email>
          </S.InfoGroup>
          <S.Input type="radio" name="member" onChange={() => onSelectMember && onSelectMember(user.userId)} />
        </S.Label>
      ) : (
        <S.MemberWrap>
          <S.ProfileImg src={user.profileImage} />
          <S.InfoGroup>
            <S.NicknameRole>
              <span className="nickname">{user.nickName}</span>
            </S.NicknameRole>
            <S.Email>{user.email}</S.Email>
          </S.InfoGroup>
          <S.Group>
            {/* 멤버 권한 관리 */}
            {user.role === "MEMBER" || user.role === "ADMIN" ? (
              <>
                <DropDown font="md" shape="round" color="gray" props={dropDownProps} />
                <Button
                  variant="error"
                  shape="medium"
                  size="smallWithSmFont"
                  onClick={() => onKick && onKick(user.userId)}
                >
                  <S.Group>
                    <img src="/assets/img/icons/exit-white.svg" />
                  </S.Group>
                </Button>
              </>
            ) : user.role === "GUEST" ? (
              <>
                {user.invited ? (
                  <Button disabled variant="confirm" shape="medium" size="smallWithSmFont">
                    초대 중
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="confirm"
                      shape="medium"
                      size="smallWithSmFont"
                      onClick={() => onApprove && onApprove(user.userId)}
                    >
                      <span>수락</span>
                    </Button>
                    <Button
                      variant="reverse"
                      shape="medium"
                      size="smallWithSmFont"
                      onClick={() => onReject && onReject(user.userId)}
                    >
                      <span>거절</span>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Button
                variant="gradient"
                shape="medium"
                size="smallWithSmFont"
                onClick={() => onInvite && onInvite(user.userId)}
              >
                <S.Group>
                  <img src="/assets/img/icons/space-ship/invite.svg" width={16} />
                  <span>초대하기</span>
                </S.Group>
              </Button>
            )}
          </S.Group>
        </S.MemberWrap>
      )}
    </S.Wrap>
  );
}
