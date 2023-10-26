import '/src/styles/style.scss';

//* elements consts

const modal = document.querySelector('.modal');
const showButton = document.getElementById('showModal');
const closeButton = document.getElementById('closeModal');
const clearButton = document.getElementById('clearModal');
const titleInput = document.getElementById('titleField');
const expanseInput = document.getElementById('expanseField');
const addButton = document.getElementById('formAddButton');
const totalExpanses = document.getElementById('totalExpanses');

const entries = JSON.parse(localStorage.getItem('entries')) || [];

//* opening & closing modal
showButton.addEventListener('click', () => { 
  modal.showModal();
});

closeButton.addEventListener('click', () => {
  modal.close();
});

//* adding, clearing and deleting buttons

addButton.addEventListener('click', () => {
  const lastEntry = entries[entries.length - 1];

  entries.push({
    ID: lastEntry ? lastEntry.ID + 1 : 1,
    title: titleInput.value,
    ammount: parseFloat(expanseInput.value).toFixed(2)
  });

  localStorage.setItem('entries', JSON.stringify(entries));
  renderModalContent();
  renderExpanses();
});

clearButton.addEventListener('click', () => {
  localStorage.clear();
  entries.length = 0;
  renderModalContent();
  renderExpanses();
  modal.close();
  alert('All entries cleared!');
});

const deleteEntry = (ID) => {
  const entryIndex = entries.findIndex(entry => entry.ID === ID);
  entries.splice(entryIndex, 1);
  localStorage.setItem('entries', JSON.stringify(entries));
  renderModalContent();
  renderExpanses();
  alert(`Entry ${ID} deleted`);
}

//* rendering total expanses

const countExpanses = (array) => {
  let sum = 0.00;

  array.forEach(element => {
    sum += parseFloat(element.ammount);
  });

  return sum;
}

const renderExpanses = () => {
  totalExpanses.innerText = countExpanses(entries).toFixed(2);
}

//* rendering modal

const renderEntry = (ID, title, ammount) => {

  const entryDiv = document.createElement('div');
  entryDiv.classList.add('modal-content-entry');
  entryDiv.id = ID;

  const entryID = document.createElement('p');
  entryID.innerText = ID;

  const entryTitle = document.createElement('p');
  entryTitle.innerText = title;

  const entryAmmount = document.createElement('p');
  entryAmmount.innerText = ammount.toFixed(2);

  const entryDeleteButton = document.createElement('button');
  entryDeleteButton.innerText = 'Delete';
  entryDeleteButton.classList.add('delete-button');

  entryDeleteButton.addEventListener('click', () => {
    deleteEntry(entryID.innerText);
  });

  entryDiv.appendChild(entryID);
  entryDiv.appendChild(entryTitle);
  entryDiv.appendChild(entryAmmount);
  entryDiv.appendChild(entryDeleteButton);

  return entryDiv;
}

const renderModalContent = () => {
  const modalContent = document.querySelector('.modal-content-table');
  
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }

  for (let i = 0; i < entries.length; i++) {
    modalContent.appendChild(renderEntry(entries[i].ID, entries[i].title, parseFloat(entries[i].ammount)));
  }
}

renderModalContent();
renderExpanses();
