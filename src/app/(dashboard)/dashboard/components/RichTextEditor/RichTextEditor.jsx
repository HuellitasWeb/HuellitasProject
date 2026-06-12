"use client"

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const RichTextEditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2] },
            }),
        ],
        content: content || '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[180px]',
            },
        },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    if (!editor) {
        return null;
    }

    const btnClass = (base, active) => `${base} ${active ? 'bg-primaryColor/10 text-primaryColor' : ''}`;

    return (
        <div style={{ margin: '0px' }} className='bg-white text-primaryColor border border-gray-300 rounded-xl overflow-hidden' >
            <div style={{ borderBottom: '1px solid #ddd'}}>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid text-[16px] rounded-md hover:bg-slate-300', editor.isActive('heading', { level: 1 }))}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >H1</button>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid rounded-md text-[15px] hover:bg-slate-300', editor.isActive('heading', { level: 2 }))}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >H2</button>

                <span className='px-3 py-1 text-gray-300'>|</span>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid rounded-md hover:bg-slate-300 font-bold', editor.isActive('bold'))}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >N</button>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid rounded-md hover:bg-slate-300 italic', editor.isActive('italic'))}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >It</button>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid rounded-md hover:bg-slate-300 underline', editor.isActive('underline'))}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >S</button>

                <span className='px-3 py-1 text-gray-300'>|</span>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid rounded-md hover:bg-slate-300', editor.isActive('paragraph'))}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                >Párrafo</button>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid rounded-md hover:bg-slate-300', editor.isActive('blockquote'))}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >Nota</button>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid rounded-md hover:bg-slate-300', editor.isActive('orderedList'))}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >OL</button>

                <button
                    type='button'
                    className={btnClass('px-2 py-1 border-solid rounded-md hover:bg-slate-300', editor.isActive('bulletList'))}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >UL</button>
            </div>


            <div className='text-black p-[10px] min-h-[200px] max-h-[250px] overflow-y-scroll'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;
