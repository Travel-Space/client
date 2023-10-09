import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    @font-face {
        font-family: 'Pretendard-Thin';
        src: url('/assets/font/Pretendard-Bold.otf') format('opentype');
    }

    @font-face {
        font-family: 'Pretendard-ExtraLight';
        src: url('/assets/font/Pretendard-ExtraLight.otf') format('opentype');
    }

    @font-face {
        font-family: 'Pretendard-Light';
        src: url('/assets/font/Pretendard-Light.otf') format('opentype');
    }

    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('/assets/font/Pretendard-Regular.otf') format('opentype');
    }

    @font-face {
        font-family: 'Pretendard-Medium';
        src: url('/assets/font/Pretendard-Medium.otf') format('opentype');
    }

    @font-face {
        font-family: 'Pretendard-SemiBold';
        src: url('/assets/font/Pretendard-Medium.otf') format('opentype');
    }

    @font-face {
        font-family: 'Pretendard-Bold';
        src: url('/assets/font/Pretendard-Bold.otf') format('opentype');
    }

    @font-face {
        font-family: 'Pretendard-ExtraBold';
        src: url('/assets/font/Pretendard-Medium.otf') format('opentype');
    }

    @font-face {
        font-family: 'Pretendard-Black';
        src: url('/assets/font/Pretendard-Medium.otf') format('opentype');
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
    }

    button {
        border: none;
    }

    ul > li {
        list-style: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;

export default GlobalStyles;
