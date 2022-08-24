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
            let idDelete = item._id;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.description}</td>
                <td>{item.createdAt}</td>
                <td
                  style={{
                    display: "flex",
                    alighItem: "center",
                    gap: "20px",
                    justifyContent: "center",
                  }}>
                  <button
                    onClick={() => onDelete(idDelete)}
                    style={{
                      backgroundColor: "#de1738",
                      borderRadius: 10,
                      color: "white",
                    }}>
                    DELETE
                  </button>
                  <input
                    type="checkbox"
                    style={{ width: "30px", height: "30px" }}
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
