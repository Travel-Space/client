const VALIDATE = {
  name: /^[가-힣]{2,10}$/,
  nickName: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣\s]{2,10}$/,
};

export default VALIDATE;
