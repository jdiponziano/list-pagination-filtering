/******************************************
List Filter and Pagination
******************************************/

document.addEventListener('DOMContentLoaded', () => {
  //Declare program variables
  const pageContainer = document.querySelector('.page');
  const pageHeader = document.querySelector('.page-header');
  const classList = document.querySelector('.student-list');
  const students = classList.children;

  //Show/hide page items in relation to page selected
  const showPage = (list, page) => {
    const max = page * 10;
    const min = max - 10;
    for (let i = 0; i < list.length; i++) {
      const li = list[i];
      if (i >= min && i < max) {
        li.style.display = 'block';
      } else {
        li.style.display = 'none';
      }
    }
  }

  //Hide all students
  const hideAllStudents = () => {
    for (let i = 0; i < students.length; i++) {
      const li = students[i];
      li.style.display = 'none';
    }
  }

  //Create new elements helper function
  const createElement = (element, attr, value) => {
    const elem = document.createElement(element);
    elem[attr] = value;
    return elem;
  }

  //Append new elements helper function
  const appendNewElem = (parent, elementName, property, value) => {
    const elem = createElement(elementName, property, value);
    parent.appendChild(elem);
    return elem;
  }

  //Create and add search form to the page
  const createSearchForm = () => {
    const div = createElement('div', 'classList', 'student-search');
    const input = createElement('input', 'type', 'text');
    input.placeholder = 'Search for students...';
    div.appendChild(input);
    appendNewElem(div, 'button', 'textContent', 'Search');
    pageHeader.appendChild(div);
  }

  //Construct html of pagination link
  const createLink = text => {
    const li = document.createElement('li');
    const a = createElement('a', 'textContent', text);
    a.setAttribute('href', '#');
    li.appendChild(a);
    return li;
  }

  //Remove pagination links
  const removePagination = () => {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      pageContainer.removeChild(pagination);
    }
  }

  //Create pagination links
  const createPagination = list => {
    const pages = Math.ceil(list.length / 10);
    removePagination();
    if (pages > 1) {
      const div = createElement('div', 'classList', 'pagination');
      const ul = document.createElement('ul');
      for (let i = 1; i <= pages; i++) {
        const link = createLink(i);
        ul.appendChild(link);
      }
      div.appendChild(ul);
      pageContainer.appendChild(div);
      return div;
    }
  }

  //Add event listener to pagination links
  const appendPageLinks = (list) => {
    const div = createPagination(list);
    div.addEventListener('click', (e) => {
      e.preventDefault();
      const activeLink = e.target;
      if (activeLink.tagName === 'A') {
        const pageNumber = parseInt(activeLink.textContent);
        const links = document.querySelectorAll('.pagination a');
        showPage(list, pageNumber);
        for (let i = 0; i < links.length; i++) {
          if (links[i] == activeLink) {
            links[i].classList.add('active');
          } else {
            links[i].classList.remove('active');
          }
        }
      }
    });
  }

  //Initialize pagination on page load
  createSearchForm();
  showPage(students, 1);
  appendPageLinks(students);


  document.querySelector('input').addEventListener('keyup', function () {
    const inputValue = document.querySelector('input').value;
    const results = [];
    for (let i = 0; i < students.length; i++) {
      const li = students[i];
      const h3 = li.querySelector('h3');
      if (h3.textContent.includes(inputValue)) {
        results.push(li);
      }
    }
    hideAllStudents();
    if (results == 0) {
      removePagination();
      alert('no results');
    } else {
      showPage(results, 1);
      appendPageLinks(results);
    }
  });
});
