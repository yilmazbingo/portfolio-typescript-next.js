import React, { useState } from "react";

import MyEditor from "@/components/blog-editor";
import { useCreateBlog } from "@/actions/blogs";
import ErrorHandler from "@/components/ErrorHandler";
import { toast } from "react-toastify";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";

import { useRouter } from "next/router";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [titleError, setTitleError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [err, setErr] = useState(null);
  console.log("field", field);

  const router = useRouter();
  const [createBlog, { data: createdBlog, error, loading }] = useCreateBlog();

  const saveBlog = async (data: any) => {
    const createdBlog = await createBlog(data);
    //  i have to work on here. how google saves data.
    // second arg is "as". how do we want it to be displayed in the browser
    router.push("/blogs/editor/[id]", `/blogs/editor/${createdBlog._id}`);
  };
  console.log("error", error);
  const onHandle = () => setErr(null);
  return (
    <BaseLayout loading={loading}>
      <BasePage noWrapper className="blog-editor-page">
        <div className="blog-initial">
          {err && (
            <ErrorHandler error={error} onHandle={onHandle}></ErrorHandler>
          )}

          <div className="group">
            <label htmlFor="field">Field</label>
            <select
              id="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <option value="javascript">Javascript</option>
              <option value="react">React</option>
              <option value="python">Python</option>
              <option value="angular">Angular</option>
              <option value="node.js">Node.js</option>
              <option value="blockchain">Blockchain</option>
            </select>
          </div>
          {fieldError && (
            <div className="alert danger">
              <h4>{fieldError}</h4>
            </div>
          )}

          <div className="group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {titleError && (
            <div className="alert danger">
              <h4>{titleError}</h4>
            </div>
          )}
        </div>
        <MyEditor
          setTitleError={setTitleError}
          setFieldError={setFieldError}
          onSave={saveBlog}
          title={title}
          field={field}
        />
      </BasePage>

      {/* <BlogEditor /> */}
    </BaseLayout>
  );
};

export default Editor;
