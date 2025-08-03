"use client";

import React, { useState, useEffect } from "react";

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
  const [Editor, setEditor] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import CKEditor to avoid SSR issues
    const loadEditor = async () => {
      try {
        console.log("Loading CKEditor...");
        const [{ CKEditor }, { default: ClassicEditor }] = await Promise.all([
          import("@ckeditor/ckeditor5-react"),
          import("@ckeditor/ckeditor5-build-classic"),
        ]);
        
        console.log("CKEditor loaded successfully");
        
        // Create a component that combines CKEditor with ClassicEditor
        const EditorComponent = (props: any) => (
          <CKEditor editor={ClassicEditor} {...props} />
        );
        
        setEditor(() => EditorComponent);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load CKEditor:", error);
        // Fallback to textarea if CKEditor fails
        setEditor(() => (props: any) => (
          <textarea
            value={props.data || ""}
            onChange={(e) => props.onChange && props.onChange(null, { getData: () => e.target.value })}
            placeholder={props.config?.placeholder || "Start writing..."}
            className="w-full p-4 border rounded-md resize-none"
            style={{ minHeight: minHeight }}
          />
        ));
        setIsLoaded(true);
      }
    };

    loadEditor();
  }, [minHeight]);

  if (!isLoaded || !Editor) {
    return (
      <div 
        className={`border rounded-md bg-white p-4 ${className}`}
        style={{ minHeight }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-md bg-white ${className}`} style={{ minHeight }}>
      <Editor
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
          console.log("CKEditor onChange:", data);
          onChange(data);
        }}
        onReady={(editor) => {
          console.log("CKEditor ready");
          
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
            editorElement.style.minHeight = minHeight;
            editorElement.style.cursor = "text";
          }

          // Style the editor container
          const editorContainer = editor.ui.view.element;
          if (editorContainer) {
            editorContainer.style.borderRadius = "0.5rem";
            editorContainer.style.overflow = "hidden";
            editorContainer.style.zIndex = "1";
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
