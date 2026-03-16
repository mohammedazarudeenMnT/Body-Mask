"use client";

import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('./tiptap-editor').then(mod => ({ default: mod.TiptapEditor })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
      Loading Editor...
    </div>
  ),
});

interface TiptapWrapperProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function TiptapWrapper(props: TiptapWrapperProps) {
  return <TiptapEditor {...props} />;
}