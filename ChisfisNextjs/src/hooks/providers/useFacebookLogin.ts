import axios from "axios";
import { app, getAuth, signInWithPopup } from "config/firebase";
import { useToast } from "../useToast";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/router";
import { FacebookAuthProvider } from "firebase/auth";

export const useFacebookLogin = () => {
  const { sendSuccessToast, sendErrorToast, toast: facebookToast } = useToast();
  // const router = useRouter();
  const authWithFacebook = async () => {
    const auth = getAuth(app);
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user?.getIdToken();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/facebook`,
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

  const { mutate: facebookLogin, isLoading } = useMutation({
    mutationFn: authWithFacebook,
    onSuccess: (data) => {
      localStorage.setItem("auth-token", data.data.token);
      localStorage.setItem("user_id", data.data.id);
      localStorage.setItem("user_info", JSON.stringify(data.data))

      sendSuccessToast("Success!", "Logged in successfully!");
      setTimeout(() => {
        // router.push("/");
      }, 500);
    },
  });

  return {
    facebookLogin,
    isLoading,
    facebookToast,
  };
};
