"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] bg-gray-50 animate-pulse rounded-2xl flex items-center justify-center text-gray-400 border border-gray-200">
      Loading Editor...
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "link",
];

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  return (
    <div className={className}>
      <style jsx global>{`
        .quill {
          border: 1px solid #e5e7eb !important;
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .quill:focus-within {
          border-color: #c5a367 !important;
          box-shadow: 0 0 0 4px rgba(197, 163, 103, 0.1);
        }
        .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #f3f4f6 !important;
          background: #f9fafb;
          padding: 10px !important;
        }
        .ql-container {
          border: none !important;
          min-height: 200px;
          font-family: inherit;
          font-size: 14px;
        }
        .ql-editor {
          padding: 1.25rem !important;
          min-height: 200px;
          line-height: 1.6;
          color: #374151;
        }
        .ql-editor.ql-blank::before {
          left: 1.25rem !important;
          color: #9ca3af;
          font-style: normal;
        }
        /* Custom Tooltip/Toolbar Highlight */
        .ql-snow.ql-toolbar button:hover,
        .ql-snow .ql-toolbar button:hover,
        .ql-snow.ql-toolbar button.ql-active,
        .ql-snow .ql-toolbar button.ql-active {
          color: #c5a367 !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: #c5a367 !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-fill {
          fill: #c5a367 !important;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
