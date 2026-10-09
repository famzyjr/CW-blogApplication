
import MarkdownEditor from "@uiw/react-markdown-editor";
import remarkBreaks from "remark-breaks";

const BlogContentEditor = ({ content, setContent }) => {
  return (
    <div
      data-color-mode="light"
      className="w-full max-w-5xl rounded-2xl bg-white border border-gray-200"
    >
      <MarkdownEditor
        value={content}
        onChange={(value) => setContent(value ?? "")}
        height="500px"
        enablePreview={true}
        previewProps={{
          remarkPlugins: [remarkBreaks],
        }}
      />
    </div>
  );
};

export default BlogContentEditor;

