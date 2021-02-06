import React from "react";
import { useGetUser } from "@/actions/user";
import Redirect from "@/components/shared/Redirect";
import { isAuthorized } from "@/utils/auth0";

// takes in Component, returns a functional component with "role" arg
// const withAuth = (Component:  React.ComponentType<T>) => (role: string) => {
//   return (props:T) => {
//     const { data, loading } = useGetUser();
//     if (loading) {
//       return <p>Loading...</p>;
//     }

//     if (!data) {
//       return <Redirect ssr to="/api/v1/login" />;
//     } else {
//       if (role && !isAuthorized(data, role)) {
//         return <Redirect ssr to="/api/v1/login" />;
//       }

//       return <Component user={data} loading={loading} {...props} />;
//     }
//   };
// };

function withAuth<T>(Component: React.ComponentType<T>) {
  return (role: string) => {
    return (props: T) => {
      const { data, loading } = useGetUser();
      if (loading) {
        return <p>Loading...</p>;
      }

      if (!data) {
        return <Redirect ssr to="/api/v1/login" />;
      } else {
        if (role && !isAuthorized(data, role)) {
          console.log("in autho");
          return <Redirect ssr to="/api/v1/login" />;
        }

        return <Component user={data} loading={loading} {...props} />;
      }
    };
  };
}

export default withAuth;
