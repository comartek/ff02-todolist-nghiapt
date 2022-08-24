import "./App.css";
import { useEffect, useRef, useState } from "react";
import Table from "./components/Table/Table";
import { getLocalStored, deleteLocalStored } from "./components/localStored";
import { useNavigate, Link } from "react-router-dom";
import { axiosClient,  } from "./components/axios";

function App() {
  const auth = getLocalStored("auth");
  const user = auth?.user;
  ///////////////
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState([]);
  const ref = useRef(null);

  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(1);
  const navigate = useNavigate();


  // function chuyen trang + render ra bang moi

  function panigi() {
    function next() {
      setSkip(skip + 1);
    }
    function pre() {
      if (skip === 1) {
        return;
      } else {
        setSkip(skip - 1);
      }
    }

    return { next, pre };
  }

  async function getAllTask() {
    const params = {
      limit,
      skip,
    };
    try {
      const res = await axiosClient.get("task", {
        headers: { Authorization: "Bearer " + auth.token },
        params,
      });
      setJobs(res.data.data);
      
    } catch (error) {
      alert(error);
    }
  }
  ////////////
  ///////// xoa task
  async function deleteTask(idDelete) {
    try {
      await axiosClient.delete("task/" + idDelete, {
        headers: { Authorization: "Bearer " + auth.token },
      });
      getAllTask();
    } catch (error) {
      alert(error);
    }
  }
  /////////////////
  //////// tao task moi va render lai toan bo task
  async function createTask() {
    if (job === "") {
      return;
    }
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
  ///////////////// add job

  function handleChange(e) {
    setJob(e.target.value);
  }
  /////////
  ////// logout
  async function handleLogout() {
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
  /////////

  // doi trang va render bang moi ngay tu dau tu API
  useEffect(() => {
    getAllTask();
  }, [skip]);
//////////////////////
//// get image from API 
const [image, setImage] = useState()
async function getImage() {
  try {
    const res = await axiosClient.get(`user/${user._id}/avatar`);
    setImage(res.request.responseURL)
    console.log(res.request.responseURL)
  } catch (error) {
    setImage([])
  }
}
useEffect(() => {
  getImage();
}, []);
///////////////////
//// delete image 
async function handleDeleteImage () {
  try {
    await axiosClient.delete("user/me/avatar", {
      headers: { Authorization: "Bearer " + auth.token },
    });
    getImage();
    console.log('aaa')
  } catch (error) {
    alert(error);
  }
}
////////////////////
///// delete user 
async function handleDeleteUser() {
  try {
    await axiosClient.delete(
      "user/me",
      
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
  return (
    <div className="App" >
      <h1>TODOLISH for {user ? user?.email : null} </h1>
      
      <img src={image}/>
      <br />
      <button onClick={handleDeleteImage}>Delete Image</button>
      <br />
      <br />
      <button style={{ marginBottom: 30 }} onClick={handleLogout}>
        logout
      </button>
      <button style={{ marginBottom: 30, marginLeft: 20 }} onClick={handleDeleteUser}>
      Delete User
      </button>
      <Link to='/update' >
        <button style={{ marginBottom: 30, marginLeft: 20 }} >
      Update User Profile
      </button>
      </Link>
      
      <br />
      <input
        name="content"
        type="text"
        placeholder="thêm công việc..."
        onChange={handleChange}
        ref={ref}
      />

      <button style={{ marginLeft: 20 }} onClick={createTask}>
        ADD
      </button>
      <Table onDelete={deleteTask} jobs={jobs} />

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "50px",
        }}>
        <button onClick={() => panigi().pre()}>lui</button>
        <p>Page {skip}</p>
        <button onClick={() => panigi().next()}>tien</button>
      </div>
    </div>
  );
}

export default App;
