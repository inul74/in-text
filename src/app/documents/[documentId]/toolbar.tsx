"use client";

import { useState } from "react";
import { IconType } from "react-icons";
import { FaCaretDown } from "react-icons/fa";
import { TbLineHeight } from "react-icons/tb";
import { GrUndo, GrRedo } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCommentAdd, BiUnderline } from "react-icons/bi";
import { FiMinus, FiPlus, FiPrinter } from "react-icons/fi";
import {
  MdChecklist,
  MdSpellcheck,
  MdFormatClear,
  MdOutlineLink,
  MdOutlineImage,
  MdOutlineFileUpload,
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
} from "react-icons/md";
import {
  FaList,
  FaListOl,
  FaListUl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";
import { HighlighterIcon } from "lucide-react";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, SketchPicker } from "react-color";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80"
          aria-label="Select line height"
          type="button"
        >
          <TbLineHeight className="size-4" />
          <FaCaretDown className="ml-1 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-accent",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-accent"
            )}
            aria-label={label}
            type="button"
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        aria-label="Decrease font size"
        type="button"
      >
        <FiMinus className="size-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={3}
          className="h-7 w-10 text-sm rounded-sm border border-neutral-400 bg-transparent text-center focus:outline-none focus:ring-0"
          aria-label="Change font size"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 rounded-sm border border-neutral-400 text-center text-sm hover:bg-neutral-200/80"
          aria-label="Current font size"
          type="button"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/80"
        aria-label="Increase font size"
        type="button"
      >
        <FiPlus className="size-4" />
      </button>
    </div>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: FaListUl,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: FaListOl,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          aria-label="Select list type"
          type="button"
        >
          <FaList className="size-4" />
          <FaCaretDown className="ml-1 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              isActive() && "bg-neutral-200/80"
            )}
            aria-label={label}
            type="button"
          >
            <Icon className="size-4" />
            <span className="truncate text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: FaAlignLeft,
    },
    {
      label: "Align Center",
      value: "center",
      icon: FaAlignCenter,
    },
    {
      label: "Align Right",
      value: "right",
      icon: FaAlignRight,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: FaAlignJustify,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          aria-label="Select highlight color"
          type="button"
        >
          <FaAlignLeft className="size-4" />
          <FaCaretDown className="ml-1 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
            aria-label={label}
            type="button"
          >
            <Icon className="size-4" />
            <span className="truncate text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
            aria-label="Insert image"
            type="button"
          >
            <MdOutlineImage className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuItem
            onSelect={onUpload}
            className="hover:!bg-neutral-200/80 focus:bg-neutral-200/80"
          >
            <MdOutlineFileUpload className="size-4" />
            <p className="text-xs text-neutral-700">Upload</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setIsDialogOpen(true)}
            className="hover:!bg-neutral-200/80 focus:bg-neutral-200/80"
          >
            <AiOutlineSearch className="size-4" />
            <p className="text-xs text-blue-600 underline">Image Url</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Enter the URL of the image you want to insert.
          </DialogDescription>
          <Input
            type="url"
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
            aria-label="Insert image URL"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            inputMode="url"
            pattern="https?://.*"
          />
          <DialogFooter>
            <Button role="button" onClick={handleImageUrlSubmit}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, $value] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    $value("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          $value(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          aria-label="Link"
          type="button"
        >
          <MdOutlineLink className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          name="href"
          type="url"
          className="flex-1"
          placeholder="https://example.com"
          value={value}
          onChange={(e) => $value(e.target.value)}
        />
        <Button role="button" onClick={() => onChange(value)}>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          aria-label="Select highlight color"
          type="button"
        >
          <HighlighterIcon className="size-4" />
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0" sideOffset={5}>
        <div role="dialog" aria-label="Color picker">
          <SketchPicker color={value} onChange={onChange} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          aria-label="Select text color"
          type="button"
        >
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0" sideOffset={5}>
        <div role="dialog" aria-label="Color picker">
          <SketchPicker color={value} onChange={onChange} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }

    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          aria-label="Select heading level"
          type="button"
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <FaCaretDown className="ml-1 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1" sideOffset={5}>
        <div role="menu">
          {headings.map(({ label, value, fontSize }) => (
            <button
              key={value}
              style={{ fontSize }}
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: value as Level })
                    .run();
                }
              }}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                (value === 0 && !editor?.isActive("heading")) ||
                  (editor?.isActive("heading", { level: value }) &&
                    "bg-neutral-200/80")
              )}
              role="menuitem"
              aria-label={label}
            >
              {label}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          aria-label="Select font family"
          type="button"
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <FaCaretDown className="ml-1 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1" sideOffset={5}>
        <div role="menu">
          {fonts.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setFontFamily(value).run()}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                editor?.getAttributes("textStyle").fontFamily === value &&
                  "bg-neutral-200/80"
              )}
              style={{ fontFamily: value }}
              role="menuitem"
              aria-label={`Set font to ${label}`}
            >
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: IconType;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
      aria-label="Format text"
      type="button"
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: IconType;
    onClick?: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: GrUndo,
        onClick: () => {
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: "Redo",
        icon: GrRedo,
        onClick: () => {
          editor?.chain().focus().redo().run();
        },
      },
      {
        label: "Print",
        icon: FiPrinter,
        onClick: () => {
          window.print();
        },
      },
      {
        label: "Spell Check",
        icon: MdSpellcheck,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: MdOutlineFormatBold,
        isActive: editor?.isActive("bold"),
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: MdOutlineFormatItalic,
        isActive: editor?.isActive("italic"),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: BiUnderline,
        isActive: editor?.isActive("underline"),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "Comment",
        icon: BiCommentAdd,
        onClick: () => {},
        isActive: false, // TODO: Enable this functionality
      },
      {
        label: "List Todo",
        icon: MdChecklist,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: MdFormatClear,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#ECF7F7] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontSizeButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-slate-300" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
