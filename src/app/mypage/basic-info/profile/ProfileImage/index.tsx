import axiosRequest from "@/api";
import { ResData } from "@/@types";

import { useEffect, useState } from "react";

import ImageCropper from "../ImageCropper";
import useImageCompress from "@/hooks/useImageCompess";

import * as S from "./index.styled";

import { dataURItoFile } from "@/utils/dataURItoFile";

import Image from "next/image";

interface ProfileImageProps {
  prev?: string;
  onChange: (src: string) => void;
}
export default function ProfileImage({ prev, onChange }: ProfileImageProps) {
  const defaultImage = "/assets/img/icons/default-user.svg";
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  //crop된 이미지
  const handleUploadImage = (image: string) => setUploadImage(image);

  //압축된 이미지
  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(imageFile);

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
    getImgUrl(compressedImage);
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
    // console.log("compressedImage", compressedImage);
  }, [uploadImage]);

  const deleteImg = () => {
    setCompressedImage(defaultImage);
  };

  const getImgUrl = async (compressedFile: Blob) => {
    try {
      const formData = new FormData();
      formData.append("files", compressedFile);
      const response = await axiosRequest.requestAxios<ResData<string[]>>("post", "/upload", formData);
      const imageUrl = response.data[0];

      setCompressedImage(imageUrl);
      onChange(imageUrl);
      console.log(imageUrl, "imageUrl");
    } catch (error) {
      console.error("프로필 이미지를 저장하는 중 오류가 발생했습니다.", error);
    }
  };
  return (
    <>
      <S.DeleteImgBtn onClick={deleteImg} />
      <S.ProfileImage>
        {compressedImage ? (
          <Image src={compressedImage} alt="profile-image" width={120} height={120} />
        ) : (
          <S.ProfileCover>
            {isCompressLoading ? (
              <S.Loading>이미지 압축 중..</S.Loading>
            ) : (
              <Image src={prev || defaultImage} alt="profile-image" width={120} height={120} />
            )}
          </S.ProfileCover>
        )}
        <ImageCropper aspectRatio={1 / 1} onCrop={handleUploadImage}>
          <S.EditImgBtn />
        </ImageCropper>
      </S.ProfileImage>
    </>
  );
}
