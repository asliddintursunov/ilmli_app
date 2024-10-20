import {
  getAccessToken,
  getUsernameCookie,
  removeAccessToken,
} from "@/lib/actions";
import fetchProtected from "@/lib/fetchProtected";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type checkProtectedType = {
  isOk: boolean | null;
  message?: string;
  error?: string;
  logged_in_as?: string;
};

function useRouteHandler() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [isAuthed, setIsAuthed] = useState<checkProtectedType>({ isOk: null });
  const [prevPath, setPrevPath] = useState<string>(pathname);

  useEffect(() => {
    const checkAuthorization = async () => {
      const access_token = await getAccessToken().then((res) => res?.value);
      const username = await getUsernameCookie().then((res) => res?.value);

      if (access_token && username) {
        try {
          const isAuthorized: checkProtectedType = await fetchProtected(
            access_token
          );
          setIsAuthed(isAuthorized);

          if (isAuthorized.isOk === true) {
            setIsLoggedIn(true);
            if (pathname === "/auth/login" || pathname === "/auth/register") {
              router.push("/");
            }
            return;
          }
          removeAccessToken();
          setIsLoggedIn(false);
          router.push("/auth/login");
        } catch (error) {
          alert("Error checking authorization:" + error);
          removeAccessToken();
          setIsLoggedIn(false);
          router.push("/auth/login");
        }
      }
      if (!access_token && !username) {
        setIsLoggedIn(false);
        if (["/auth/login", "/auth/register", "/"].includes(pathname)) return;
      }
      if (access_token && !username) {
        removeAccessToken();
        setIsLoggedIn(false);
        router.push("/auth/login");
        return;
      }
      if (!access_token && username) {
        setIsLoggedIn(false);
        setPrevPath(pathname);
        if (prevPath === "/auth/register" && pathname === "/get-started/topics")
          return;
      }
    };

    checkAuthorization();
  }, [pathname]);

  return {
    isLoggedIn,
    isAuthed,
  };
}

export default useRouteHandler;
