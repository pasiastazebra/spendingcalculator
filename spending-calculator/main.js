import '/src/style.scss';

//* modal scripts 

const modal = document.querySelector('.modal');
const showButton = document.getElementById('showModal');
const closeButton = document.getElementById('closeModal');
const clearButton = document.getElementById('clearModal');

showButton.addEventListener('click', () => { 
  modal.showModal();
});

closeButton.addEventListener('click', () => {
  modal.close();
});

//* adding new entries

const titleInput = document.getElementById('titleField');
const expanseInput = document.getElementById('expanseField');
const addButton = document.getElementById('formAddButton');

const entries = JSON.parse(localStorage.getItem('entries')) || [];


addButton.addEventListener('click', () => {
  const lastEntry = entries[entries.length - 1];

  event.preventDefault(); //!bugged style, have to fix it
  entries.push({
    ID: lastEntry ? lastEntry.ID + 1 : 1, //!not working right now
    title: titleInput.value,
    ammount: expanseInput.value
  });

  localStorage.setItem('entries', JSON.stringify(entries));
  renderModalContent();
});

clearButton.addEventListener('click', () => {
  localStorage.clear();
  entries.length = 0;
  renderModalContent();
  modal.close();
  alert('All entries cleared!');
  titleInput.value = '';
  expanseInput.value = '';
});

const renderEntry = (ID, title, ammount) => {
  const entryDiv = document.createElement('div');
  entryDiv.classList.add('modal-content-entry');

  const entryID = document.createElement('p');
  entryID.innerText = ID;

  const entryTitle = document.createElement('p');
  entryTitle.innerText = title;

  const entryAmmount = document.createElement('p');
  entryAmmount.innerText = ammount;

  entryDiv.appendChild(entryID);
  entryDiv.appendChild(entryTitle);
  entryDiv.appendChild(entryAmmount);

  return entryDiv;
}

const renderModalContent = () => {
  const modalContent = document.querySelector('.modal-content-table');
  
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }

  for (let i = 0; i < entries.length; i++) {
    modalContent.appendChild(renderEntry(entries[i].title, entries[i].ammount));
  }
}
renderModalContent();
//showButton.addEventListener('click', renderModalContent);
