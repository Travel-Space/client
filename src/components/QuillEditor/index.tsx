import React, { useCallback, useEffect, useRef, forwardRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { QuillWrapper } from "./index.styled";
import ImageResize from "quill-image-resize";
import Quill from "quill";
import axiosRequest from "@/api";
import { ResData } from "@/@types";

Quill.register("modules/ImageResize", ImageResize);

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
  "ordered",
  "bullet",
  "background",
  "color",
  "link",
  "image",
];

const compressImage = (file: File, maxWidth: number, maxHeight: number, quality: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d")!;

      const width = img.width;
      const height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          canvas.width = maxWidth;
          canvas.height = (height * maxWidth) / width;
        }
      } else {
        if (height > maxHeight) {
          canvas.height = maxHeight;
          canvas.width = (width * maxHeight) / height;
        }
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        blob => {
          resolve(new File([blob!], file.name, { type: file.type }));
        },
        "image/jpeg",
        quality,
      );
    };
    img.onerror = reject;
  });
};

const QuillEditor = forwardRef((props: QuillEditorProps, ref) => {

  const quillRef = useRef<any>(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const compressedFile = await compressImage(file, 1024, 1024, 0.7);
        const formData = new FormData();
        formData.append("files", compressedFile, compressedFile.name);
        try {
          const res = await axiosRequest.requestAxios<ResData<string>>("post", "/upload", formData);
          const uploadedImageUrl = res.data;
          props.setImages(prevUrls => [...prevUrls, uploadedImageUrl]); // 수정된 부분
          insertToEditor(uploadedImageUrl);
        } catch (error) {
          console.error("Image upload failed: ", error);
        }
      }
    };
  }, [props.setImages]);

  const insertToEditor = (imageUrl: string) => {
    const range = quillRef.current?.getSelection(true);
    if (range) {
      quillRef.current.insertEmbed(range.index, 'image', imageUrl);
      props.onChange(quillRef.current.getHTML());
    }
  };

  // 'modules' 객체 정의
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    ImageResize: {
      parchment: Quill.import("parchment"),
    },
  };

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: modules,
        formats: formats,
      });
      quillRef.current.getModule("toolbar").addHandler("image", imageHandler);
    }
  }, [imageHandler]);

  return (
    <QuillWrapper
      ref={quillRef}
      value={props.value}
      onChange={(content, delta, source, editor) => {
        props.onChange(editor.getHTML());
      }}
      modules={modules}
      formats={formats}
    />
  );
});

export default QuillEditor;
