import { axiosClient } from "../components/axios";
import { getLocalStored, deleteLocalStored } from "../components/localStored";

export async function handleLogout(navigate) {
  const auth = getLocalStored("auth");

  try {
    await axiosClient.post(
      "user/logout",
      {},
      {
        headers: { Authorization: "Bearer " + auth.token },
      }
    );
    deleteLocalStored("auth");
    navigate("/");
    
  } catch (error) {
    alert(error);
  }
}

export async function handleDeleteUser(navigate) {
  const auth = getLocalStored("auth");

  try {
    await axiosClient.delete("user/me", {
      headers: { Authorization: "Bearer " + auth.token },
    });
    deleteLocalStored("auth");
    navigate("/");
  } catch (error) {
    alert(error);
  }
}
