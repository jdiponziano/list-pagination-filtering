/******************************************
List Filter and Pagination
******************************************/

document.addEventListener('DOMContentLoaded', () => {
  //Declare program variables
  const pageContainer = document.querySelector('.page');
  const classList = document.querySelector('.student-list');
  const students = classList.children;

  const div = document.createElement('div');
  const ul = document.createElement('ul');

  //Show/hide page items in relation to page selected
  const showPage = (list, page) => {
    const max = page * 10;
    const min = max - 10;
    for (let i = 0; i < list.length; i++) {
      const li = list[i];
      if( i >= min && i < max ) {
        li.style.display = 'block';
      } else {
        li.style.display = 'none';
      }
    }
  }

  //Construct html of pagination link
  const createLink = text => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.textContent = text;
    li.appendChild(a);
    ul.appendChild(li);
  }

  //Add pagination links to page
  const appendPageLinks = (list) => {
    const pages = Math.ceil(list.length / 10);
    div.classList.add('pagination');
    for (let i = 1; i <= pages; i++) {
      createLink(i);
    }
    div.appendChild(ul);
    pageContainer.appendChild(div);
  }

  //Initialize pagination on page load
  showPage(students, 1);
  appendPageLinks(students);

  //Add event listener to pagination links
  document.querySelector('.pagination').addEventListener('click', (e) => {
    e.preventDefault();
    const pageNumber = parseInt(e.target.textContent);
    showPage(students, pageNumber);
  })
});