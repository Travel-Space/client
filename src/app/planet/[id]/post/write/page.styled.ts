import styled from "styled-components";
import ReactQuill from "react-quill";
import { flexColumnCenter, flexSpaceBetweenCenter, bodyContainer } from "@/styles/common";
import "react-quill/dist/quill.snow.css";

interface TagIconProps {
  isActive: boolean;
}

export const Wrapper = styled.div`
  ${bodyContainer}
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
`;

export const LeftDisplay = styled.div``;

export const WriteTitleText = styled.div`
  width: 100%;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: 700;
`;

export const WriteSection = styled.div`
  ${flexColumnCenter}
  gap:16px;
  height: 1000px;
`;

export const TitleAndLocation = styled.div`
  ${flexColumnCenter}
  gap:16px;
`;

export const TitleInput = styled.input`
  width: 600px;
  height: 48px;
  border-radius: 10px;
  border: none;
  padding: 16px;
  background-repeat: no-repeat;
  outline: none;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 0 0px #bdddfd;
  transition: all 0.2s;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};

  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary[200]};
    box-shadow: 0 0 0 3px #bdddfd;
  }

  &::placeholder {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-weight: 700;
  }
`;

export const LocationInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding-left: 48px;
  background-repeat: no-repeat;

  outline: none;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 0 0px #bdddfd;
  transition: all 0.2s;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};

  &::placeholder {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary[200]};
    box-shadow: 0 0 0 3px #bdddfd;
  }
`;

export const LocationWrapper = styled.div`
  width: 600px;
  height: 48px;
  position: relative;
`;

export const LocationIcon = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  background-image: url("/assets/img/icons/gray-location.svg");
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TagsAndRocket = styled.div`
  ${flexSpaceBetweenCenter}
  width: 600px;
  gap: 16px;
  position: relative;

  & input {
    width: 290px;
    height: 48px;
    border-radius: 10px;
    border: none;
    padding: 16px;
    padding-left: 48px;
    outline: none;
    border: 1px solid #d9d9d9;
    box-shadow: 0 0 0 0px #bdddfd;
    transition: all 0.2s;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};

    &::placeholder {
      color: ${({ theme }) => theme.PALETTE.gray[100]};
      font-weight: 700;
      font-size: ${({ theme }) => theme.FONT_SIZE.md};
    }

    &:focus {
      border-color: ${({ theme }) => theme.PALETTE.primary[200]};
      box-shadow: 0 0 0 3px #bdddfd;
    }
  }
`;

export const TagIcon = styled.div<TagIconProps>`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  background-image: url(${props => props.isActive ? "/assets/img/icons/tags.svg" : "/assets/img/icons/gray-tags.svg"});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const RocketInputWrapper = styled.div`
  width: 290px;
  height: 48px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
  color: ${({ theme }) => theme.PALETTE.gray[100]};

  & > div {
    & > div:first-child {
      padding: 11px 16px;
      width: 290px;
      height: 48px;
    }
    & > div:nth-child(2) > div {
      color: ${({ theme }) => theme.PALETTE.gray[100]};
      padding: 11px 16px;
      font-weight: 700;
      &:hover {
        color: ${({ theme }) => theme.PALETTE.black};
      }
      &:focus {
        border: none;
      }
    }
  }
`;

export const TagsInputWrapper = styled.div`
  width: 290px;
  height: 48px;
  position: relative;
`;

export const Tags = styled.div`
  padding: 8px 32px 8px 16px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  position: relative;
`;

export const TagsDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  gap: 8px;
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DeleteTagButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.PALETTE.white};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 16px 0 8px;
`;

export const ButtonGroup = styled.div`
  ${flexSpaceBetweenCenter}
  width: 600px;
  background-color: transparent;
`;

export const BackBtn = styled.button`
  width: 104px;
  height: 100%;
  border: none;
  border-radius: 10px;
`;
export const CompletedBtn = styled.button`
  width: 144px;
  height: 100%;
  border: none;
  border-radius: 10px;
  transition: background-color 0.3s;
  background: none;
`;

export const QuillWrapper = styled(ReactQuill)`
  background-color: ${({ theme }) => theme.PALETTE.white};
  height: 100%;
`;

export const PreviewSection = styled.div`
  width: 600px;
  height: 1000px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.PALETTE.white};
  margin: 48px 0 64px;
  border-radius: 10px;
  padding: 24px;
  line-height: 1.42;
  

  & ol {
    padding-left: 24px;
  }

  & ol > li {
    list-style-type: decimal;
  }

  & ul {
    padding-left: 24px;
  }

  & ul > li {
    list-style-type: disc;
  }

  strong {
    font-weight: 700;
  }

  h1 {
    font-size: ${({ theme }) => theme.FONT_SIZE.hg};
  }

  h2 {
    font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  }

  h3 {
    font-size: ${({ theme }) => theme.FONT_SIZE.big};
  }

  img {
  max-width: 100%;
  height: auto; /* 이미지 원본 비율 유지 */
}

/* 에디터 내 이미지에 대한 특별한 스타일 */
.QuillWrapper img {
  text-align: center;
  object-fit: cover;
  float: left;
  margin-right: 8px;
  vertical-align: top;
}

  em,
  i {
    font-style: italic;
  }

  a {
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-justify {
    text-align: justify;
  }
  
`;
