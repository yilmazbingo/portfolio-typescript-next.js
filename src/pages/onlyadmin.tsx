import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
import { IUser } from "@/types/interfaces";

const OnlyAdmin = ({ user, loading }: { user: IUser; loading: true }) => {
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        <h1>I am Admin Page - Hello {user.name}</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(OnlyAdmin)("admin");
