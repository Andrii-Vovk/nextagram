import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

import { useAppSelector } from "../../../core/store/hooks";

const AuthEnforcer: React.FC = () => {
  const router = useRouter();

  const token = useAppSelector((state)  => state.auth.authToken);

  useEffect(() => {
    if(!token && router.pathname !== "/login") {
      router.replace('/login');
    }
    if(token && router.pathname === "/login") {
      router.replace('/');
    }
  }, [token, router])

  return <></>;
};

export default AuthEnforcer;
