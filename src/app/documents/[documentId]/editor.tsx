"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

import { useEditorStore } from "@/store/use-editor-store";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";

import { Ruler } from "./ruler";

const TipTapEditor = dynamic(
  async () => {
    const [
      useEditor,
      EditorContent,
      StarterKit,
      Link,
      TaskItem,
      TaskList,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      Highlight,
      TextAlign,
      ImageResize,
    ] = await Promise.all([
      import("@tiptap/react").then((mod) => mod.useEditor),
      import("@tiptap/react").then((mod) => mod.EditorContent),
      import("@tiptap/starter-kit").then((mod) => mod.default),
      import("@tiptap/extension-task-item").then((mod) => mod.default),
      import("@tiptap/extension-task-list").then((mod) => mod.default),
      import("@tiptap/extension-table").then((mod) => mod.default),
      import("@tiptap/extension-table-header").then((mod) => mod.default),
      import("@tiptap/extension-table-cell").then((mod) => mod.default),
      import("@tiptap/extension-table-row").then((mod) => mod.default),
      import("@tiptap/extension-link").then((mod) => mod.default),
      import("@tiptap/extension-font-family").then((mod) => mod.default),
      import("@tiptap/extension-text-style").then((mod) => mod.default),
      import("@tiptap/extension-underline").then((mod) => mod.default),
      import("@tiptap/extension-color").then((mod) => mod.default),
      import("@tiptap/extension-highlight").then((mod) => mod.default),
      import("@tiptap/extension-text-align").then((mod) => mod.default),
      import("tiptap-extension-resize-image").then((mod) => mod.default),
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
          LineHeightExtension,
          FontSizeExtension,
          Link.configure({
            openOnClick: false,
            autolink: true,
            defaultProtocol: "https",
          } as any),
          Color,
          Highlight.configure({
            multicolor: true,
          } as any),
          FontFamily,
          TextStyle,
          Underline,
          Table.configure({
            resizable: true,
          } as any),
          TableCell,
          TableHeader,
          TableRow,
          TaskList.configure({
            nested: true,
          } as any),
          TaskItem,
          ImageResize,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          } as any),
        ],
        content: ``,
        immediatelyRender: false,
      });

      return (
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
          <Ruler />
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
