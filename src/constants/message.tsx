const MESSAGE = {
  JOIN: {
    FAILURE: "회원가입에 실패했습니다.",
  },
  LOGIN: {
    FAILURE: "아이디 또는 비밀번호를 다시 확인해 주세요.",
    ERROR: "로그인에 문제가 발생했습니다. 잠시 후에 다시 시도해 주세요.",
    REQUIRED: "로그인이 필요해요.",
  },
  ERROR: {
    DEFAULT: "에러가 발생했습니다. 다시 시도해 주세요",
    EXPIRED: "로그인이 만료되었습니다. 다시 로그인해 주세요.",
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
  MYPAGE: {
    NICKNAME: "닉네임을 입력해 주세요.",
  },
  FILE: {
    UPLOAD: "JPEG, JPG, PNG 파일만 업로드 가능합니다.",
    NOFILE: "이미지를 첨부해 주세요.",
  },
  DELETE: {
    COMPLETE: "삭제가 완료되었습니다.",
  },
};

export default MESSAGE;
