import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Strikethrough,
  Undo2,
  Redo2,
} from 'lucide-react'
import type { Editor } from '@tiptap/react'
import type { LucideIcon } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'rich-text min-h-[120px] w-full px-4 py-3 text-sm leading-relaxed focus:outline-none',
        'data-placeholder': placeholder ?? 'Write something…',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="overflow-hidden rounded-xl border border-slate-300 bg-white/70 dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50/80 p-1.5 dark:border-white/10 dark:bg-white/5">
        <ToolbarButton icon={Bold} label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolbarButton icon={Italic} label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <ToolbarButton icon={Strikethrough} label="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />
        <Divider />
        <ToolbarButton icon={Heading2} label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <ToolbarButton icon={Heading3} label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
        <Divider />
        <ToolbarButton icon={List} label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolbarButton icon={ListOrdered} label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <Divider />
        <ToolbarButton icon={Undo2} label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} />
        <ToolbarButton icon={Redo2} label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} />
      </div>
      <EditorContent editor={editor as Editor} />
    </div>
  )
}

function ToolbarButton({
  icon: Icon,
  label,
  active,
  disabled,
  onClick,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-40 ${
        active
          ? 'bg-primary text-white'
          : 'text-slate-600 hover:bg-primary-soft hover:text-primary dark:text-slate-300'
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-slate-200 dark:bg-white/10" />
}
