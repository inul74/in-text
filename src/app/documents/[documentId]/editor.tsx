"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import ImageResize from "tiptap-extension-resize-image";

import { useEditorStore } from "@/store/use-editor-store";

const TipTapEditor = dynamic(
  async () => {
    const [
      useEditor,
      EditorContent,
      StarterKit,
      TaskItem,
      TaskList,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Underline,
    ] = await Promise.all([
      import("@tiptap/react").then((mod) => mod.useEditor),
      import("@tiptap/react").then((mod) => mod.EditorContent),
      import("@tiptap/starter-kit").then((mod) => mod.default),
      import("@tiptap/extension-task-item").then((mod) => mod.default),
      import("@tiptap/extension-task-list").then((mod) => mod.default),
      import("@tiptap/extension-table").then((mod) => mod.default),
      import("@tiptap/extension-table-row").then((mod) => mod.default),
      import("@tiptap/extension-table-cell").then((mod) => mod.default),
      import("@tiptap/extension-table-header").then((mod) => mod.default),
      import("@tiptap/extension-underline").then((mod) => mod.default),
      import("@tiptap/extension-image").then((mod) => mod.default),
    ]);

    return function Editor() {
      const { setEditor } = useEditorStore();

      const editor = useEditor({
        onCreate({ editor }) {
          setEditor(editor);
        },
        onDestroy() {
          setEditor(null);
        },
        onUpdate({ editor }) {
          setEditor(editor);
        },
        onSelectionUpdate({ editor }) {
          setEditor(editor);
        },
        onTransaction({ editor }) {
          setEditor(editor);
        },
        onFocus({ editor }) {
          setEditor(editor);
        },
        onBlur({ editor }) {
          setEditor(editor);
        },
        onContentError({ editor }) {
          setEditor(editor);
        },

        editorProps: {
          attributes: {
            style: "padding-left: 56px; padding-right: 56px;",
            class:
              "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
          },
        },
        extensions: [
          StarterKit,
          TaskList,
          TaskItem.configure({ nested: true }),
          Table,
          TableRow,
          TableCell,
          TableHeader,
          Underline,
          ImageResize,
        ],
        content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
        immediatelyRender: false,
      });
      return (
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
          <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
            <EditorContent editor={editor} />
          </div>
        </div>
      );
    };
  },
  {
    ssr: false, // Disable server-side rendering
    loading: () => <div>Loading editor...</div>,
  }
);

export const Editor = () => {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <TipTapEditor />
    </Suspense>
  );
};
