import fetchProtected from "@/lib/fetchProtected";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useRouteHandler() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [prevPath, setPrevPath] = useState<string>(pathname);
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token === null) {
      setIsLoggedIn(false);
      setPrevPath(pathname);

      if (
        prevPath === "/auth/register/form" &&
        pathname === "/auth/register/interests"
      ) {
        return;
      } else if (
        pathname === "/auth/login" ||
        pathname === "/auth/register/form" ||
        pathname === "/"
      ) {
        return;
      } else {
        router.push("/auth/login");
      }
    } else {
      const checkAuthorization = async () => {
        try {
          const isAuthorized = await fetchProtected(access_token);
          if (isAuthorized) {
            setIsLoggedIn(true);
            if (
              pathname === "/auth/login" ||
              pathname === "/auth/register/form" ||
              pathname === "/auth/register/interests"
            ) {
              router.push("/");
            }
            return;
          }
          localStorage.removeItem("access_token");
          setIsLoggedIn(false);
          router.push("/auth/login");
        } catch (error) {
          alert("Error checking authorization:" + error);
          localStorage.removeItem("access_token");
          setIsLoggedIn(false);
          router.push("/auth/login");
        }
      };
      checkAuthorization();
    }
  }, [pathname]);

  return {
    isLoggedIn,
  };
}

export default useRouteHandler;
