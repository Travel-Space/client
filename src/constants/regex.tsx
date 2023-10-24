const VALIDATE = {
  name: /^[가-힣]{2,8}$/,
  nickName: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣\s]{2,8}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/,
  onlyNumber: /^[0-9]+$/,
};

export default VALIDATE;
