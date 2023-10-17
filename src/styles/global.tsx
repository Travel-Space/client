import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-Thin.otf') format('opentype');
        font-weight: 100;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-ExtraLight.otf') format('opentype');
        font-weight: 200;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-Light.otf') format('opentype');
        font-weight: 300;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-Regular.otf') format('opentype');
        font-weight: 400;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-Medium.otf') format('opentype');
        font-weight: 500;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-SemiBold.otf') format('opentype');
        font-weight: 600;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-Bold.otf') format('opentype');
        font-weight: 700;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-ExtraBold.otf') format('opentype');
        font-weight: 800;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-Black.otf') format('opentype');
        font-weight: 900;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        height: auto;
        min-height: 100%;
        background-image: url('/assets/img/background/background-1.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    
    body {
        font-family: 'Pretendard', sans-serif;
        color: ${({ theme }) => theme.PALETTE.black};
       
    }

    button {
        border: none;
        cursor: pointer;
        font-family: inherit;
    }
    
    input, textarea {
        font-family: inherit;
    }

    ul > li {
        list-style: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;

export default GlobalStyles;
