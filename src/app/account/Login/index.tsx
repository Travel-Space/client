interface LoginType {
  goToSignup: () => void;
  goToResetPassword: () => void;
}

export default function Login({ goToSignup, goToResetPassword }: LoginType) {
  return (
    <>
      <button onClick={() => goToSignup()}>Signup</button>
      <button onClick={() => goToResetPassword()}>ResetPassword</button>
    </>
  );
}
