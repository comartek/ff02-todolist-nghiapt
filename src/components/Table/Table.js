import React from "react";
import "./Table.css";

function Table({ jobs, onDelete }) {
  const colName = ["ID", "CONTENT", "DATELINE", "ACTION"];

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
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.content}</td>
                <td>{item.dateline}</td>
                <td >
                  <button
                    onClick={() => onDelete(index)}
                    style={{
                      backgroundColor: "#de1738",
                      borderRadius: 10,
                      color: "white",
                    }}>
                    DELETE
                  </button>
                  <input type='checkbox' style={{ with: 13, height: 13}}/>
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
