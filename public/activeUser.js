document.addEventListener('DOMContentLoaded', function () {
    var gridOptions = {
        columnDefs: [
            {
                headerName: 'Name', field: 'name'
            },
            {
                headerName: 'GymmerId', field: 'gymmerId'
            },
            {
                headerName: 'Phone', field: 'phone'
            },
            {
                headerName: 'Email', field: 'email'
            },
            {
                headerName: 'Age', field: 'age'
            },
            {
                headerName: 'Date of Birth', field: 'dob'
            },
            {
                headerName: 'Gender', field: 'gender'
            },
            {
                headerName: 'Address', field: 'address'
            },
            {
                headerName: 'Membership Start', field: 'membershipStart', valueFormatter: function (params) {
                    // Convert epoch time to a human-readable date
                    var epochTime = params.value;
                    var date = new Date(epochTime * 1000); // Convert seconds to milliseconds
                    return date.toLocaleString(); // Adjust formatting as needed
                },
            },
            {
                headerName: 'Membership End', field: 'membershipEnd', valueFormatter: function (params) {

                    var epochTime = params.value;
                    var date = new Date(epochTime * 1000);
                    return date.toLocaleString();
                },
            },
            {
                headerName: 'Actions', field: 'value', cellRenderer: UpdateCellRenderer
            },

        ],

        // defaultColDef: {
        //     flex: 1,
        //     resizable: true,
        // },
    };

    var eGridDiv = document.querySelector('#myGrid');
    // Create an AG-Grid instance with the provided options
    var grid = new agGrid.Grid(eGridDiv, gridOptions);

    const apiUrl = "http://localhost:3000/api/gymUser?status=active";

    // Fetch data from the API and update the AG-Grid instance
    function fetchData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                gridOptions.api.setRowData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }


    // Search function with debounce
    window.performSearch = function () {
        var search = document.getElementById('searchInput').value.trim();
        const searchUrl = `http://localhost:3000/api/gymUser?status=active&name=${search}`;
        fetchData(searchUrl);
    };

    // Fetch initial data
    fetchData(apiUrl);
});


function editForm(rowToEdit) {
    let startDate = rowToEdit.membershipStart;
    let endDate = rowToEdit.membershipEnd;
    let mstartDate = new Date(startDate * 1000);
    let mendDate = new Date(endDate * 1000)
    let formattedStartDate = mstartDate.toISOString().split('T')[0];
    let formattedEndDate = mendDate.toISOString().split('T')[0];
    document.getElementById('name').value = rowToEdit.name;
    document.getElementById('email').value = rowToEdit.email;
    document.getElementById('phone').value = rowToEdit.phone;
    document.getElementById('age').value = rowToEdit.age;
    document.getElementById('address').value = rowToEdit.address;
    document.getElementById('code').value = rowToEdit.gymmerId;
    document.getElementById('m_start').value = formattedStartDate;
    document.getElementById('m_end').value = formattedEndDate;
}

function updateActiveUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById("email").value;
    let age = document.getElementById('age').value;
    let address = document.getElementById('address').value;
    let mStart = document.getElementById('m_start').value;
    let mEnd = document.getElementById('m_end').value;

    let postData = {
        name: name,
        age: age,
        address: address,
        mStart: mStart,
        mEnd: mEnd
    }
    const postUrl = "http://localhost:3000/api/gymUser/update/" + email;

    fetch(postUrl, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => {
            if (response.ok) {
                response.json();
                $('#exampleModal').hide();
                location.reload()
            } else {
                $('#exampleModal').hide();
                alert("there was an error while updating")
            }
        })
        .then((json) => console.log(json));
}
