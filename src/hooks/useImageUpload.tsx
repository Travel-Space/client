import { useState } from "react";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import MESSAGE from "@/constants/message";

interface ImageUploadHook {
  imageUrl: string | null;
  handleImage: (files: FileList | null) => Promise<void>;
  status: boolean;
}

const useImageUpload: () => ImageUploadHook = () => {
  const [status, setStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImage = async (files: FileList | null) => {
    try {
      const formData = new FormData();
      if (files && files.length > 0) {
        formData.append("files", files[0]);

        setStatus(true);

        const response = await axiosRequest.requestAxios<ResData<string[]>>("post", "/upload", formData);

        setImageUrl(response.data[0]);
        setStatus(false);
      } else {
        // 파일이 선택되지 않았을 때의 처리
        alert(MESSAGE.FILE.NOT_FILE);
      }
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
      setStatus(false);
      console.error(error);
    }
  };

  return { status, imageUrl, handleImage };
};

export default useImageUpload;
