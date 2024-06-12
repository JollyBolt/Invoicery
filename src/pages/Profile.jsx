import Heading from "../components/Heading";
import PageWrapper from "../hoc/PageWrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const Profile = () => {

   //Checking if authtoken exists, i.e., logged in on refresh
   const dispatch = useDispatch();
   const { loggedIn } = useSelector((state) => state.auth);

  return (
    <div>
      <Heading name="Profile" />
    </div>
  );
};

export default PageWrapper(Profile, "profile");
