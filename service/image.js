import { axiosClient } from "../components/axios";
import { getLocalStored, deleteLocalStored } from "../components/localStored";
import imgAvatar from "../assets/aaa.jpg";

export async function getImage(setState) {
    const auth = getLocalStored("auth");
    const user = auth?.user;
    try {
      const res = await axiosClient.get(`user/${user._id}/avatar`);
      setImage(res.request.responseURL || imgAvatar);
    } catch (error) {
      setImage(imgAvatar);
    }
  }

  export async function handleDeleteImage(getImage) {
    const auth = getLocalStored("auth");
    try {
      await axiosClient.delete("user/me/avatar", {
        headers: { Authorization: "Bearer " + auth.token },
      });
      getImage();
      
    } catch (error) {
      alert(error);
    }
  }