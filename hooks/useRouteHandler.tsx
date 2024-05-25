import { getAccessToken, removeAccessToken } from "@/lib/actions";
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

      if (!access_token) {
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
        return;
      }

      try {
        const isAuthorized: checkProtectedType = await fetchProtected(
          access_token
        );
        setIsAuthed(isAuthorized);

        if (isAuthorized.isOk === true) {
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
        removeAccessToken();
        setIsLoggedIn(false);
        router.push("/auth/login");
      } catch (error) {
        alert("Error checking authorization:" + error);
        removeAccessToken();
        setIsLoggedIn(false);
        router.push("/auth/login");
      }
    };

    checkAuthorization();
  }, [pathname, router]);

  return {
    isLoggedIn,
    isAuthed,
  };
}

export default useRouteHandler;
