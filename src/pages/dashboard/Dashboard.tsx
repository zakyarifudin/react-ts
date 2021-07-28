import { QueryClient, useQuery } from "react-query";
import { useHistory } from "react-router";
import { authLogout, userAuth } from "../../api/authApi";
import "./Dashboard.scss";

const Post = () => {
  const queryClient = new QueryClient();
  const userInfo = useQuery("user-auth", userAuth);
  const history = useHistory();

  const handleLogout = async () => {
    // get user info yg login
    try {
      const userLogout = await queryClient.fetchQuery(
        "user-logout",
        authLogout
      );
      console.log(userLogout);

      if (userLogout.status === 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("bearer");

        // redirect belum bisa
        return history.push("/");
      } else {
        return window.alert("Logout sedang bermasalah");
      }
    } catch (e) {
      console.log(e);
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

  if (userInfo.isError) {
    return (
      <div className="dashboard">
        <h1>Dashboard Page</h1>
        <h2>Error Occur : {userInfo.error}</h2>
      </div>
    );
  }

  const { data } = userInfo;
  if (data !== null) {
    localStorage.setItem("user", JSON.stringify(data?.data));
  }

  return (
    <div className="dashboard">
      <h1>Dashboard Page</h1>
      <h2>Hello {data?.data.name}</h2>
      <button className="logout" onClick={() => handleLogout()}>
        {" "}
        Logout{" "}
      </button>
    </div>
  );
};

export default Post;
