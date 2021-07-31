import { QueryClient, useQuery } from "react-query";
import { useHistory } from "react-router";
import { authLogout, userAuth } from "../../api/authApi";
import axios, { AxiosError } from "axios";
import "./Dashboard.scss";

const Post = () => {
  const queryClient = new QueryClient();
  const userInfo = useQuery("user-auth", userAuth, {
    retry: 1,
    enabled: localStorage.getItem("user") ? false : true,
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });
  const history = useHistory();

  const handleLogout = async () => {
    // get user info yg login
    try {
      const userLogout = await queryClient.fetchQuery(
        "user-logout",
        authLogout
      );
      // console.log(userLogout);
      if (userLogout?.message === "Success Logout") {
        localStorage.removeItem("user");
        localStorage.removeItem("bearer");

        // redirect belum bisa
        return history.push("/");
      } else {
        return window.alert("No Internet Connection");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let message: any = "";
        if (e.response) {
          message = e.response.statusText;
        } else if (e.request) {
          message = "No Internet Connection";
        } else {
          message = e.message;
        }

        return window.alert(message);
      }

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
    let message: any = "";
    const e = error;
    if (axios.isAxiosError(e)) {
      if (e.response) {
        message = e.response.statusText;
      } else if (e.request) {
        message = "No Internet Connection";
      } else {
        message = e.message;
      }
    }

    return (
      <div className="dashboard">
        <h1>Dashboard Page </h1>
        <h2>Error Occur : {message} </h2>
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
