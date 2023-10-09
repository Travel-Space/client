"use client";
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
          그럼이건모지? 괜찮군 브랜치를 따보자<a href="/post">post</a>
        </main>
      </ThemeProvider>
    </>
  );
}
