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

