import { useEffect } from "react";
import { useRouter } from "next/router";
//instead of router.push, it is better to render this page
const Redirect: React.FC<{ to: string; ssr?: boolean }> = ({ to, ssr }) => {
  const router = useRouter();

  // useEffect is always executed on the browser
  useEffect(() => {
    if (ssr) {
      window.location.pathname = to;
    } else {
      router.push(to);
    }
  }, []);

  return null;
};

export default Redirect;
