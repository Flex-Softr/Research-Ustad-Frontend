"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Strikethrough,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  showToolbar?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing...",
  className = "",
  minHeight = "300px",
  showToolbar = true,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (editorRef.current && !isInitialized && value) {
      editorRef.current.innerHTML = value;
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  useEffect(() => {
    if (
      editorRef.current &&
      isInitialized &&
      value !== editorRef.current.innerHTML
    ) {
      const selection = window.getSelection();
      let startOffset = 0;

      // Safely get the range and start offset
      if (selection && selection.rangeCount > 0) {
        try {
          const range = selection.getRangeAt(0);
          startOffset = range.startOffset || 0;
        } catch (error) {
          // If there's an error getting the range, use default offset
          startOffset = 0;
        }
      }

      editorRef.current.innerHTML = value;

      if (selection && selection.rangeCount > 0) {
        try {
          const newRange = document.createRange();
          newRange.setStart(editorRef.current, startOffset);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } catch (error) {
          // Fallback: set cursor at end
          try {
            const range = document.createRange();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
          } catch (fallbackError) {
            // If all else fails, just focus the editor
            editorRef.current.focus();
          }
        }
      }
    }
  }, [value, isInitialized]);

  const checkActiveFormats = useCallback(() => {
    if (!editorRef.current) return;

    const formats = new Set<string>();
    const selection = window.getSelection();

    // Check if we have a valid selection
    if (!selection || selection.rangeCount === 0) return;

    try {
      const range = selection.getRangeAt(0);
      if (range.collapsed) return; // No selection, just cursor

      // Check various formats
      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      if (document.queryCommandState("strikeThrough"))
        formats.add("strikeThrough");

      // Check justify states
      if (document.queryCommandState("justifyLeft")) formats.add("alignLeft");
      if (document.queryCommandState("justifyCenter"))
        formats.add("alignCenter");
      if (document.queryCommandState("justifyRight")) formats.add("alignRight");
      if (document.queryCommandState("justifyFull"))
        formats.add("alignJustify");

      // Check block formats
      const blockElement =
        range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
          ? (range.commonAncestorContainer as HTMLElement)
          : (range.commonAncestorContainer as HTMLElement).parentElement;

      if (blockElement) {
        const tagName = blockElement.tagName.toLowerCase();
        if (tagName === "h1") formats.add("h1");
        if (tagName === "h2") formats.add("h2");
        if (tagName === "h3") formats.add("h3");
        if (tagName === "blockquote") formats.add("blockquote");
        if (tagName === "pre") formats.add("code");
        if (tagName === "ul") formats.add("ul");
        if (tagName === "ol") formats.add("ol");
      }
    } catch (error) {
      // If there's an error accessing the range, just return without updating formats
      console.warn("Error checking active formats:", error);
      return;
    }

    setActiveFormats(formats);
  }, []);

  const execCommand = useCallback(
    (command: string, value?: string) => {
      // Ensure the editor is focused first
      editorRef.current?.focus();

      console.log(`Executing command: ${command} with value: ${value}`); // Debug log

      let result = false;

      // Handle different command types
      if (command === "formatBlock" && value) {
        // For headings and block elements, we need to pass the value as the third parameter
        result = document.execCommand(command, false, value);
        console.log(`formatBlock result: ${result} for value: ${value}`); // Debug log

        // If formatBlock fails, try alternative approach
        if (!result) {
          console.log("formatBlock failed, trying alternative approach");
          // Try inserting the HTML directly
          const tagName = value;
          const html = `<${tagName}>${
            window.getSelection()?.toString() || "Heading"
          }</${tagName}>`;
          result = document.execCommand("insertHTML", false, html);
          console.log(`insertHTML result: ${result}`);
        }
      } else if (command.startsWith("justify")) {
        // For justify commands, we need to pass the command name correctly
        result = document.execCommand(command, false, null);
        console.log(`justify result: ${result} for command: ${command}`); // Debug log
      } else {
        // For other commands like bold, italic, etc.
        result = document.execCommand(command, false, value);
        console.log(`other command result: ${result} for command: ${command}`); // Debug log
      }

      // Update content and check formats
      updateContent();
      setTimeout(checkActiveFormats, 50);
    },
    [checkActiveFormats]
  );

  const updateContent = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      if (content !== value) {
        onChange(content);
      }
    }
  }, [onChange, value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        execCommand("insertLineBreak");
      }
    },
    [execCommand]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      execCommand("insertText", text);
    },
    [execCommand]
  );

  const insertLink = useCallback(() => {
    if (!linkUrl.trim()) {
      alert("Please enter a URL");
      return;
    }

    if (savedRange && editorRef.current) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);

      const selectedText = savedRange.toString();
      const linkTextToUse = linkText.trim() || selectedText || linkUrl;

      const link = `<a href="${linkUrl.trim()}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; cursor: pointer;">${linkTextToUse}</a>`;
      document.execCommand("insertHTML", false, link);

      setIsLinkModalOpen(false);
      setLinkUrl("");
      setLinkText("");
      setSavedRange(null);
      updateContent();
    } else {
      // No text selected, insert new link
      const linkTextToUse = linkText.trim() || linkUrl;
      const link = `<a href="${linkUrl.trim()}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; cursor: pointer;">${linkTextToUse}</a>`;
      execCommand("insertHTML", link);

      setIsLinkModalOpen(false);
      setLinkUrl("");
      setLinkText("");
    }
  }, [linkText, linkUrl, savedRange, updateContent, execCommand]);

  const handleEditorFocus = useCallback(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }

    // Test if the editor is properly focused
    console.log("Editor focused, checking state...");
    console.log("Editor element:", editorRef.current);
    console.log("Selection:", window.getSelection());
    console.log("Is contentEditable:", editorRef.current?.contentEditable);
  }, [isInitialized]);

  const handleEditorMouseUp = useCallback(() => {
    checkActiveFormats();
  }, [checkActiveFormats]);

  const toolbarButtons = [
    { icon: Undo, command: "undo", title: "Undo (Ctrl+Z)", format: "undo" },
    { icon: Redo, command: "redo", title: "Redo (Ctrl+Y)", format: "redo" },
    { icon: Bold, command: "bold", title: "Bold (Ctrl+B)", format: "bold" },
    {
      icon: Italic,
      command: "italic",
      title: "Italic (Ctrl+I)",
      format: "italic",
    },
    {
      icon: Underline,
      command: "underline",
      title: "Underline (Ctrl+U)",
      format: "underline",
    },
    {
      icon: Strikethrough,
      command: "strikeThrough",
      title: "Strikethrough",
      format: "strikeThrough",
    },
    {
      icon: Heading1,
      command: "formatBlock",
      value: "h1",
      title: "Heading 1",
      format: "h1",
    },
    {
      icon: Heading2,
      command: "formatBlock",
      value: "h2",
      title: "Heading 2",
      format: "h2",
    },
    {
      icon: Heading3,
      command: "formatBlock",
      value: "h3",
      title: "Heading 3",
      format: "h3",
    },
    {
      icon: List,
      command: "insertUnorderedList",
      title: "Bullet List",
      format: "ul",
    },
    {
      icon: ListOrdered,
      command: "insertOrderedList",
      title: "Numbered List",
      format: "ol",
    },
    {
      icon: AlignLeft,
      command: "justifyLeft",
      title: "Align Left",
      format: "alignLeft",
    },
    {
      icon: AlignCenter,
      command: "justifyCenter",
      title: "Align Center",
      format: "alignCenter",
    },
    {
      icon: AlignRight,
      command: "justifyRight",
      title: "Align Right",
      format: "alignRight",
    },
    {
      icon: AlignJustify,
      command: "justifyFull",
      title: "Justify",
      format: "alignJustify",
    },
  ];

  const getButtonClassName = (format: string) => {
    const baseClass = "h-8 w-8 p-0 transition-all duration-200";
    return activeFormats.has(format)
      ? `${baseClass} bg-blue-600 text-white hover:bg-blue-700 shadow-md`
      : `${baseClass} hover:bg-gray-200 hover:text-gray-900`;
  };

  return (
    <div className={`border rounded-lg overflow-hidden bg-white ${className}`}>
      {showToolbar && (
        <div className="flex flex-wrap items-center gap-1 p-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-1">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => execCommand(button.command, button.value)}
                title={button.title}
                className={getButtonClassName(button.format)}
              >
                <button.icon size={16} />
              </Button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                  setSavedRange(selection.getRangeAt(0).cloneRange());
                }
                setIsLinkModalOpen(true);
              }}
              title="Insert Link"
              className="h-8 w-8 p-0 hover:bg-gray-200 hover:text-gray-900"
            >
              <Link size={16} />
            </Button>
          </div>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={handleEditorFocus}
        onMouseUp={handleEditorMouseUp}
        onKeyUp={handleEditorMouseUp}
        className="min-h-[300px] p-4 focus:outline-none focus:ring-0 focus:border-0"
        style={{
          fontFamily: "Siyam Rupali, sans-serif",
          minHeight: minHeight,
          lineHeight: "1.6",
          fontSize: "16px",
        }}
        data-placeholder={placeholder}
      />

      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Insert Link
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {savedRange?.toString()
                ? "Selected text will be converted to a link"
                : "Enter the text and URL for your link"}
            </p>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="linkText"
                  className="text-sm font-medium text-gray-700"
                >
                  Link Text
                  {!savedRange?.toString() && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id="linkText"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder={savedRange?.toString() || "Enter link text"}
                  className="mt-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      insertLink();
                    }
                  }}
                />
              </div>
              <div>
                <Label
                  htmlFor="linkUrl"
                  className="text-sm font-medium text-gray-700"
                >
                  URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      insertLink();
                    }
                  }}
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsLinkModalOpen(false);
                    setLinkUrl("");
                    setLinkText("");
                    setSavedRange(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={insertLink}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={
                    !linkUrl.trim() ||
                    (!linkText.trim() && !savedRange?.toString())
                  }
                >
                  Insert Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        [contenteditable] a {
          color: #2563eb !important;
          text-decoration: underline !important;
          cursor: pointer !important;
          font-weight: 500;
        }

        [contenteditable] a:hover {
          color: #1d4ed8 !important;
          text-decoration: underline !important;
        }

        [contenteditable] a:visited {
          color: #7c3aed !important;
        }

        [contenteditable] a:active {
          color: #dc2626 !important;
        }

        /* Heading Styles */
        [contenteditable] h1 {
          font-size: 2rem !important;
          font-weight: 900 !important;
          color: #111827 !important;
          margin: 1.5rem 0 1rem 0 !important;
          line-height: 1.2 !important;
          border-bottom: 2px solid #e5e7eb !important;
          padding-bottom: 0.5rem !important;
        }

        [contenteditable] h2 {
          font-size: 1.5rem !important;
          font-weight: 800 !important;
          color: #111827 !important;
          margin: 1.25rem 0 0.75rem 0 !important;
          line-height: 1.3 !important;
          border-bottom: 1px solid #e5e7eb !important;
          padding-bottom: 0.25rem !important;
        }

        [contenteditable] h3 {
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          color: #111827 !important;
          margin: 1rem 0 0.5rem 0 !important;
          line-height: 1.4 !important;
        }

        /* Blockquote Styles */
        [contenteditable] blockquote {
          border-left: 4px solid #471396 !important;
          padding-left: 1rem !important;
          margin: 1rem 0 !important;
          font-style: italic !important;
          color: #6b7280 !important;
          background-color: #f9fafb !important;
          padding: 1rem !important;
          border-radius: 0.5rem !important;
        }

        /* Code Block Styles */
        [contenteditable] pre {
          background-color: #1f2937 !important;
          color: #f9fafb !important;
          padding: 1rem !important;
          border-radius: 0.5rem !important;
          overflow-x: auto !important;
          margin: 1rem 0 !important;
          font-family: "Courier New", monospace !important;
          font-size: 0.875rem !important;
          line-height: 1.6 !important;
        }

        /* List Styles */
        [contenteditable] ul,
        [contenteditable] ol {
          margin: 1rem 0 !important;
          padding-left: 1.5rem !important;
        }

        [contenteditable] li {
          margin-bottom: 0.5rem !important;
        }

        /* Paragraph Styles */
        [contenteditable] p {
          margin-bottom: 1rem !important;
        }

        /* Strong and Emphasis */
        [contenteditable] strong {
          font-weight: 700 !important;
          color: #111827 !important;
        }

        [contenteditable] em {
          font-style: italic !important;
        }

        [contenteditable] u {
          text-decoration: underline !important;
        }

        [contenteditable] s {
          text-decoration: line-through !important;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
