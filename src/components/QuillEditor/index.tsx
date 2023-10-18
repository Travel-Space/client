import React from "react";
import "react-quill/dist/quill.snow.css";
import { QuillWrapper } from "./index.styled";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";

Quill.register("modules/ImageResize", ImageResize);

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export const formats = [
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

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
    ],
    ImageResize: {
      parchment: Quill.import("parchment"),
    },
  };

  return (
    <QuillWrapper
      value={value}
      onChange={(content, delta, source, editor) => {
        onChange(editor.getHTML());
      }}
      modules={modules}
      formats={formats}
    />
  );
};

export default QuillEditor;
