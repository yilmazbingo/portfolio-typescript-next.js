import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/BasePage";
import { useGetUser } from "@/actions/user";
import { SlateView } from "slate-simple-editor";
import Avatar from "@/components/shared/Avatar";
import BlogApi from "@/lib/api/blogs";
import { IUserBlogs, IBlog, IUser } from "@/types/interfaces";
import ReadOnlyView from "@/components/blog-editor/ReadOnlyView";

interface BlogDetailProps {
  blog: IBlog;
  author: IUser;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog, author }) => {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage
        title={`${blog.title} - YILMAZ BINGOL`}
        metaDescription={blog.subTitle}
        className="blog-slug-page"
        noWrapper
      >
        <h2>{blog.title}</h2>
        <Avatar
          author={author.name}
          image={author.picture}
          date={blog.createdAt}
        />
        <hr />
        {/* <SlateView initialContent={blog.content} /> */}
        <ReadOnlyView initialContent={blog.content} />
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const { data }: { data: IUserBlogs[] } = await new BlogApi().getAll();
  const paths = data.map(({ blog }) => ({ params: { slug: blog.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const {
    data: { blog, author },
  } = await new BlogApi().getBySlug(params.slug);
  return { props: { blog, author }, revalidate: 1 };
}

export default BlogDetail;
