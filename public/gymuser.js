let gymLogin = document.getElementById("gymLogin");
let successMessageElement = document.getElementById("successMessage");
let errorMessageElement = document.getElementById("errorMessage");

gymLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    var gymmerIdValue = document.getElementById('gymmerId').value;
    // console.log(gymmerIdValue);

    const apiUrl = `http://localhost:3000/api/gymUser/${gymmerIdValue}`;
    const postApiUrl = 'http://localhost:3000/api/history/post';
    fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.gymmerId) {
                // console.log(data, 'data');
                successMessageElement.textContent = 'Successfully submitted';
                errorMessageElement.textContent = '';
                setTimeout(() => {
                    successMessageElement.textContent = '';
                    errorMessageElement.textContent = '';
                    document.getElementById('gymmerId').value = ""
                    // cache_clear()
                  }, 2000);

                const postData = {
                    name: data.name,
                    gymmerId: data.gymmerId,
                    time: new Date()
                };
                fetch(postApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(data => {
                        console.log('API response:', data);

                    })
                    .catch(error => {
                        console.error('Error:', error.message);
                    });
            }


            // Perform any further processing here
        })
        .catch(error => {
            console.error('Error:', error.message);
            successMessageElement.textContent = '';
            errorMessageElement.textContent = 'Invalid gymmerId';
            setTimeout(() => {
                successMessageElement.textContent = '';
                errorMessageElement.textContent = '';
                document.getElementById('gymmerId').value = ""
              }, 2000);
        });
});
