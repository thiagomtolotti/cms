import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  listsPlugin,
  tablePlugin,
  toolbarPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface MarkdownEditorHandle {
  getMarkdown: () => string;
}

interface MarkdownEditorProps {
  defaultValue?: string;
}

const MarkdownEditor = forwardRef<MarkdownEditorHandle, MarkdownEditorProps>(
  ({ defaultValue }: MarkdownEditorProps, ref) => {
    const editorRef = useRef<MDXEditorMethods>(null);

    useImperativeHandle(ref, () => ({
      getMarkdown: () => {
        return editorRef.current?.getMarkdown() || "";
      },
    }));

    useEffect(() => {
      editorRef.current?.setMarkdown(defaultValue || "");
    }, [defaultValue]);

    return (
      <div className="flex flex-col gap-4 border border-gray-300">
        <MDXEditor // https://mdxeditor.dev/
          markdown={defaultValue || ""}
          ref={editorRef}
          placeholder="Escreva seu post aqui..."
          contentEditableClassName="min-h-100"
          plugins={[
            diffSourcePlugin(),
            headingsPlugin(),
            linkDialogPlugin(),
            tablePlugin(),
            imagePlugin(),
            listsPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <DiffSourceToggleWrapper>
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
                </DiffSourceToggleWrapper>
              ),
            }),
          ]}
        />
      </div>
    );
  },
);

export default MarkdownEditor;
