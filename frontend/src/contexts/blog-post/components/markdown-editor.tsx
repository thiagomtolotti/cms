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
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function MarkdownEditor() {
  return (
    <div className="flex flex-col gap-4 border border-gray-300 min-h-100">
      <MDXEditor
        markdown={""}
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
}
