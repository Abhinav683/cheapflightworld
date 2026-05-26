import { useEffect } from "react"; // Ensure useEffect is imported

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none min-h-[250px] p-5 focus:outline-none focus:ring-0",
      },
    },
    immediatelyRender: false,
  });

  // Safe reset: Watch for parent form resets via useEffect
  useEffect(() => {
    if (editor && content === "" && editor.getHTML() !== "") {
      editor.commands.setContent("");
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-black">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-slate-200" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-slate-200" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-slate-200" : ""}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-6 w-[1px] bg-slate-200 self-center" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "bg-slate-200" : ""}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-slate-200" : ""}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-6 w-[1px] bg-slate-200 self-center" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-slate-200" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-slate-200" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-slate-200" : ""}
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Space */}
      <div onClick={() => editor.chain().focus().run()} className="cursor-text">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}