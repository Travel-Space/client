import styled from "styled-components";

interface LocationIconProps {
  isActive: boolean;
}

export const InputContainer = styled.div`
  position: relative;
  width: 600px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  border: none;
  padding: 16px;
  padding-left: 48px;
  background-repeat: no-repeat;
  outline: none;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  box-shadow: 0 0 0 0px #bdddfd;
  transition: all 0.2s;
  font-size: 16px;

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

export const LocationIcon = styled.div<LocationIconProps>`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background-image: url(${props => props.isActive ? "/assets/img/icons/location.svg" : "/assets/img/icons/gray-location.svg"});
  background-size: cover;
  background-repeat: no-repeat;
`;