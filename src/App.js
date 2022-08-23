import "./App.css";
import { useEffect, useRef, useState } from "react";
import Table from "./components/Table/Table";
import { deleteLocalStored, getLocalStored, setLocalStored } from "./components/localStored";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "./components/axios";

function App() {
  // lấy user từ localstored sau nó chọc vào BIẾN email trong đó và lấy chính BIẾN đó làm key để thêm các jobs vào localstored
  const auth = getLocalStored("auth");
  const key = auth?.user?._id;
  const user = auth?.user
  ///////////////
  const [job, setJob] = useState({ content: "", dateline: "" });
  const [jobs, setJobs] = useState(getLocalStored(key) || []);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const navigate = useNavigate();
  /// change job in useState
  const onSubmit = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };
  ///////////
  ////// push job to useState jobs
  const handleJobs = () => {
    if (job.content === "") {
      return;
    }
    if (job.dateline === "") {
      return;
    }
    let arr = jobs;
    setJobs(arr.concat(job));
    setJob({ content: "", dateline: "" });
    ref.current.value = "";
    ref2.current.value = "";
  };
  //////////
  // set jobs in local stored
  useEffect(() => {
    setLocalStored(key, jobs);
    ref.current.focus();
  }, [jobs]);
  /////////////
  // delete job in useSate jobs
  const handleDelete = (index) => {
    let deleteJobs = jobs;
    deleteJobs.splice(index, 1);
    setJobs(deleteJobs.concat());
  };
  ////////
  // logic logout and delete user in localstored

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  const handleLogout = async() => {
    try {
      await axiosClient.post('user/logout',{},{  headers:{Authorization:`Bearer ${auth.token}`}})
      deleteLocalStored('auth');
      navigate("/");  
    } catch (error) {
      alert(error)
    }
    
  };
  /////////////
  return (
    <div className="App">
      <h1>TODOLISH for {user ? user?.email : null} </h1>

      <button style={{ marginBottom: 30 }} onClick={handleLogout}>
        logout
      </button>
      <br />
      <input
        name="content"
        type="text"
        placeholder="thêm công việc..."
        onChange={onSubmit}
        ref={ref}
      />
      <input
        name="dateline"
        style={{ marginLeft: 20 }}
        type="date"
        onChange={onSubmit}
        ref={ref2}
      />
      <button style={{ marginLeft: 20 }} onClick={handleJobs}>
        ADD
      </button>
      <Table jobs={jobs} onDelete={handleDelete} />
    </div>
  );
}

export default App;
