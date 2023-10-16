"use client";

import DeclarationModal from "@/components/common/DeclarationModal";
import UserProfile from "../UserProfile";
import * as PC from "./index.styled";

export default function PostContent() {
  //태그 확인용 목업데이터
  const mockTags = ["태그1", "태그2", "태그3", "태그4", "태그5"];

  return (
    <>
      <PC.Wrapper>
        {/* <DeclarationModal /> */}
        <PC.TitleSection>
          <PC.Title>오늘 먹은 텐동 냠냠굿이었따.</PC.Title>
          <PC.Date>2023년 9월 25일</PC.Date>
        </PC.TitleSection>
        <PC.PostInfoSection>
          <UserProfile />
          <PC.PostInfo>
            <PC.RocketImg src="/assets/img/icons/rocket.svg" />
            피식대학 우주선
            <PC.PlanetImg src="/assets/img/icons/planet.svg" />
            일본 맛도리 행성
          </PC.PostInfo>
        </PC.PostInfoSection>
        <PC.Content>
          <PC.Location>
            <PC.LocationImg src="/assets/img/icons/location.svg" />
            서울특별시 강남구 논현동 332-2
          </PC.Location>
          <PC.Text>
            법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 국회는 선전포고,
            국군의 외국에의 파견 또는 외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다. 모든 국민은 건강하고
            쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 국정감사 및 조사에
            관한 절차 기타 필요한 사항은 법률로 정한다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기
            위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이
            헌법시행 전에 할 수 있다. 대통령은 내우·외환·천재·지변 또는 중대한 재정·경제상의 위기에 있어서 국가의
            안전보장 또는 공공의 안녕질서를 유지하기 위하여 긴급한 조치가 필요하고 국회의 집회를 기다릴 여유가 없을 때에
            한하여 최소한으로 필요한 재정·경제상의 처분을 하거나 이에 관하여 법률의 효력을 가지는 명령을 발할 수 있다.
            대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 위원은 정당에 가입하거나 정치에 관여할 수
            없다. 정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다. 계엄을 선포한 때에는 대통령은 지체없이
            국회에 통고하여야 한다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며,
            징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다. 국가는 지역간의 균형있는 발전을
            위하여 지역경제를 육성할 의무를 진다. 감사원은 세입·세출의 결산을 매년 검사하여 대통령과 차년도국회에 그
            결과를 보고하여야 한다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을
            보장한다. 중앙선거관리위원회는 대통령이 임명하는 3인, 국회에서 선출하는 3인과 대법원장이 지명하는 3인의
            위원으로 구성한다. 위원장은 위원중에서 호선한다.
            <PC.TestImgBox>
              <PC.TestImg src="/assets/img/icons/post-test-img.svg" />
            </PC.TestImgBox>
            국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을 보장한다.
            중앙선거관리위원회는 대통령이 임명하는 3인, 국회에서 선출하는 3인과 대법원장이 지명하는 3인의 위원으로
            구성한다. 위원장은 위원중에서 호선한다.
          </PC.Text>
          <PC.TextBottomDisplay>
            <PC.TagsDisplay>
              {mockTags.map((tag, index) => (
                <PC.Tags key={index}>{tag}</PC.Tags>
              ))}
            </PC.TagsDisplay>
            <PC.PostActionBtn>
              <PC.EditBtn>수정</PC.EditBtn>
              <PC.DeleteBtn>삭제</PC.DeleteBtn>
              <PC.ReportBtn>신고</PC.ReportBtn>
            </PC.PostActionBtn>
          </PC.TextBottomDisplay>
        </PC.Content>
      </PC.Wrapper>
    </>
  );
}
