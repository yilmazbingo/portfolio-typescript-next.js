import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { Row, Col } from "reactstrap";
import { useGetUser } from "@/actions/user";
import { SlateView } from "slate-simple-editor";
import Avatar from "@/components/shared/Avatar";
import BlogApi from "@/lib/api/blogs";
import { IUserBlogs, IBlog, IUser } from "@/types/interfaces";
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
        className="slate-container"
      >
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Avatar
              title={author.name}
              image={author.picture}
              date={blog.createdAt}
            />
            <hr />
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
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
  return { props: { blog, author }, unstable_revalidate: 1 };
}

export default BlogDetail;
