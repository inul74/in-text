"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const TipTapEditor = dynamic(
  async () => {
    const [useEditor, EditorContent, StarterKit] = await Promise.all([
      import("@tiptap/react").then((mod) => mod.useEditor),
      import("@tiptap/react").then((mod) => mod.EditorContent),
      import("@tiptap/starter-kit").then((mod) => mod.default),
    ]);

    return function Editor() {
      const editor = useEditor({
        editorProps: {
          attributes: {
            style: "padding-left: 56px; padding-right: 56px;",
            class:
              "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
          },
        },
        extensions: [StarterKit],
        content: `<p>Hi there! 👋</p>`,
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
