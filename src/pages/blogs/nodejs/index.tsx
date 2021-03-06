import { useGetUser } from "@/actions/user";
import BasePage from "@/components/layout/BasePage";
import BaseLayout from "@/components/layout/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import { useGetBlog } from "@/actions/blogs";
import { IBlog } from "@/types/interfaces";
import BlogItem from "@/components/blog-view/BlogItem";
import { getPostsByField } from "@/helpers/markdownBlogs";
import MapBlogs from "@/components/blog-view/MapBlogs";

const Javascript: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data: userData, loading } = useGetUser();

  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={userData}
      loading={loading}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Masthead imagePath="/images/node.png">
          <h1 style={{ color: "black" }}>World of Nodejs</h1>
          <span style={{ color: "black" }} className="subheading">
            Nodizm
          </span>
        </Masthead>
        <BasePage
          title="Node.js Blogs - YILMAZ BINGOL"
          className="blog-body"
          noWrapper
          metaDescription="node.js blogs Yilmaz Bingol"
        >
          <MapBlogs blogs={blogs} />
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IBlog[] } = await new BlogApi().getById("nodejs");
  const markDownPosts = getPostsByField("nodejs");

  const allBlogs = [...markDownPosts, ...data];

  return {
    props: { blogs: allBlogs },
    revalidate: 1,
  };
}

export default Javascript;
