import Heading from "../components/Heading";
import PageWrapper from "../hoc/PageWrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "../redux/slices/authSlice";

const Profile = () => {

   //Checking if authtoken exists, i.e., logged in on refresh
   const { refreshAuth } = authSlice.actions;
   const dispatch = useDispatch();
   const { loggedIn, loading } = useSelector((state) => state.auth);
   useEffect(() => {
     dispatch(refreshAuth());
   }, []);
  return (
    <div>
      <Heading name="Profile" />
    </div>
  );
};

export default PageWrapper(Profile, "profile");
