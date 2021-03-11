export interface IBlog {
  _id: string;
  slug: string;
  title: string;
  subTitle: string;
  content: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  author: { name: string };
  field: string;
}
export interface IUserBlogs {
  blog: IBlog;
  author: IUser;
}

export interface IPortfolio {
  _id: string;
  title: string;
  company: string;
  companyWebsite: string;
  location: string;
  jobTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  createdAt: string;
}

export interface IUser {
  [key: string]: any;

  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
  // `${process.env.AUTH0_NAMESPACE}/roles`:[]string
}

export interface IBlogEditorProps {
  user: IUser;
  loading: boolean;
}
