import { axiosClient } from "../components/axios";
import { getLocalStored } from "../components/localStored";
///////////////////
/// update status
export async function handleChangeStatus(e, id, getAllTask) {
  const auth = getLocalStored("auth");
  try {
    await axiosClient.put(
      "task/" + id,
      {
        completed: e.target.checked,
      },
      {
        headers: { Authorization: "Bearer " + auth.token },
      }
    );
    getAllTask();
  } catch (error) {
    alert(error);
  }
}

export async function createTask(job, ref, getAllTask) {
  if (job === "") {
    return;
  }
  const auth = getLocalStored("auth");

  try {
    await axiosClient.post(
      "task/",
      { description: job },
      {
        headers: { Authorization: "Bearer " + auth.token },
      }
    );
    ref.current.value = "";
    ref.current.focus();
    getAllTask();
  } catch (error) {
    alert(error);
  }
}

// ///////// xoa task
export async function deleteTask(id, getAllTask) {
  const auth = getLocalStored("auth");

  try {
    await axiosClient.delete("task/" + id, {
      headers: { Authorization: "Bearer " + auth.token },
    });
    getAllTask();
  } catch (error) {
    alert(error);
  }
}

export async function getAllTask(setState, limit, skip) {
  const params = {
    limit,
    skip:(skip -1)*limit,
  };
  console.log(skip)
  const auth = getLocalStored("auth");

  try {
    const res = await axiosClient.get("task", {
      headers: { Authorization: "Bearer " + auth.token },
      params,
    });
    setState(res.data.data);
  } catch (error) {
    alert(error);
  }
}

export function panigiHi(set, value) {
  function next() {
    set(value + 1);
  }
  function pre() {
    if (value === 1) {
      return;
    } else {
      set(value - 1);
    }
  }

  return { next, pre };
}
