import React, { useEffect } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/BasePage";
import { useGetUser } from "@/actions/user";
import BlogHeader from "@/components/blog-view/BlogHeader";
import Avatar from "@/components/blog-view/Avatar";
import BlogApi from "@/lib/api/blogs";
import { IBlog, IUser, IUserBlogs } from "@/types/interfaces";
import ReadOnlyView from "@/components/blog-editor/ReadOnlyView";
import { getPostData, getPostsFiles } from "@/helpers/markdownBlogs";
import { Container, Row, Col } from "reactstrap";
import PostContent from "@/components/blog-view/MarkdownPost";

interface BlogDetailProps {
  blog: IBlog;
  author: IUser;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog, author }) => {
  const { data, loading } = useGetUser();
  useEffect(() => {
    console.log("blog", blog);
  }, []);

  return (
    <BaseLayout user={data} loading={loading} noSideBar className="blog-slug">
      <BasePage
        title={` ${blog.title}  - YILMAZ BINGOL`}
        // metaDescription={blog.subTitle}
        className="blog-slug-page"
        noWrapper
      >
        <BlogHeader title={blog.title} />
        {/* <h1>{blog.title}</h1> */}
        <Avatar
          author={author.name}
          image={author.picture}
          date={blog.createdAt}
          field={blog.field}
        />
        {blog.isMarkdown ? (
          <PostContent blog={blog} />
        ) : (
          <ReadOnlyView initialContent={blog.content} />
        )}
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  // const { data }: { data: IUserBlogs[] } = await new BlogApi().getAll();
  const postFilenames = getPostsFiles();
  const markdownPosts = postFilenames.map((filename) => getPostData(filename));
  const markdownPaths = markdownPosts.map((blog) => ({
    params: { slug: blog.slug },
  }));
  // const paths =
  //   data && data.map(({ blog }) => ({ params: { slug: blog.slug } }));
  const allPaths = [...markdownPaths];
  return { paths: allPaths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { data } = await new BlogApi().getBySlug(params.slug);
  const { blog, author } = data;

  if (!data.blog) {
    const markdownPost = getPostData(params.slug);
    return {
      props: { blog: markdownPost, author: markdownPost.author },
      revalidate: 1000,
    };
  }
  return { props: { blog, author }, revalidate: 1000 };
}

export default BlogDetail;
