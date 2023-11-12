"use client";
import React from "react";
import DeclarationModal from "@/components/common/DeclarationModal";
import UserProfile from "@/components/common/UserProfile";
import * as PC from "./index.styled";
import Button from "@/components/common/Button";
import { useModal } from "@/hooks/useModal";
import { Posting } from "@/@types/Posting";
import { useSearchParams, useRouter } from "next/navigation";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilValue } from "recoil";
import { getDateInfo } from "@/utils/getDateInfo";
import axiosRequest from "@/api";
import Link from "next/link";
import MESSAGE from "@/constants/message";

interface PostContentProps {
  data?: Posting;
}

export default function PostContent({ data }: PostContentProps) {
  const { modalDataState, openModal, closeModal } = useModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUser = useRecoilValue(userAtom);
  const isMyPost = currentUser?.id === data?.authorId;
  const imageUrls = data?.images.map(image => image.url) || [];

  //게시글 삭제 함수
  const handlePostDelete = async () => {
    if (!data?.id) return;

    const isConfirmed = window.confirm(MESSAGE.POST.DELETE);
    if (!isConfirmed) return;

    try {
      await axiosRequest.requestAxios("delete", `/articles/${data.id}`);
      router.back();
      alert("게시글이 성공적으로 삭제되었습니다.");
    } catch (error) {
      alert("게시글 삭제 중 에러가 발생했습니다. 다시 시도해 주세요.");
      console.error("Error deleting post: ", error);
    }
  };

  //신고 모달 열기
  const openDeclarationModal = () => {
    openModal({
      title: "게시글 신고",
      content: <DeclarationModal title={"게시글"} onClick={closeModal} targetId={data?.id} />,
    });
  };
  // 게시글 날짜 변환
  const { dateString, time } = data?.createdAt ? getDateInfo(data.createdAt) : { dateString: "", time: "" };

  return (
    <>
      <PC.Wrapper>
        {modalDataState.isOpen && modalDataState.content}
        <PC.TitleSection>
          <PC.Title>{data?.title}</PC.Title>
          <PC.Date>
            {dateString} {time}
          </PC.Date>
        </PC.TitleSection>
        <PC.PostInfoSection>
          <PC.StyledLink>
            <Link
              href={{
                pathname: `/user/profile/${data?.authorId}`,
                query: { userId: data?.authorId },
              }}
            >
              <UserProfile size="post" author={data?.author} />
            </Link>
          </PC.StyledLink>
          <PC.PostInfo>
            <Link
              href={{
                pathname: `/planet/${data?.planetId}/space-ship`,
                query: { spaceshipId: data?.spaceshipId },
              }}
            >
              <PC.RocketImg src="/assets/img/icons/rocket.svg" />
              {data?.spaceshipId != null ? data?.spaceship?.name : "나 홀로 여행"}
            </Link>
            <Link
              href={{
                pathname: `/planet/${data?.planetId}/map`,
                query: { userId: data?.authorId },
              }}
            >
              <PC.PlanetImg src="/assets/img/icons/planet.svg" />
              {data?.planet.name}
            </Link>
          </PC.PostInfo>
        </PC.PostInfoSection>
        <PC.Content>
          <PC.Location>
            <PC.LocationImg src="/assets/img/icons/location.svg" />
            {data?.address}
          </PC.Location>
          <PC.Text>
            <PC.TextData dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
          </PC.Text>
          <PC.TextBottomDisplay>
            <PC.TagsDisplay>{data?.hashtags.map((tag, index) => <PC.Tags key={index}>{tag}</PC.Tags>)}</PC.TagsDisplay>
            <PC.PostActionBtn>
              {isMyPost ? (
                <>
                  <Link
                    href={{ pathname: `/planet/${data?.planetId}/post/write`, query: { id: data?.id, isEdit: true } }}
                  >
                    <PC.EditBtn>
                      <Button variant="reverse" size="big" shape="medium" fontWeight="bold">
                        수정
                      </Button>
                    </PC.EditBtn>
                  </Link>
                  <PC.DeleteBtn onClick={handlePostDelete}>
                    <Button variant="reverse" size="big" shape="medium" fontWeight="bold">
                      삭제
                    </Button>
                  </PC.DeleteBtn>
                </>
              ) : (
                <PC.DeclarationBtn>
                  <Button variant="error" size="big" shape="medium" fontWeight="bold" onClick={openDeclarationModal}>
                    신고
                  </Button>
                </PC.DeclarationBtn>
              )}
            </PC.PostActionBtn>
          </PC.TextBottomDisplay>
        </PC.Content>
      </PC.Wrapper>
    </>
  );
}
