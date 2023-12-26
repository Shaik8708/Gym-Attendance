let rowData;
let columnDefs;
let gridOptions;
let gridApi;
fetch("http://localhost:3000/api/gymUser?status=inactive")
  .then((response) => response.json())
  .then(async (json) => {
    data = json;

    rowData = data;
    rowData.forEach((ele) => {
      ele.date_to_str_mrthod = (d1) => {
        const date = new Date(d1 * 1000);
        const month = date.getMonth() + 1;
        return `${date.getDate()}/${month}/${date.getFullYear()}`;
      };
    });
    rowData.forEach((ele) => {
      ele.dob_str = ele.date_to_str_mrthod(ele.dob);
      ele.mstart_str = ele.date_to_str_mrthod(ele.membershipStart);
      ele.mend_str = ele.date_to_str_mrthod(ele.membershipEnd);
      ele.phone = parseInt(ele.phone)
    });

    columnDefs = [
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Email", field: "email", sortable: true, filter: true },
      { headerName: "Phone", field: "phone", sortable: true, filter: "agNumberColumnFilter" },
      { headerName: "Gender", field: "gender", sortable: true, filter: true },
      {
        headerName: "DOB",
        field: "dob_str",
        sortable: true,
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            const dateAsString = cellValue;
            const dateParts = dateAsString.split("/");
            const cellDate = new Date(
              Number(dateParts[2]),
              Number(dateParts[1]) - 1,
              Number(dateParts[0])
            );

            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
              return 0;
            }

            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }

            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          },
        },
      },
      {
        headerName: "Membership Start",
        field: "mstart_str",
        sortable: true,
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Membership End",
        field: "mend_str",
        sortable: true,
        filter: "agDateColumnFilter",
      },
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
  let name = document.getElementById("searchInactive").value;

  fetch("http://localhost:3000/api/gymUser?status=inactive&name=" + name)
    .then((response) => response.json())
    .then((json) => {
    
        json.forEach((ele) => {
            ele.date_to_str_mrthod = (d1) => {
              const date = new Date(d1 * 1000);
              const month = date.getMonth() + 1;
              return `${date.getDate()}/${month}/${date.getFullYear()}`;
            };
          });
          json.forEach((ele) => {
            ele.dob_str = ele.date_to_str_mrthod(ele.dob);
            ele.mstart_str = ele.date_to_str_mrthod(ele.membershipStart);
            ele.mend_str = ele.date_to_str_mrthod(ele.membershipEnd);
          });
      gridApi.setGridOption("rowData", json);
    });
}
