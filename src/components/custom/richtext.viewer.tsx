import React from 'react';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface RichTextViewerProps {
  content: string;
}

const RichTextViewer: React.FC<RichTextViewerProps> = ({ content }) => {
  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'underline text-blue-600',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: content,
    editable: false,
  });

  return <EditorContent editor={editor} />;
};

export default RichTextViewer;
