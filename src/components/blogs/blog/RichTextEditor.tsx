"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface RichTextEditorProps {
  value: string;
  onChange: (data: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing...",
  className = "",
  minHeight = "400px",
}) => {
  return (
    <div className={`border rounded-md bg-white ${className}`}>
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        config={{
          placeholder: placeholder,
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "undo",
            "redo",
          ],
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
              },
              {
                model: "heading5",
                view: "h5",
                title: "Heading 5",
                class: "ck-heading_heading5",
              },
              {
                model: "heading6",
                view: "h6",
                title: "Heading 6",
                class: "ck-heading_heading6",
              },
            ],
          },
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        onReady={(editor) => {
          // Set minimum height
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "min-height",
              minHeight,
              editor.editing.view.document.getRoot()
            );
          });

          // Add custom CSS for more internal space
          const editorElement = editor.ui.getEditableElement();
          if (editorElement) {
            editorElement.style.padding = "1rem";
            editorElement.style.lineHeight = "1.8";
            editorElement.style.fontSize = "16px";
          }

          // Style the editor container
          const editorContainer = editor.ui.view.element;
          if (editorContainer) {
            editorContainer.style.borderRadius = "0.5rem";
            editorContainer.style.overflow = "hidden";
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
