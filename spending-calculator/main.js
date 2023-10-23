import '/src/style.scss';

const modal = document.querySelector('.modal');
const showButton = document.getElementById('showModal');
const closeButton = document.getElementById('closeModal');

showButton.addEventListener('click', () => { 
  modal.showModal();
 });

 closeButton.addEventListener('click', () => {
  modal.close();
 });