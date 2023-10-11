export default function ResetPassword() {
  return (
    <>
      <form>
        <div>
          <label htmlFor="user-email">이메일</label>
          <input type="text" id="user-email" />
          <button>인증</button>
          <div>
            <input type="text" />
            <button>인증확인</button>
          </div>
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <input type="password" id="user-password" />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <input type="password" id="user-password-check" />
        </div>
        <hr />
        <button type="submit">Reset Password</button>
      </form>
    </>
  );
}
