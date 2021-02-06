import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
import { Editor } from "slate-simple-editor";
import { toast } from "react-toastify";
import { useGetBlog, useUpdateBlog } from "@/actions/blogs";
import { useRouter } from "next/router";
import { IBlogEditorProps } from "@/types/interfaces";

const BlogUpdateEditor: React.FC<IBlogEditorProps> = ({ user, loading }) => {
  const router = useRouter();
  const { data } = useGetBlog(router.query.id as string);
  const [updateBlog, { error, loading: isBlogSaving }] = useUpdateBlog();

  const _updateBlog = async (data: any) => {
    await updateBlog(router.query.id, data);
    toast.success("Blog updated!");
  };

  if (error) {
    toast.error(error);
  }

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        {data && data.content && (
          <Editor
            header="Update Your Blog..."
            initialContent={data.content}
            onSave={_updateBlog}
            loading={isBlogSaving}
          />
        )}
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(BlogUpdateEditor)("admin");
