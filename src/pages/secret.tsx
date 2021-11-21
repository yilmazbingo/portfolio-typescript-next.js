import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/BasePage";
import withAuth from "@/hoc/withAuth";
import { IUser } from "@/types/interfaces";

interface DashboardProps {
  user: IUser;
  loading: boolean;
}

const Secret: React.FC<DashboardProps> = ({ user, loading }) => {
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        <h1>I am Secret Page - Hello {user.name}</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(Secret)("admin");
