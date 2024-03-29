import axios from "axios";
import {
  GoogleAuthProvider,
  app,
  getAuth,
  signInWithPopup,
} from "config/firebase";
import { useToast } from "../useToast";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/router";

export const useGoogleLogin = () => {
  const { sendSuccessToast, sendErrorToast, toast: googleToast } = useToast();
  // const router = useRouter();
  const authWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user?.getIdToken();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      sendErrorToast("Error!", error.response.data.data.error);
    }
  };

  const { mutate: googleLogin, isLoading } = useMutation({
    mutationFn: authWithGoogle,
    onSuccess: (data) => {
      localStorage.setItem("auth-token", data.data.token);
      localStorage.setItem("user_id", data.data.id);
      localStorage.setItem("user_info", JSON.stringify(data.data));

      sendSuccessToast("Success!", "Logged in successfully!");
      setTimeout(() => {
        // router.push("/");
      }, 500);
    },
  });

  return {
    googleLogin,
    isLoading,
    googleToast,
  };
};
