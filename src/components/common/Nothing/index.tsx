import * as S from "./index.styled";

import Image from "next/image";

interface NothingProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  comment: string;
  suggest?: string;
  font: "sm" | "lg";
}
export default function Nothing({ src, alt, width, height, comment, suggest, font }: NothingProps) {
  return (
    <S.Container>
      <Image src={src} alt={alt} width={width} height={height} />
      <S.Text font={font}>
        <S.Comment>{comment}</S.Comment>
        <S.Suggest>{suggest}</S.Suggest>
      </S.Text>
    </S.Container>
  );
}
