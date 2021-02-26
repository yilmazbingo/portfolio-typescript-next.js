import React, { useState } from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
// import { Editor } from "slate-simple-editor";
import MyEditor from "@/components/blog-editor";

import { toast } from "react-toastify";
import { useGetBlog, useUpdateBlog } from "@/actions/blogs";
import { useRouter } from "next/router";
import { IBlogEditorProps } from "@/types/interfaces";
import BlogField from "@/components/blog-editor/BlogField";
import BlogTitle from "@/components/blog-editor/BlogTitle";

const BlogUpdateEditor: React.FC<IBlogEditorProps> = ({ user, loading }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");

  const [titleError, setTitleError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const { data } = useGetBlog(router.query.id as string);
  console.log("data in update blog", data);
  const [updateBlog, { error, loading: isBlogSaving }] = useUpdateBlog();

  const _updateBlog = async (data: any) => {
    await updateBlog(router.query.id, data);
    toast.success("Blog updated!");
  };

  if (error) {
    console.log("error in updaitng", error);
    toast.error(error);
  }

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage noWrapper className="update-blog-page">
        <BlogField
          onChange={setField}
          value={data && data.field ? data.field : field}
          error={fieldError}
        />
        <BlogTitle
          onChange={setTitle}
          value={data && data.title ? data.title : title}
          error={titleError}
        />
        {data && data.content && (
          <MyEditor
            // header="Update Your Blog..."
            updating
            initialContent={data.content}
            onSave={_updateBlog}
            loading={isBlogSaving}
            setTitleError={setTitleError}
            setFieldError={setFieldError}
          />
        )}
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(BlogUpdateEditor)("admin");
