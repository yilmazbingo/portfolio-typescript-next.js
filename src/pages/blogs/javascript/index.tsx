import { useGetBlogByField, useGetBlog } from "@/actions/blogs";
import BasePage from "@/components/layout/BasePage";
import BaseLayout from "@/components/layout/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import { useGetUser } from "@/actions/user";
import { IBlog } from "@/types/interfaces";
import { Row, Col, Container } from "reactstrap";
import BlogItem from "@/components/blog-view/BlogItem";

const Javascript: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data: userData, loading } = useGetUser();

  return (
    <BaseLayout navClass="transparent" loading={loading} user={userData}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          overflowY: "hidden",
        }}
      >
        <BasePage
          title="Javascript Blogs - YILMAZ BINGOL"
          className="blog-body"
          metaDescription="javascript blogs"
          noWrapper
        >
          <Masthead backgroundColor="#f0db4f">
            <h1>World of Javacript</h1>
            <span className="subheading">Javacriptism</span>
          </Masthead>
          <Container>
            {" "}
            <Row>
              <Col>
                {blogs &&
                  blogs.map((blog: IBlog) => (
                    <BlogItem blog={blog} key={blog._id} />
                  ))}
              </Col>
            </Row>
          </Container>
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IBlog[] } = await new BlogApi().getById("javascript");
  return {
    props: { blogs: data },
    revalidate: 1,
  };
}

export default Javascript;
