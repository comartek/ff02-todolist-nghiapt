import { useState } from "react";
import "./Table.css";

function TableTask({ jobs, onDelete, onChangeStatus, onEdit }) {
  const colName = ["ID", "CONTENT", "DATELINE", "ACTION", "STATUS"];

  const [idEdit, setIdEdit] = useState();
  const [updateJob, setUpdateJob] = useState();

  function handleChange(e) {
    setUpdateJob(e.target.value);
  }

  function handleEdit(id) {
    onEdit(id, updateJob);
    setIdEdit("");
    setUpdateJob("");
  }

  return (
    <div>
      <h1 style={{ marginTop: 40 }}>TABLE</h1>
      <body>
        <table style={{ width: "100%" }}>
          <tr>
            {colName.map((headerItem, index) => {
              return (
                <th key={index} style={{ backgroundColor: "#dedede" }}>
                  {headerItem}
                </th>
              );
            })}
          </tr>
          {jobs.map((item, index) => {
            let idDelete = item._id;

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                {idEdit === idDelete ? (
                  <td>
                    <input
                      style={{ color: "black" }}
                      type="text"
                      onChange={handleChange}
                      placeholder="sửa công việc"
                    />
                    <button
                      style={{ marginLeft: 20 }}
                      onClick={() => handleEdit(idDelete)}
                    >
                      SAVE
                    </button>
                  </td>
                ) : (
                  <td> {item.description} </td>
                )}

                <td>{item.createdAt}</td>
                <td>
                  <button
                    onClick={() => setIdEdit(idDelete)}
                    style={{
                      backgroundColor: "lightgreen",
                      borderRadius: 10,
                      color: "white",
                      marginRight: 20,
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => onDelete(idDelete)}
                    style={{
                      backgroundColor: "#de1738",
                      borderRadius: 10,
                      color: "white",
                    }}
                  >
                    DELETE
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    style={{ width: "30px", height: "30px" }}
                    checked={item.completed}
                    onChange={(e) => onChangeStatus(e, idDelete)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </body>
    </div>
  );
}

export default TableTask;
