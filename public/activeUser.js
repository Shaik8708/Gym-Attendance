let gridApi;
document.addEventListener("DOMContentLoaded", function () {
  let gridOptions = {
    columnDefs: [
      {
        headerName: "Name",
        field: "name",
      },
      {
        headerName: "GymmerId",
        field: "gymmerId",
      },
      {
        headerName: "Phone",
        field: "phone",
      },
      {
        headerName: "Email",
        field: "email",
      },
      {
        headerName: "Age",
        field: "age",
      },
      {
        headerName: "Date of Birth",
        field: "dob",
        valueFormatter: function (params) {
          // Convert epoch time to a human-readable date
          var epochTime = params.value;
          var date = new Date(epochTime * 1000); // Convert seconds to milliseconds
          return date.toLocaleString(); // Adjust formatting as needed
        },
      },
      {
        headerName: "Gender",
        field: "gender",
      },
      {
        headerName: "Address",
        field: "address",
      },
      {
        headerName: "Membership Start",
        field: "membershipStart",
        valueFormatter: function (params) {
          // Convert epoch time to a human-readable date
          var epochTime = params.value;
          var date = new Date(epochTime * 1000); // Convert seconds to milliseconds
          return date.toLocaleString(); // Adjust formatting as needed
        },
      },
      {
        headerName: "Membership End",
        field: "membershipEnd",
        valueFormatter: function (params) {
          var epochTime = params.value;
          var date = new Date(epochTime * 1000);
          return date.toLocaleString();
        },
      },
      {
        headerName: "Actions",
        field: "value",
        cellRenderer: UpdateCellRenderer,
      },
    ],
  };

  let eGridDiv = document.querySelector("#myGrid");
  // Create an AG-Grid instance with the provided options
   gridApi = agGrid.createGrid(eGridDiv, gridOptions);

  const apiUrl = "http://localhost:3000/gymUser?status=active";

  // Fetch data from the API and update the AG-Grid instance
  function fetchData(url) {
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        gridApi.setGridOption('rowData', data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Search function with debounce
  window.performSearch = function () {
    var search = document.getElementById("searchInput").value.trim();
    const searchUrl = `http://localhost:3000/gymUser?status=active&name=${search}`;
    fetchData(searchUrl);
  };

  // Fetch initial data
  fetchData(apiUrl);
});

function editForm(rowToEdit) {
  console.log(rowToEdit);
  let startDate = rowToEdit.membershipStart;
  let endDate = rowToEdit.membershipEnd;
  let mstartDate = new Date(startDate * 1000);
  let mendDate = new Date(endDate * 1000);
  let formattedStartDate = mstartDate.toISOString().split("T")[0];
  let formattedEndDate = mendDate.toISOString().split("T")[0];
  document.getElementById("editName").value = rowToEdit.name;
  console.log();
  document.getElementById("editEmail").value = rowToEdit.email;
  document.getElementById("editPhone").value = rowToEdit.phone;
  document.getElementById("editAge").value = rowToEdit.age;
  document.getElementById("editAddress").value = rowToEdit.address;
  document.getElementById("editCode").value = rowToEdit.gymmerId;
  document.getElementById("editM_start").value = formattedStartDate;
  document.getElementById("editM_end").value = formattedEndDate;
}

function updateActiveUser() {
  let name = document.getElementById("editName").value;
  let email = document.getElementById("editEmail").value;
  let age = document.getElementById("editAge").value;
  let address = document.getElementById("editAddress").value;
  let mStart = document.getElementById("editM_start").value;
  let mEnd = document.getElementById("editM_end").value;

  let putData = {
    name: name,
    age: age,
    address: address,
    mStart: mStart,
    mEnd: mEnd,
  };
  const putUrl = "http://localhost:3000/gymUser/update/" + email;

  fetch(putUrl, {
    method: "PUT",
    body: JSON.stringify(putData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json();
        $("#exampleModal").hide();
        location.reload();
      } else {
        $("#exampleModal").hide();
        alert("there was an error while updating");
      }
    })
    .then((json) => console.log(json));
}

function addActiveUser() {
  let startDate = document.getElementById("m_start").value;
  let endDate = document.getElementById("m_end").value;
  let dateOfBirth = document.getElementById("dob").value;
  let epochStartDate = new Date(startDate).getTime();
  let epochEndDate = new Date(endDate).getTime();
  let sdob = new Date(dateOfBirth).getTime();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let age = document.getElementById("age").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gender = document.getElementById("gender").value;
  let dob = sdob;
  let mStart = epochStartDate;
  let mEnd = epochEndDate;

  let postData = {
    name: name,
    age: age,
    email: email,
    phone: phone,
    address: address,
    gender: gender,
    dob: dob,
    membershipStart: mStart,
    membershipEnd: mEnd,
    isSubscribed: true,
  };

  const postUrl = "http://localhost:3000/gymUser/post";

  fetch(postUrl, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-type": "application/json; chartset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json();
        // fetchData(apiUrl);
        $("#exampleAddModal").hide();
        location.reload();
      } else {
        $("#exampleAddModal").hide();
      }
    })

    .then((json) => {
      console.log(json, "json");
    });
}
