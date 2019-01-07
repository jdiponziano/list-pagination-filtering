/******************************************
List Filter and Pagination
******************************************/
   
const pageContainer = document.querySelector('.page');
const classList = document.querySelector('.student-list');
const students = document.getElementsByClassName('student-item');


const showPage = (list, page) => {
  let max = page * 10;
  let min = max - 10;
  for (let i = min; i <= max; i++) {
    console.log(list[i]);
  }
}

const appendPageLinks = (list) => {
  let pages = Math.ceil(list.length / 10);
  let div = document.createElement('div');
  div.classList.add('pagination');
  let ul = document.createElement('ul');
  for (let i = 1; i <= pages; i++) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.textContent = i;
    li.appendChild(a);
    ul.appendChild(li);
  }
  div.appendChild(ul);
  pageContainer.appendChild(div);
}