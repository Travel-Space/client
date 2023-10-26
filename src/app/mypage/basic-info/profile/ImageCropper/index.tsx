import { useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as S from "./index.styled";
import Button from "@/components/common/Button";

interface PropsType {
  onCrop: (image: string) => void;
  aspectRatio: number;
  children: React.ReactNode;
}

const ImageCropper = ({ children, aspectRatio, onCrop }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<null | string>(null);

  const handleChildrenClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
    e.target.value = "";
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };

  return (
    <>
      <S.ImgInput type="file" accept="image/gif, image/png, image/jpeg" ref={inputRef} onChange={handleFileChange} />
      <span onClick={handleChildrenClick}>{children}</span>
      {image && (
        <S.Container>
          <S.ModalBg />
          <S.Modal>
            <S.Title>이미지 편집하기</S.Title>
            <S.CropperWrap>
              <Cropper
                ref={cropperRef}
                aspectRatio={aspectRatio}
                src={image}
                viewMode={1}
                width={600}
                height={375}
                background={false}
                responsive
                autoCropArea={1}
                checkOrientation={false}
                guides
              />
            </S.CropperWrap>
            <S.Buttons>
              <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={() => setImage(null)}>
                취소
              </Button>
              <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={getCropData}>
                적용하기
              </Button>
            </S.Buttons>
          </S.Modal>
        </S.Container>
      )}
    </>
  );
};

export default ImageCropper;
