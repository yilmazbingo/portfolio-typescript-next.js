import { useGetUser } from "@/actions/user";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import BlogItem from "@/components/BlogItem";

import { IBlog } from "@/types/interfaces";

const Javascript: React.FC<{ blogs: IBlog[]; result: any }> = ({ blogs }) => {
  const { data: userData, loading } = useGetUser();

  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={userData}
      loading={loading}
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Masthead imagePath="/images/py.jpg">
          <h1>World of Python</h1>
          <span className="subheading">Pythonizm</span>
        </Masthead>
        <BasePage
          title="Python Blogs - YILMAZ BINGOL"
          className="blog-body"
          noWrapper
          metaDescription="python blogs Yilmaz Bingol"
        >
          {blogs &&
            blogs.map((blog: IBlog) => <BlogItem blog={blog} key={blog._id} />)}
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IBlog[] } = await new BlogApi().getById("python");
  // const result = await new BlogApi().getById("python");

  return {
    props: { blogs: data },
    // Error: The `unstable_revalidate` property is available for general use. Please use `revalidate` instead.
    revalidate: 1,
  };
}

export default Javascript;
