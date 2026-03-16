"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useEffect, useState } from 'react';
import '../../styles/tiptap.css';

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function TiptapEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  className = "",
}: TiptapEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#c5a367] underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  // Don't render until mounted on client
  if (!isMounted || !editor) {
    return (
      <div className={`w-full h-[200px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-400 border border-gray-200 ${className}`}>
        Loading Editor...
      </div>
    );
  }

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden transition-colors focus-within:border-[#c5a367] focus-within:ring-2 focus-within:ring-[#c5a367]/20 ${className}`}>
      {/* Editor Content */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}