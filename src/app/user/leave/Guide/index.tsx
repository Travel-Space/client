import { AxiosError } from "axios";
import axiosRequest from "@/api";
import { ResData, DailyViewCount } from "@/@types";

import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom, UserType } from "@/recoil/atoms/user.atom";

import * as S from "./index.styled";

import Image from "next/image";
import Line from "@/components/common/Line";
import Button from "@/components/common/Button";
import LEAVEINFO from "@/constants/leave";

const Guide = () => {
  const router = useRouter();

  const [auth, setAuth] = useRecoilState(userAtom);

  const joinedPlanets = auth?.memberships.planets.filter(el => el?.role === "MEMBER");
  const adminPlanets = auth?.memberships.planets.filter(el => el?.role === "ADMIN" || el?.role === "OWNER");

  const goToPlanetList = () => {
    router.push("/mypage/basic-info/planet/");
  };

  async function leaveAllPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<DailyViewCount[]>>(
        "post",
        `/user/${auth?.id}/leave-planets`,
      );
      if (response.status === 201) {
        alert("여행중인 행성을 모두 탈퇴하였습니다.");

        const leavePlanets = {
          ...auth,
          memberships: {
            planets: [],
            spaceships: auth?.memberships.spaceships,
          },
        } as UserType;
        setAuth(leavePlanets);

        return;
      }
      // console.log("일괄탈퇴", response);
    } catch (error) {
      const errorResponse = (error as AxiosError<{ message: string; statusCode: number }>).response;
      alert(
        errorResponse?.data.message &&
          "관리 중인 행성이 있습니다. 관리자를 위임하고 행성을 탈출한 후에 다시 시도해 주세요.",
      );
      console.error("행성을 탈출하는 중 오류가 발생했습니다.", error);
    }
  }
  return (
    <>
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

      <S.MainContent>
        <S.PlanetNotice>
          <S.Planets>
            <S.Sort>여행 중인 행성</S.Sort>
            <S.Number>{joinedPlanets?.length}</S.Number>
          </S.Planets>
          <Line color="gray" size="vertical" />
          <S.Planets>
            <S.Sort>관리 중인 행성</S.Sort>
            <S.Number>{adminPlanets?.length}</S.Number>
          </S.Planets>
        </S.PlanetNotice>

        <Line color="gray" size="horizontal" />

        <S.Escape>
          <S.EscapeGuide>{LEAVEINFO.ESCAPE[0]}</S.EscapeGuide>
          <S.Buttons>
            <S.Button>
              <Button variant="reverse" shape="medium" size="smallWithSmFont" onClick={() => leaveAllPlanets()}>
                일괄 탈퇴
              </Button>
            </S.Button>
            <S.Button>
              <Button variant="reverse" shape="medium" size="smallWithSmFont" onClick={goToPlanetList}>
                관리자 위임하기
              </Button>
            </S.Button>
          </S.Buttons>
        </S.Escape>
      </S.MainContent>
    </>
  );
};
export default Guide;
