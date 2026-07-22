import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  tablePlugin,
  toolbarPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { forwardRef, useImperativeHandle, useRef } from "react";

export interface MarkdownEditorHandle {
  getMarkdown: () => string;
}

const MarkdownEditor = forwardRef<MarkdownEditorHandle>((_, ref) => {
  const editorRef = useRef<MDXEditorMethods>(null);

  useImperativeHandle(ref, () => ({
    getMarkdown: () => {
      return editorRef.current?.getMarkdown() || "";
    },
  }));

  return (
    <div className="flex flex-col gap-4 border border-gray-300 min-h-100">
      <MDXEditor
        markdown={""}
        ref={editorRef}
        placeholder="Escreva seu post aqui..."
        plugins={[
          headingsPlugin(),
          linkDialogPlugin(),
          tablePlugin(),
          imagePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <CreateLink />
                <Separator />
                <ListsToggle />
                <Separator />
                <BlockTypeSelect />
                <InsertTable />
                <InsertImage />
                <InsertCodeBlock />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
});

export default MarkdownEditor;
