import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "../useToast";
// import { useRouter } from "next/router";
import { app, getAuth } from "config/firebase";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useAppleLogin = () => {
  const { sendSuccessToast, sendErrorToast, toast: appleToast } = useToast();
  // const router = useRouter();
  const authWithApple = async () => {
    const auth = getAuth(app);
    const provider = new OAuthProvider("apple.com");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user?.getIdToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/apple`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      sendErrorToast("Error!", err.response.data.data.error);
    }
  };
  const { mutate: appleLogin, isLoading } = useMutation({
    mutationFn: authWithApple,
    onSuccess: (data) => {
      localStorage.setItem("auth-token", data.data.token);
      localStorage.setItem("user_id", data.data.id);
      localStorage.setItem("user_info", JSON.stringify(data.data));

      sendSuccessToast("Success!", "Logged in successfully!");
      setTimeout(() => {
        router.push("/");
      }, 500);
    },
  });
  return {
    appleLogin,
    isLoading,
    appleToast,
  };
};
