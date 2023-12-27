let rowData;
let columnDefs;
let gridOptions;
let gridApi;
fetch("http://localhost:3000/api/history/getAll")
  .then((response) => response.json())
  .then(async (json) => {
    data = json;

    rowData = data;
    rowData.forEach((ele) => {
      ele.date_to_str_mrthod = (d1) => {
        const date = new Date(d1 * 1000);
        const month = date.getMonth() + 1;
        return `${date.getDate()}/${month}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;  
      };
    });
    rowData.forEach((ele) => {
      ele.time_str = ele.date_to_str_mrthod(ele.time);
    });

    columnDefs = [
      { headerName: "Name", field: "name", sortable: true, filter: true, width: 380 },
      { headerName: "Code", field: "gymmerId", sortable: true, filter: true, width: 350 },
      { headerName: "Login Time", field: "time_str", sortable: true, width: 350 },
      
    ];

    gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
    };
    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
  })
  .catch((error) => {
    console.error(error);
  });

function searchName() {
  let name = document.getElementById("nameText").value;
  fetch("http://localhost:3000/api/history/search/" + name)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
      json.forEach((ele) => {
        ele.date_to_str_mrthod = (d1) => {
          const date = new Date(d1 * 1000);
          const month = date.getMonth() + 1;
          return `${date.getDate()}/${month}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        };
      });
      json.forEach((ele) => {
        ele.time_str = ele.date_to_str_mrthod(ele.time);
      });
      gridApi.setGridOption("rowData", json);
    });
}
