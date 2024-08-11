import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Link as LinkIcon, List, ListOrdered, Strikethrough } from "lucide-react";
import { forwardRef, Ref } from "react";

const RichTextEditor = forwardRef(({
  placeholder,
  ...props
}: {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}, ref: Ref<HTMLDivElement>) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] max-h-[150px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Link.configure({
        openOnClick: true, 
        HTMLAttributes: {
          class: "underline text-blue-600", 
          target: "_blank", 
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content: props.value || '',
    onUpdate: ({ editor }) => {
      props.onChange?.(editor.getHTML());
    },
  });

  return (
    <>
      <EditorContent editor={editor} ref={ref} />
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
    </>
  );
});

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  const toggleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    } else {
      const url = prompt("Enter the URL");
      if (url) {
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      }
    }
  };

  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("link")}
        onPressedChange={toggleLink}
        disabled={editor?.state.selection.empty}
      >
        <LinkIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default RichTextEditor;
