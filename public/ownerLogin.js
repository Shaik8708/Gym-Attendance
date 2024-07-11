let ownerLogin = document.getElementById("ownerLoginId");

ownerLogin.addEventListener("submit", (ele) => {
  ele.preventDefault();
  
  let email = document.getElementById("ownerEmail").value;
  let pass = document.getElementById("ownerPassword").value;
  let data = []; 

  fetch("http://localhost:3000/owner/search/" + email, {
    method: 'GET',
    headers: new Headers({
       'Content-Type':'application/json',
    })
  })
    .then((response) => response.json())
    .then(async (json) => {
      data = json; 
      if(data != null || undefined){
          if(pass == data.password){
            console.log('correct');
            localStorage.setItem("loggedIn", true)
            localStorage.setItem('email', email)
            window.location.href = "./ownerDashboard.html";
          }else{
            console.error("wrong password");
          }
      }else {
        console.error("Email is not registered");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
