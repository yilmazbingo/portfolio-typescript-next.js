import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/BasePage";
import { useGetUser } from "@/actions/user";
import Masthead from "@/components/shared/Masthead";
import { Row, Col, Container } from "reactstrap";
import BlogItem from "@/components/BlogItem";
import BlogApi from "@/lib/api/blogs";
import { IBlog, IUserBlogs } from "../../types/interfaces/index";
import BlogTopics from "@/components/BlogTopics";

const Blogs: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={data}
      loading={loading}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Masthead imagePath="/images/home-bg.jpg" overlay>
          <h1>Fresh Blogs</h1>
          <span className="subheading">Programming</span>
        </Masthead>
        <BasePage
          title="Newest Blogs - YILMAZ BINGOL"
          className="blog-body"
          noWrapper
          metaDescription="javascript python blockchain react angular node.js database blogs"
        >
          <BlogTopics />
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IUserBlogs[] } = await new BlogApi().getAll();
  const blogs = data.map((item) => ({ ...item.blog, author: item.author }));
  return {
    props: { blogs },
    // Error: The `unstable_revalidate` property is available for general use. Please use `revalidate` instead.
    revalidate: 1,
  };
}

export default Blogs;
