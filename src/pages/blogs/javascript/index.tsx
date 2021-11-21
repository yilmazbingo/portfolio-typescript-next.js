import { useGetBlogByField, useGetBlog } from "@/actions/blogs";
import BasePage from "@/components/layout/BasePage";
import BaseLayout from "@/components/layout/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import { useGetUser } from "@/actions/user";
import { IBlog } from "@/types/interfaces";
import { Row, Col, Container } from "reactstrap";
import BlogItem from "@/components/blog-view/BlogItem";
import { getPostsByField } from "@/helpers/markdownBlogs";
import MapBlogs from "@/components/blog-view/MapBlogs";

const Javascript: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data: userData, loading } = useGetUser();

  return (
    <BaseLayout
      className="blog-listing-page"
      navClass="transparent"
      loading={loading}
      user={userData}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Masthead backgroundColor="#f0db4f">
          <h1>World of Javacript</h1>
          <span className="subheading">Javacriptism</span>
        </Masthead>
        <BasePage
          title="Javascript Blogs - YILMAZ BINGOL"
          className="blog-body"
          metaDescription="javascript blogs"
          noWrapper
        >
          <MapBlogs blogs={blogs} />
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IBlog[] } = await new BlogApi().getById("javascript");
  const markDownPosts = getPostsByField("javascript");

  const allBlogs = [...markDownPosts, ...data];

  return {
    props: { blogs: allBlogs },
    revalidate: 1,
  };
}

export default Javascript;
