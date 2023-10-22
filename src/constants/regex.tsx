const VALIDATE = {
  name: /^[가-힣]{2,10}$/,
  nickName: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣\s]{2,10}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  onlyNumber: /[^0-9]/g,
};

export default VALIDATE;
