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


// Remember to delete the comments that came with this file, and replace them with your own code comments.