export default function Signup() {
  return (
    <>
      {/* 소셜 최초 가입 - 이름, 닉네임, 국적*/}
      <form>
        <div>
          <label htmlFor="user-name">이름</label>
          <input type="text" id="user-name" readOnly disabled />
        </div>
        <div>
          <label htmlFor="user-nickName">닉네임</label>
          <input type="text" id="user-nickName" />
          <button>중복확인</button>
        </div>
        <div>
          <label htmlFor="user-country">국적</label>
          <input type="text" id="user-country" readOnly />
          <img src="" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {/* 일반 가입 - 이름, 닉네임, 이메일, 이메일인증, 비밀번호, 비밀번호 확인, 국적 */}
      <form>
        <div>
          <label htmlFor="user-name">이름</label>
          <input type="text" id="user-name" />
        </div>
        <div>
          <label htmlFor="user-nickName">닉네임</label>
          <input type="text" id="user-nickName" />
          <button>중복확인</button>
        </div>
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
        <div>
          <label htmlFor="user-country">국적</label>
          <input type="text" id="user-country" readOnly />
          <img src="" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
