interface LoginType {
  goToSignup: () => void;
  goToResetPassword: () => void;
}

export default function Login({ goToSignup, goToResetPassword }: LoginType) {
  return (
    <>
      <button>
        <img src="/assets/img/icons/google.svg" />
        <span>Log in with Google</span>
      </button>
      <div>
        <span>or sign in with email</span>
      </div>
      <form>
        <div>
          <label htmlFor="user-email">이메일</label>
          <input type="text" id="user-email" />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <input type="password" id="user-password" />
          <button onClick={() => goToResetPassword()}>Forgot?</button>
        </div>
        <button type="submit">LOGIN</button>
      </form>
      <hr />
      <button onClick={() => goToSignup()}>Sign Up</button>
    </>
  );
}
