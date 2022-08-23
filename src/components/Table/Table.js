import React, { useEffect, useState } from "react";
import "./Table.css";
import { axiosClient } from "../axios";

function Table({ job, onDelete, auth }) {
  const colName = ["ID", "CONTENT", "DATELINE", "ACTION"];
  const [data, setData] = useState([])
   
    useEffect(() => {
      async function getData() {
    try {
      const res = await axiosClient.get('task',
      { headers:{Authorization:`Bearer ${auth.token}`}},)
      console.log(res)
      setData(res.data.data)
    } catch (error) {
        alert(error)
    }}
    getData()
    },[job])
    
    
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
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.description}</td>
                <td>{item.createdAt}</td>
                <td style={{
                    display: "flex",
                    alighItem: "center",
                    gap: "20px",
                    justifyContent: "center",
                  }}>
                  <button
                    onClick={() => onDelete(index)}
                    style={{
                      backgroundColor: "#de1738",
                      borderRadius: 10,
                      color: "white",
                    }}>
                    DELETE
                  </button>
                  <input type='checkbox' style={{ width: '30px', height: '30px'} }/>
                </td>
              </tr>
            );
          })}
        </table>
      </body>
     
    </div>
  );
}

export default Table;
