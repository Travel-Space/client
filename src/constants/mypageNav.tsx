import Image from "next/image";

const MYPAGENAV = [
  {
    logo: <Image src="/assets/img/icons/statistics-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "통계", href: "statistics" },
    subMenu: [{ name: "행성 통계", href: "/mypage/statistics" }],
  },
  {
    logo: <Image src="/assets/img/icons/basicInfo-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "기본 정보 관리", href: "basic-info" },
    subMenu: [
      { name: "프로필", href: "/mypage/basic-info/profile" },
      { name: "행성", href: "/mypage/basic-info/planet" },
    ],
  },
  {
    logo: <Image src="/assets/img/icons/contents-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "컨텐츠 관리", href: "contents" },
    subMenu: [
      { name: "게시글", href: "/mypage/contents/postings" },
      { name: "댓글", href: "/mypage/contents/comments" },
    ],
  },
  {
    logo: <Image src="/assets/img/icons/friend-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "친구 관리", href: "friend" },
    subMenu: [
      { name: "친구 목록", href: "/mypage/friend/list" },
      { name: "친구 추가", href: "/mypage/friend/add" },
    ],
  },
  {
    logo: <Image src="/assets/img/icons/like-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "좋아요 관리", href: "like" },
    subMenu: [
      { name: "행성", href: "/mypage/like/planets" },
      { name: "게시글", href: "/mypage/like/postings" },
    ],
  },
];

export default MYPAGENAV;
