import GlobalStyles from "@/styles/global";
import theme from "@/styles/theme";
import { ThemeProvider } from "styled-components";

export default function App() {
  const a: String = "abe";

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <main>
          그럼이건모지? 괜찮군 ㅋ<a href="/post">post</a>
        </main>
      </ThemeProvider>
    </>
  );
}
