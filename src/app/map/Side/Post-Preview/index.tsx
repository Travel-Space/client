import * as S from "./index.styled";

const post = [
  {
    id: 1,
    nickname: "에스파",
    country: "🇰🇷",
    profileImg: "/assets/img/icons/profileImage.png",
    title: "게시글 제목이 올라올 공간입니다.",
    description: `내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용`,
    day: "2023년 10월 15일",
    previewImg: "/assets/img/icons/post-test-img.svg",
  },
];

export default function PostPreview() {
  return (
    <>
      {post.map(el => (
        <S.Post id={el.id}>
          <S.MainBox>
            <S.Profile>
              <img src={el.profileImg} />
              <span>
                {el.nickname} {el.country}
              </span>
            </S.Profile>

            <S.Description>
              <span>{el.title}</span>
              <div>{el.description}</div>
            </S.Description>

            <S.Date>{el.day}</S.Date>
          </S.MainBox>

          <S.PreviewImg src={el.previewImg} />
        </S.Post>
      ))}
    </>
  );
}
