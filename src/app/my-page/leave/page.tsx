"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import * as S from "./page.styled";

import Divider from "@/app/my-page/Divider";
import Checkbox from "./Checkbox";

export default function Leave() {
  const [checked, setChecked] = useState(false);
  const handleClickCheckbox = () => {
    setChecked(!checked);
  };
  return (
    <div>
      <S.CannotLeaveReason>
        <S.CannotLeaveReasonTitle>
          <Image src="/assets/img/icons/withdraw.svg" alt="leave" width={21} height={21} />
          <span>탈퇴 불가 사유</span>
        </S.CannotLeaveReasonTitle>
        <S.CannotLeaveReasonNotice>
          여행 중인 행성을 모두 <span>&nbsp;탈퇴</span>하고 <span>&nbsp;관리자</span>를 <span>&nbsp;위임</span>한 후에
          트레블 스페이스 서비스를 탈퇴할 수 있습니다.
        </S.CannotLeaveReasonNotice>
      </S.CannotLeaveReason>

      <S.Escape>
        <S.PlanetNotice>
          <S.Planets>
            <S.Sort>여행 중인 행성</S.Sort>
            <S.Number>10</S.Number>
          </S.Planets>
          <Divider width="1px" height="57px" />
          <S.Planets>
            <S.Sort>관리 중인 행성</S.Sort>
            <S.Number>2</S.Number>
          </S.Planets>
        </S.PlanetNotice>
        <Divider width="100%" height="1px" />
        <S.EscapeNotice>
          <S.EscapeGuide>
            일반 멤버로 여행 중인 행성은 일괄 탈퇴가 가능하지만, 관리 중인 행성은 관리자를 직접 다른 멤버에게 위임 후
            탈퇴가 가능합니다.
          </S.EscapeGuide>
          <S.Buttons>
            <S.Button>일괄 탈퇴</S.Button>
            <S.Button>관리자 위임하기</S.Button>
          </S.Buttons>
        </S.EscapeNotice>
      </S.Escape>

      <S.Notice>
        <S.Title>회원 정보 보존 안내 사항</S.Title>
        <S.NoticeContent>
          <div>
            전자 상거래 이용 내역(거래 내역)이 있는 회원님은 전자 상거래 등에서의 소비자 보호에 관한 법률에 의거
            교환/반품/환불 및 사후 처리(A/S) 등을 <br />
            위해 회원 정보가 5년간 별도 관리됩니다. 관련 법령에 그 근거가 없더라도, 회사의 중대한 손실을 예방하거나,
            범죄 및 소송 등을 위해 보관해야 <br />
            하는 경우, 회사 방침에 따라 회원 정보를 보관할 수 있습니다.
          </div>
          <div>단, 그 목적을 달성하기 위한 최소한의 기간 및 항목만 보관합니다.</div>

          <S.Period>
            <li>
              회원 탈퇴 후, 부정 방지를 위한 고객 식별 정보 보유 : 탈퇴 신청일로부터 1년 (탈퇴일자, 고객식별정보 값
              보관)
            </li>
            <li>이용자 정보에 관한 기록 : 부정 이용 회원의 재발 방지를 위하여 1년간 보존 후, 파기합니다.</li>
            <li>가입 탈퇴 후, 재가입 중지 기간 : 탈퇴 신청일로부터 30일</li>
            <li>
              개인 정보 처리 방침 및 서비스 이용 약관에 따라 부정 행위 및 서비스 이용에 반하는 행위를 한 회원의 경우,
              5년간 정보를 보관합니다.
            </li>
          </S.Period>
        </S.NoticeContent>
      </S.Notice>
      <Divider width="100%" height="1px" />

      <S.Confirm>
        <S.Check>
          <button onClick={handleClickCheckbox}>
            <Checkbox color={checked ? "#40a0fb" : "#d9d9d9"} />
          </button>
          <span>트레블 스페이스 회원 탈퇴 안내를 읽고 확인했으며, 내용에 동의합니다.</span>
        </S.Check>
        <S.Buttons>
          <S.Button>취소</S.Button>
          <S.FullButton>회원 탈퇴하기</S.FullButton>
        </S.Buttons>
      </S.Confirm>
    </div>
  );
}
