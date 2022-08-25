import "./Table.css";

function Table({ jobs, onDelete, onChangeStatus }) {
  const colName = ["ID", "CONTENT", "DATELINE", "ACTION", "STATUS"];

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
                <td>{item.description}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button
                    onClick={() => onDelete(idDelete)}
                    style={{
                      backgroundColor: "#de1738",
                      borderRadius: 10,
                      color: "white",
                    }}>
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

export default Table;
