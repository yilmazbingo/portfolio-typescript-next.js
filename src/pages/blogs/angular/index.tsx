import { useGetUser } from "@/actions/user";
import BasePage from "@/components/layout/BasePage";
import BaseLayout from "@/components/layout/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import { IBlog } from "@/types/interfaces";
import BlogItem from "@/components/blog-view/BlogItem";
import { getPostsByField } from "@/helpers/markdownBlogs";

const Javascript: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data: userData, loading } = useGetUser();
  console.log("blogs in angular", blogs);

  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={userData}
      loading={loading}
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Masthead imagePath="/images/angular.png">
          {/* <h1>World of Angular</h1> */}
          {/* <span className="subheading">Angularizm</span> */}
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
  const markDownPosts = getPostsByField("angular");
  const { data }: { data: IBlog[] } = await new BlogApi().getById("angular");
  const allBlogs = [...markDownPosts, ...data];
  return {
    props: { blogs: allBlogs },
    revalidate: 1,
  };
}

export default Javascript;
