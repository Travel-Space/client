const MESSAGE = {
  JOIN: {
    SYNTAX_NAME: "한글 또는 영문으로 2글자 이상 15글자 이하로 입력해 주세요.",
    SYNTAX_NICKNAME: "한글 또는 영문으로 2글자 이상 15글자 이하로 입력해 주세요.",
    SYNTAX_PASSWORD_CHECK: "비밀번호가 일치하지 않습니다.",
    SYNTAX_CODE: "숫자만 입력해 주세요.",
    FAILURE: "회원 가입에 실패했습니다.",
  },
  LOGIN: {
    SYNTAX_EMAIL: "올바른 이메일을 입력해 주세요.",
    SYNTAX_PASSWORD: "영문, 숫자, 특수 문자 조합으로 8글자 이상으로 입력해 주세요.",
    FAILURE: "로그인에 실패했습니다.",
    ERROR: "로그인에 문제가 발생했습니다. 잠시 후에 다시 시도해 주세요.",
    REQUIRED: "로그인이 필요한 서비스입니다. 로그인 후에 이용해 주세요!",
  },
  ERROR: {
    DEFAULT: "에러가 발생했습니다. 다시 시도해 주세요.",
    EXPIRED: "로그인이 만료되었습니다. 다시 로그인해 주세요.",
    ONLY_ADMIN: "관리자 및 부관리자만 접근이 가능합니다.",
    ONLY_MEMBER: "행성 멤버만 접근이 가능합니다.",
  },
  POST: {
    COMPLETE: "게시글 작성이 완료되었습니다.",
    EDIT: "작성한 글을 수정하시겠습니까?",
    EDITFIN: "게시글 수정이 완료되었습니다.",
    DELETE: "게시글을 삭제하시겠습니까?",
    CANCEL: "작성을 취소하시겠습니까?",
  },
  COMMENT: {
    EDIT: "댓글을 수정하시겠습니까?",
    DELETE: "댓글을 삭제하시겠습니까?",
  },
  PLANET: {
    JOIN: "행성 탑승 신청이 완료되었습니다. 승인을 기다려 주세요!",
    JOIN_POST: "행성에 가입한 후 글을 작성해 보세요.",
    FIRST_POST: "먼저 게시글을 작성해 보세요.",
    SYNTAX_NAME: "15글자 이하로 입력해 주세요.",
  },
  CHAT: {
    NO_CHATROOM: "현재 이용 중인 채팅방이 없습니다.",
    SUG_PLANET_JOIN: "행성 및 우주선에 가입 후 멤버들과 채팅을 나눠 보세요!",
    NO_CLICK_CHATROOM: "현재 선택된 채팅방이 없습니다.",
    SUG_CHATTING: "채팅방을 선택해서 행성 및 우주선 멤버들과 대화해 보세요!",
    NOT_MESSAGE: "현재 메시지가 없습니다.",
  },
  REPORTS: {
    COMPLETE: "신고가 완료되었습니다.",
  },
  MYPAGE: {
    NICKNAME: "닉네임을 입력해 주세요.",
  },
  FILE: {
    UPLOAD: "JPEG, JPG, PNG 파일만 업로드 가능합니다.",
    NOT_FILE: "첨부된 이미지가 없습니다. 이미지를 첨부해 주세요.",
  },
  DELETE: {
    COMPLETE: "삭제가 완료되었습니다.",
  },
} as const;

export default MESSAGE;
