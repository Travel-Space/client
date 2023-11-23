const VALIDATE = {
  user: {
    name: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣\s]{2,8}$/,
    nickName: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣\s]{2,8}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/,
    code: /^[0-9]+$/,
  },
  planet: {
    name: /^.{1,15}$/,
    description: /^.{1,200}$/,
    hashtag: /^.{1,8}$/,
  },
  spaceship: {
    name: /^.{1,6}$/,
    description: /^.{1,100}$/,
  },
} as const;

export default VALIDATE;
