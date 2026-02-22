// Регистрация
function register(username, password){
localStorage.setItem("admin_user", username);
localStorage.setItem("admin_pass", password);
alert("Профилът е създаден!");
}

// Login
function login(){
let u = document.getElementById("username").value;
let p = document.getElementById("password").value;

if(u === localStorage.getItem("admin_user") &&
   p === localStorage.getItem("admin_pass")){
localStorage.setItem("loggedIn", "true");
window.location.href="admin.html";
}else{
alert("Грешни данни");
}
}

// Проверка за достъп
function checkAuth(){
if(localStorage.getItem("loggedIn") !== "true"){
window.location.href="login.html";
}
}

// Logout
function logout(){
localStorage.removeItem("loggedIn");
window.location.href="index.html";
}

// Запазване на кандидатура
function submitApplication(){
let data = {
name: document.getElementById("realname").value,
mc: document.getElementById("mcname").value,
motivation: document.getElementById("motivation").value
};

let apps = JSON.parse(localStorage.getItem("applications") || "[]");
apps.push(data);
localStorage.setItem("applications", JSON.stringify(apps));

alert("Кандидатурата е изпратена!");
document.querySelector("form").reset();
}

// Показване в админ панел
function loadApplications(){
checkAuth();
let apps = JSON.parse(localStorage.getItem("applications") || "[]");
let container = document.getElementById("applications");

container.innerHTML="";
apps.forEach((app,i)=>{
container.innerHTML+=`
<div class="card">
<h3>${app.name}</h3>
<p>Minecraft: ${app.mc}</p>
<p>${app.motivation}</p>
<button onclick="deleteApp(${i})">Изтрий</button>
</div>
`;
});
}

function deleteApp(index){
let apps = JSON.parse(localStorage.getItem("applications"));
apps.splice(index,1);
localStorage.setItem("applications", JSON.stringify(apps));
loadApplications();
}
