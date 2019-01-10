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
      if( i >= min && i < max ) {
        li.style.display = 'block';
      } else {
        li.style.display = 'none';
      }
    }
  }

  const createSearchForm = () => {
    const div = document.createElement('div');
    div.classList.add('student-search');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search for students...';
    div.appendChild(input);
    const button = document.createElement('button');
    button.textContent = 'Search';
    div.appendChild(button);
    pageHeader.appendChild(div);
  }

  //Construct html of pagination link
  const createLink = text => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.textContent = text;
    li.appendChild(a);
    return li;
  }

  //Add pagination links to page
  const appendPageLinks = (list) => {
    const pages = Math.ceil(list.length / 10);
    if ( pages > 1) {
      const div = document.createElement('div');
      div.classList.add('pagination');
      const ul = document.createElement('ul');
      for (let i = 1; i <= pages; i++) {
        const link = createLink(i);
        ul.appendChild(link);
      }
      div.appendChild(ul);
      pageContainer.appendChild(div);

      //Add event listener to pagination links
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
  }

  //Initialize pagination on page load
  createSearchForm();
  showPage(students, 1);
  appendPageLinks(students);
  

  document.querySelector('input').addEventListener('keyup', function(){
    const inputValue = document.querySelector('input').value;
    const pagination = document.querySelector('.pagination');
    const searchResults = document.createElement('ul');
    searchResults.classList.add('student-list');
    for (let i = 0; i < students.length; i++) {
      const li = students[i];
        if (li.innerHTML.includes(inputValue)) {
          searchResults.appendChild(li);
        }
      }
    pageContainer.removeChild(classList);
    pageContainer.removeChild(pagination);
    pageContainer.appendChild(searchResults);
    const newList = searchResults.children;
    console.log(newList);
    appendPageLinks(newList);
  });

});
