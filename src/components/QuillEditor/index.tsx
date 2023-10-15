import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { QuillWrapper } from "./index.styled";

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
    ],
  };

  return (
    <QuillWrapper
      value={value}
      onChange={(content, delta, source, editor) => {
        onChange(editor.getHTML());
      }}
      modules={modules}
    />
  );
};

export default QuillEditor;
