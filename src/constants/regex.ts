const VALIDATE = {
  USER: {
    NAME: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣\s]{2,15}$/,
    NICKNAME: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣\s]{2,15}$/,
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/,
    CODE: /^[0-9]+$/,
  },
  PLANET: {
    NAME: /^.{1,15}$/,
    HASHTAG: /^.{1,8}$/,
    DESCRIPTION: /^.{1,200}$/,
    NAME_COUNT: 15,
    DESCRIPTION_COUNT: 200,
    MEMBER_LIMIT: 50,
    SPACESHIP_LIMIT: 10,
  },
  SPACESHIP: {
    NAME: /^.{1,6}$/,
    DESCRIPTION: /^.{1,100}$/,
    NAME_COUNT: 6,
    DESCRIPTION_COUNT: 100,
  },
} as const;

export default VALIDATE;
