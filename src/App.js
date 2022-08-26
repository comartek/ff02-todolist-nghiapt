import "./App.css";
import { useEffect, useRef, useState } from "react";
import TableTask from "./components/Table/Table";

import { getLocalStored } from "./components/localStored";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllTask,
  createTask,
  deleteTask,
  handleChangeStatus,
  panigiHi,
  handleEdit,
} from "./service/task";
import { handleLogout, handleDeleteUser } from "./service/user";
import { getImage, handleDeleteImage } from "./service/image";
import Loading from "./components/loadingScreen/loadingScreen";



function App() {
  const auth = getLocalStored("auth");
  const user = auth?.user;
  const [load, setLoad] = useState(false)
  ///////////////
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState([]);
  const ref = useRef(null);
  const limit = 10;

  // const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const skip = (page - 1) * limit;
  const navigate = useNavigate();

  // task
  /// dat trang
  const panigi = () => {
    function pre() {
      panigiHi(setPage, page).pre();
    }
    function next() {
      panigiHi(setPage, page).next();
    }

    return { next, pre };
  };
  ////////
  ///// thay doi trang thai
  const handleChangeStatusHai = (e, id) => {
    handleChangeStatus(e, id, () => getAllTask(setJobs, setLoad, limit, skip));
  };
  //////
  //// xoa task
  const deleteTaskHai = (id) => {
    setLoad(true)
    deleteTask(id,setLoad, () => getAllTask(setJobs, setLoad, limit, skip));
  };
  //////
  ///// tao task moi tu input
  const createTaskHai = () =>
    createTask(job, ref, () => getAllTask(setJobs, setLoad, limit, skip));
  ///////
  ////// edit task

  function onEdit(i, job) {
    setLoad(true)
    handleEdit(job, i,setLoad, () => getAllTask(setJobs, setLoad, limit, skip));
  }
  // const onEditJob = () => HandleUpdateJop();

  function handleChange(e) {
    setJob(e.target.value);
  }
  useEffect(() => {
    getAllTask(setJobs, setLoad, limit, skip);
    setLoad(true)
  }, [page]);
  //////////////////////
  ////// logout user

  const handleLogoutHai = () => {
    handleLogout(navigate);
  };
  /////////
  ///// delete user
  const handleDeleteUserHai = () => {
    handleDeleteUser(navigate);
  };

  //////////////////////
  //// get image from API and delete image
  const [image, setImage] = useState();
  //
  const handleDeleteImageHai = () => {
    handleDeleteImage(() => getImage(setImage));
  };
  useEffect(() => {
    getImage(setImage);
  }, []);
  ///////////////

  return (
    <div className="App">
      
      <h1>TODOLISH for {user ? user?.email : null} </h1>
      
      <img
        src={image}
        style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
      />
      <br />
      <button style={{ marginTop: 20 }} onClick={handleDeleteImageHai}>
        Delete Image
      </button>
      <br />
      <br />
      <button style={{ marginBottom: 30 }} onClick={handleLogoutHai}>
        logout
      </button>
      <button
        style={{ marginBottom: 30, marginLeft: 20 }}
        onClick={handleDeleteUserHai}>
        Delete User
      </button>
      <Link to="/update">
        <button style={{ marginBottom: 30, marginLeft: 20 }}>
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

      <button style={{ marginLeft: 20 }} onClick={createTaskHai}>
        ADD
      </button>
      <TableTask
        onDelete={deleteTaskHai}
        jobs={jobs}
        onChangeStatus={handleChangeStatusHai}
        onEdit={onEdit}
        
      />
      

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "50px",
        }}>
        <button onClick={() => panigi().pre()}>Back</button>
        <p>Page {page}</p>
        <button onClick={() => panigi().next()}>Next</button>
      </div>
      <Loading load={load}/>
    </div>
  );
}

export default App;
