// function getlist(num){
//       fetch(`http://localhost:3000/api/list/${num}`)
//            .then(response => response.json)
//            .then( (data) => {
//             let task = data.map(list => {
//                 return `<div>${list.task}</div>`
//             }).join(' ')
//             document.querySelector('.todolist').innerHTML = task

//         })
// }

// fetch('http://localhost:3000/api/user')
// .then(response => {
//     if(!response.ok){
//         throw Error('error')
//      } return response.json()})
// .then((data) => {
//     console.log(data)

//     let html = data.map(user =>{
//         return `<option value=${user.id} class="opt">${user.username}</option>`

//     }).join(' ')
//     console.log(html)

//     document.querySelector('#user').innerHTML = html;

// })
// .then(() =>{
//     let btn = document.querySelector('.btn')
//     let option = document.getElementById('user').value
//     btn.addEventListener('click',getlist(option))

//     })

// function change(){
//     let option = document.getElementById('user').value
//     console.log(option)
// }
// function getuser(){
//     fetch('http://localhost:3000/api/user')
//     .then(res => res.json())
//     .then(data => {
//         let user = data.map(user => {
//             return `<option class='opt' value=${user.id}>${user.username}</option>`

//         }).join(' ')
//         let select = document.querySelector('#user')
//         select.innerHTML = user
//     })
// }
// getuser()

// function change(){
//    let option = document.getElementById('user').value
//     console.log(option)
// }

// function getlist(num){
//     fetch(`http://localhost:3000/api/list/${num}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         let task = data.map(list => {
//             return `<li class='list value='${list.list_id}'>${list.task}</li>`
//         }).join(' ')
//         console.log(task)
//         let ul = document.querySelector('.listItems')
//         ul.innerHTML = task
//         console.log(ul)
//     })
// }
// function onlist(){
// let option = document.querySelector('.opt')
// console.log(option)
// let btn = document.querySelector('.btn')
// btn.addEventListener('click', getlist(option))

// }
let btn = document.querySelector(".btn");
let options;
btn.addEventListener("click", getlist);

async function getuser() {
  const result = await fetch("https://morning-fortress-69867.herokuapp.com/api/user");
  const data = await result.json();
  data.forEach((element) => {
    userinoptions(element);
    userlist(element);
  });
}

function userinoptions(arr) {
  let userupdate = document.getElementById("userstoupdate");
  let option = document.createElement("option");
  option.className = "opt";
  option.classList.add(arr.id);
  option.value = arr.id;
  option.id = arr.id;
  option.innerText = arr.username;

  userupdate.append(option);
}
function userlist(arr) {
  let select = document.getElementById("user");

  let option = document.createElement("option");
  option.className = "opt";
  option.classList.add(arr.id);
  option.value = arr.id;
  option.id = arr.id;
  option.innerText = arr.username;
  select.append(option);
}

async function getlist(event) {
  let ul = document.querySelector(".listItems");
  ul.innerHTML = "";
  const user = document.getElementById("user").value;
  let result = await fetch(`https://morning-fortress-69867.herokuapp.com/api/list/${user}`);
  let data = await result.json();
  data.forEach((elm) => {
    createDataLi(elm);
  });
}

function createDataLi(arr) {
  let ul = document.querySelector(".listItems");
  let li = document.createElement("li");
  li.className = "list";
  li.value = arr.list_id;
  li.innerText = arr.task;
  let update = document.createElement("button");
  let deletebtn = document.createElement("button");
  deletebtn.innerText = "Delete";
  deletebtn.value = arr.list_id;
  deletebtn.className = "delete";
  li.appendChild(deletebtn);
  ul.appendChild(li);
  deletebtn.addEventListener("click", deletetask);
}
getuser();

let newuserbtn = document.querySelector(".newuser");
newuserbtn.addEventListener("click", createUser);

async function createUser() {
  let newuser = document.getElementById("newuser").value;
  let data = { username: `${newuser}` };
  let method = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let post = await fetch("https://morning-fortress-69867.herokuapp.com/api/user", method);
  let response = await post.json();
  console.log(response);
  newuser = "";
  let li = document.querySelectorAll('.opt')
  
  for (let index = 0; index < li.length; index++) {
      let element = li[index];
      element.remove()
     
  }
  getuser()
}
let post = document.getElementById("post");
post.addEventListener("click", posttask);
async function posttask() {
  let newtask = document.getElementById("newtask");
  let user = document.getElementById("user").value;
  let data = { task: `${newtask.value}`, userid: `${user}` };
  let method = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let post = await fetch("https://morning-fortress-69867.herokuapp.com/api/list", method);
  let response = await post.json();
  console.log(response);
  newtask.value = "";
}

async function deletetask(e) {
  let task = e.target.value;
  let data = { list_id: `${task}` };
  let method = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };
  let post = await fetch("https://morning-fortress-69867.herokuapp.com/api/list", method);
  let response = await post.json();
  console.log(response);
}

let updatebtn = document.getElementById("update");
updatebtn.addEventListener("click", updateUser);

async function updateUser() {
  let user = document.getElementById("userstoupdate");
  let option = document.getElementsByClassName('opt');
  let newname = document.getElementById("newname");
  
  let data = { username: newname.value, id: user.value };
  
  let method = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    newname.value = "";
    let update = await fetch("https://morning-fortress-69867.herokuapp.com/api/user", method);
    let response = await update.json();
    console.log(response);
    for (let index = 0; index < option.length; index++) {
      option[index].remove();
    }
    getuser()
}
let deleteusers = document.getElementById('deleteUser')
deleteusers.addEventListener('click',deleteuser)
async function deleteuser(){
    let id = document.getElementById('userstoupdate').value
    let data = { id: `${id}` };
    let method = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    };
    let post = await fetch("https://morning-fortress-69867.herokuapp.com/api/user", method);
    let response = await post.json();
    console.log(response);
    let li = document.querySelectorAll('.opt')
  
    for (let index = 0; index < li.length; index++) {
        let element = li[index];
        element.remove()
       
    }
    getuser()
}