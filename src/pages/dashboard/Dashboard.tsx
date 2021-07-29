import { QueryClient, useQuery } from "react-query";
import { useHistory } from "react-router";
import { authLogout, userAuth } from "../../api/authApi";
import { AxiosError } from "axios";
import "./Dashboard.scss";

const Post = () => {
  const queryClient = new QueryClient();
  const userInfo = useQuery("user-auth", userAuth, {
    retry: 1,
    enabled: localStorage.getItem("user") ? false : true,
  });
  const history = useHistory();

  const handleLogout = async () => {
    // get user info yg login
    try {
      const userLogout = await queryClient.fetchQuery(
        "user-logout",
        authLogout
      );
      // console.log(typeof userLogout);
      if (userLogout?.message === "Success Logout") {
        localStorage.removeItem("user");
        localStorage.removeItem("bearer");

        // redirect belum bisa
        return history.push("/");
      } else {
        return window.alert("No Internet Connection");
      }
    } catch (e) {
      // console.log(e);
      if (e instanceof Error) {
        return window.alert(e.message);
      }
    }
  };

  if (userInfo.isLoading) {
    return (
      <div className="dashboard">
        <h1>Dashboard Page</h1>
        <h2>Loading ...</h2>
      </div>
    );
  }

  const { error } = userInfo;
  if (userInfo.isError) {
    return (
      <div className="dashboard">
        <h1>Dashboard Page </h1>
        <h2>Error Occur : {error instanceof Error ? error.message : ""} </h2>
      </div>
    );
  }

  const { data } = userInfo;
  if (data) {
    // console.log(data, user);
    localStorage.setItem("user", JSON.stringify(data));
  }

  return (
    <div className="dashboard">
      <h1>Dashboard Page</h1>
      <h2>Hello {data?.name}</h2>
      <button className="logout" onClick={() => handleLogout()}>
        {" "}
        Logout{" "}
      </button>
    </div>
  );
};

export default Post;
