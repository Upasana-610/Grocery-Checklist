let form = document.querySelector("form");
let input = document.querySelector("input");
let listUl = document.querySelector(".list ul");
let clear = document.querySelector(".clear");

let userInput = "";
let items = [];
let ch = [];
let editValue = "";
//
function getValues(e) {
  userInput = e.target.value;
}

function submitForm(e) {
  let clearit = document.getElementsByClassName("clear");
  if (items.length === 0) {
    clearit[0].textContent = "Clear Items";
  }
  e.preventDefault();
  let idx = items.findIndex((item) => item === editValue);
  if (idx !== -1) {
    items.splice(idx, 1, userInput);
    ch.splice(idx, 1, 0);
    input.value = "";
    showItems();
  } else {
    items.push(userInput);
    ch.push(0);
    input.value = "";
    showItems();
  }
}

function showItems() {
  let str = "";
  items.forEach((item) => {
    let idx = items.findIndex((it) => it === item);
    // console.log(ch);
    if (ch[idx] === 0) {
      str += `<li>${item}  <div><i class="fas fa-edit"></i><i class="far fa-clipboard"></i>  <i class="fas fa-trash"></i></div></li>`;
    } else {
      str += `<li>${item}  <div><i class="fas fa-edit"></i><i class="fas fa-clipboard-check"></i>  <i class="fas fa-trash"></i></div></li>`;
    }
  });
  listUl.innerHTML = str;
  let val = document.getElementsByClassName("far");
  for (let i = 0; i < val.length; i++) {
    val[i].style.color = "rgb(123, 189, 25)";
    val[i].style.margin = "5px";
  }
  let val2 = document.getElementsByClassName("fas");
  for (let i = 0; i < val2.length; i++) {
    val2[i].style.color = "rgb(123, 189, 25)";
    val2[i].style.margin = "5px";
  }
  let val3 = document.getElementsByClassName("fa-trash");
  for (let i = 0; i < val3.length; i++) {
    val3[i].style.color = "red";
    val3[i].style.margin = "5px";
  }

  let val4 = document.getElementsByClassName("fa-edit");
  for (let i = 0; i < val4.length; i++) {
    val4[i].style.color = "goldenrod";
    val4[i].style.margin = "5px";
  }
  console.log(ch);
}

/* <i class="fas fa-clipboard-check"></i> 
<i class="fas fa-trash"></i> */
function checklist(e) {
  if (e.target.classList.contains("fa-clipboard") === true) {
    e.target.classList.remove("fa-clipboard");
    e.target.classList.remove("far");
    e.target.classList.add("fa-clipboard-check");
    e.target.classList.add("fas");
    let i = e.target.parentElement;
    let li = i.parentElement;
    let content = li.textContent;
    let idx = items.findIndex((item) => item === content.trim());
    if (ch[idx] === 0) {
      ch.splice(idx, 1, 1);
    }
  } else if (e.target.classList.contains("fa-clipboard-check") === true) {
    e.target.classList.add("far");
    e.target.classList.add("fa-clipboard");
    e.target.classList.remove("fa-clipboard-check");
    e.target.classList.remove("fas");
    let i = e.target.parentElement;
    let li = i.parentElement;
    let content = li.textContent;
    let idx = items.findIndex((item) => item === content.trim());
    if (ch[idx] === 1) {
      ch.splice(idx, 1, 0);
      // ch[idx] = 0;
    }
  } else if (e.target.classList.contains("fa-trash") === true) {
    let i = e.target.parentElement;
    let li = i.parentElement;
    listUl.removeChild(li);
    let content = li.textContent;
    let idx = items.findIndex((item) => item === content);
    items.splice(idx, 1);
    ch.splice(idx, 1);
  } else if (e.target.classList.contains("fa-edit") === true) {
    let i = e.target.parentElement;
    let li = i.parentElement;
    let content = li.textContent;
    input.value = content.trim();
    editValue = content.trim();
  }
}

function clearItems() {
  items = [];
  ch = [];
  let clearit = document.getElementsByClassName("clear");
  if (items.length === 0) {
    clearit[0].textContent = "No Items";
  }
  showItems();
}

//
form.addEventListener("change", getValues);
form.addEventListener("submit", submitForm);
listUl.addEventListener("click", checklist);
clear.addEventListener("click", clearItems);
