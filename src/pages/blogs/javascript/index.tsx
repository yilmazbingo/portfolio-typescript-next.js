import { useGetBlogByField, useGetBlog } from "@/actions/blogs";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import { useGetUser } from "@/actions/user";
import { IBlog } from "@/types/interfaces";

import BlogItem from "@/components/BlogItem";

const Javascript: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data: userData, loading } = useGetUser();

  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      loading={loading}
      user={userData}
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Masthead imagePath="/images/js.png">
          <h1>World of Javacript</h1>
          <span className="subheading">Javacriptism</span>
        </Masthead>
        <BasePage
          title="Javascript Blogs - YILMAZ BINGOL"
          className="blog-body"
          noWrapper
          metaDescription="javascript blogs"
        >
          {blogs &&
            blogs.map((blog: IBlog) => <BlogItem blog={blog} key={blog._id} />)}
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
