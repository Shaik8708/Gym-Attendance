let rowData;
let columnDefs;
let gridOptions;
let gridApi;
fetch("http://localhost:3000/gymUser?status=inactive")
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
      ele.phone = parseInt(ele.phone);
    });

    columnDefs = [
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Email", field: "email", sortable: true, filter: true },
      { headerName: "Phone", field: "phone", sortable: true },
      { headerName: "Age", field: "age", sortable: true },
      { headerName: "Address", field: "address", sortable: true },
      { headerName: "Code", field: "gymmerId", sortable: true },
      { headerName: "Gender", field: "gender", sortable: true, filter: true },
      {
        headerName: "DOB",
        field: "dob_str",
        sortable: true,
        // filter: "agDateColumnFilter",
        // filterParams: {
        //   comparator: function (filterLocalDateAtMidnight, cellValue) {
        //     const dateAsString = cellValue;
        //     const dateParts = dateAsString.split("/");
        //     const cellDate = new Date(
        //       Number(dateParts[2]),
        //       Number(dateParts[1]) - 1,
        //       Number(dateParts[0])
        //     );

        //     if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        //       return 0;
        //     }

        //     if (cellDate < filterLocalDateAtMidnight) {
        //       return -1;
        //     }

        //     if (cellDate > filterLocalDateAtMidnight) {
        //       return 1;
        //     }
        //   },
        // },
      },
      {
        headerName: "Membership Start",
        field: "mstart_str",
        sortable: true,
        // filter: "agDateColumnFilter",
      },
      {
        headerName: "Membership End",
        field: "mend_str",
        sortable: true,
        // filter: "agDateColumnFilter",
      },
      {
        headerName: "Actions",
        field: "total",
        cellRenderer: UpdateCellRenderer,
        width: 120,
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

  fetch("http://localhost:3000/gymUser?status=inactive&name=" + name)
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

function editInactiveForm(rowToEdit) {
  let mStart = new Date(Math.round(Number(rowToEdit.membershipStart * 1000)));
  let mEnd = new Date(Math.round(Number(rowToEdit.membershipEnd * 1000)));
  let formattedStartDate = mStart.toISOString().substring(0, 10);
  let formattedEndDate = mEnd.toISOString().substring(0, 10);
  document.getElementById("name").value = rowToEdit.name;
  document.getElementById("phone").value = rowToEdit.phone;
  document.getElementById("email").value = rowToEdit.email;
  document.getElementById("age").value = rowToEdit.age;
  document.getElementById("code").value = rowToEdit.gymmerId;
  document.getElementById("address").value = rowToEdit.address;
  document.getElementById("m_start").value = formattedStartDate;
  document.getElementById("m_end").value = formattedEndDate;
}

function updateInactiveUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let age = document.getElementById("age").value;
  let address = document.getElementById("address").value;
  let m_start = document.getElementById("m_start").value;
  let m_end = document.getElementById("m_end").value;

  console.log(name, age, address, m_start, m_end);

  const updatedData = {
	"name": name,
	"age": age,
	"address": address,
	"membershipStart": new Date(m_start).getTime() / 1000,
	"membershipEnd": new Date(m_end).getTime() / 1000
}

  fetch("http://localhost:3000/gymUser/update/"+email, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
        if(response.ok){
            response.json();
            $('#exampleModal').hide();
            location.reload()
        }else{
            $('#exampleModal').hide();
            alert("there was an error while updating")
        }
    })
    .then((json) => console.log(json));
}
