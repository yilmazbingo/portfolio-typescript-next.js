import React, { useState } from "react";
import MyEditor from "@/components/blog-editor";
import { useCreateBlog } from "@/actions/blogs";
import ErrorHandler from "@/components/ErrorHandler";
import { toast } from "react-toastify";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
import BlogField from "@/components/blog-editor/BlogField";
import BlogTitle from "@/components/blog-editor/BlogTitle";

import { useRouter } from "next/router";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");

  const [titleError, setTitleError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [err, setErr] = useState(null);
  console.log("field", field);

  const router = useRouter();
  const [
    createBlog,
    { data: createdBlog, error, loading: blogLoading },
  ] = useCreateBlog();

  const saveBlog = async (data: any) => {
    const createdBlog = await createBlog(data);
    //  i have to work on here. how google saves data.
    // second arg is "as". how do we want it to be displayed in the browser
    router.push("/blogs/editor/[id]", `/blogs/editor/${createdBlog._id}`);
  };
  console.log("error", error);
  const onHandle = () => setErr(null);
  return (
    <BaseLayout>
      <BasePage noWrapper className="blog-editor-page">
        <div className="blog-initial">
          {err && (
            <ErrorHandler error={error} onHandle={onHandle}></ErrorHandler>
          )}
          <BlogField onChange={setField} value={field} error={fieldError} />
          <BlogTitle onChange={setTitle} value={title} error={titleError} />
          <MyEditor
            setTitleError={setTitleError}
            setFieldError={setFieldError}
            onSave={saveBlog}
            // initialContent={initialValue}
            title={title}
            field={field}
          />
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(BlogEditor)("admin");
// const initialValue = [
//   {
//     type: "paragraph",
//     children: [{ text: `${field}`, bold: true }],
//   },
//   {
//     type: "paragraph",
//     children: [{ text: `${title}`, bold: true }],
//   },
// ];
// import BaseLayout from "@/components/layouts/BaseLayout";
// import BasePage from "@/components/BasePage";
// import withAuth from "@/hoc/withAuth";
// // import Editor from "@/components/slate-editor/Editor";
// import { Editor } from "slate-simple-editor";
// import { useCreateBlog } from "@/actions/blogs";
// import { toast } from "react-toastify";
// import { useRouter } from "next/router";
// import { IBlogEditorProps } from "@/types/interfaces";

// const BlogEditor: React.FC<IBlogEditorProps> = ({ user, loading }) => {
//   const router = useRouter();
//   const [
//     createBlog,
//     { data: createdBlog, error, loading: blogLoading },
//   ] = useCreateBlog();

//   const saveBlog = async (data: any) => {
//     const createdBlog = await createBlog(data);
//     //  i have to work on here. how google saves data.
//     // second arg is "as". how do we want it to be displayed in the browser
//     router.push("/blogs/editor/[id]", `/blogs/editor/${createdBlog._id}`);
//   };

//   if (error) {
//     toast.error(error.message);
//   }

//   return (
//     <BaseLayout user={user} loading={loading}>
//       <BasePage className="editor-page">
//         <Editor onSave={saveBlog} loading={blogLoading} />
//       </BasePage>
//     </BaseLayout>
//   );
// };

// export default withAuth(BlogEditor)("admin");
// // export default BlogEditor;
