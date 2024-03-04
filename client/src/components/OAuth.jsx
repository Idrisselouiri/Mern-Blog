import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../fireBase.js";
import { loginSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const data = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const res = await data.json();
      if (res.success === false) {
        console.log(res.message);
      }
      if (data.ok) {
        dispatch(loginSuccess(res));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
