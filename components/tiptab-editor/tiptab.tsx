'use client'

import './tiptab.css'
import {
  ALargeSmallIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignStartIcon,
  TextAlignEndIcon,
  ItalicIcon,
  BoldIcon,
  StrikethroughIcon,
  PaintbrushIcon,
  ListOrderedIcon,
  ListIcon,
  CodeIcon,
  QuoteIcon,
  ImagePlusIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ChevronDownIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from '@tiptap/extension-image'
// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import { Dropcursor } from '@tiptap/extensions'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const MenuBar = ({ editor }: { editor: Editor }) => {
  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <ButtonGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type='button'
                className="!pl-2"
              >
                <ALargeSmallIcon />
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="[--radius:1rem]">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                  <Heading1Icon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2Icon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                  <Heading3Icon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                >
                  <Heading4Icon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                >
                  <Heading5Icon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                >
                  <Heading6Icon />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            type='button'
            className={editor.isActive('bold') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive('italic') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive('strike') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive('highlight') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <PaintbrushIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <TextAlignStartIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <TextAlignCenterIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <TextAlignEndIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          >
            <TextAlignJustifyIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrderedIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <CodeIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <QuoteIcon />
          </Button>
          <Button
            type='button'
            className={editor.isActive('img') ? 'is-active' : ''}
            onClick={addImage}
          >
            <ImagePlusIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default ({content = '', getContent}: {content: string, getContent?: (arg: string) => void}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Image,
      // Document,
      // Paragraph,
      // Text,
      // Dropcursor,
    ],
    immediatelyRender: false,
    content,
    // onUpdate: ({ editor }) => {
    //   const html = editor.getHTML();
    //   const json = editor.getJSON();
    //   console.log('Content updated:', html);
    // },
  })

  return (
    <div className='border mt-4 rounded-md tiptap p-1 overflow-x-scroll'>
      <div className='mb-3 flex justify-center'><MenuBar editor={editor as Editor} /></div>
      <EditorContent editor={editor} onMouseLeave={() => getContent && getContent(editor?.getHTML() || '')} />
    </div>
  )
}
