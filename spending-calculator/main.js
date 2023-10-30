import '/src/styles/style.scss';
import { idBuilder } from '/src/scripts/functions.js'

//* elements consts

const modal = document.querySelector('.modal');
const showButton = document.getElementById('showModal');
const closeButton = document.getElementById('closeModal');
const clearButton = document.getElementById('clearModal');
const titleInput = document.getElementById('titleInputField');
const expanseInput = document.getElementById('expanseInputField');
const addButton = document.getElementById('formAddButton');
const totalExpanses = document.getElementById('totalExpanses');
const expanseSwitch = document.getElementById('expanseSwitch');
const expanseField = document.getElementById('expanseField');
const appWindow = document.querySelector('.app-window');

const entries = JSON.parse(localStorage.getItem('entries')) || [];

//* opening & closing modal
showButton.addEventListener('click', () => { 
  modal.showModal();
});

closeButton.addEventListener('click', () => {
  modal.close();
});

//* opening & closing expanse switch

expanseSwitch.addEventListener('click', () => {
  expanseSwitch.classList.toggle('active-button');
  expanseField.classList.toggle('active-segment');
  appWindow.classList.toggle('active-window');
});

//* adding, clearing and deleting buttons

addButton.addEventListener('click', () => {
  const lastEntry = entries[entries.length - 1];
  event.preventDefault();

  entries.push({
    ID: lastEntry ? lastEntry.ID + 1 : 1,
    title: titleInput.value,
    ammount: parseFloat(expanseInput.value).toFixed(2)
  });

  console.log(titleInput.value);

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
  const entryIndex = entries.findIndex(entry => entry.ID == ID);
  entries.splice(entryIndex, 1);
  localStorage.setItem('entries', JSON.stringify(entries));
  renderModalContent();
  renderExpanses();
  alert(`Entry ${ID} deleted`);
}

const editEntry = (ID) => {
  const entryIndex = entries.findIndex(entry => entry.ID == ID);
  const entryTitle = document.getElementById(`${ID}-title`).value;
  const entryAmmount = document.getElementById(`${ID}-ammount`).value;

  entries[entryIndex].title = entryTitle;
  entries[entryIndex].ammount = entryAmmount;
  
  entries[entryIndex].ammount = parseFloat(entries[entryIndex].ammount).toFixed(2);

  localStorage.setItem('entries', JSON.stringify(entries));
  renderModalContent();
  renderExpanses();
  alert(`Entry ${ID} edited`);
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

const renderEntry = (ID, title, ammount, sequence) => {

  const entryDiv = idBuilder(document, ID, sequence);

  console.log(idBuilder(document, ID, sequence));
  console.log(entryDiv);

  const entryID = document.createElement('p');
  entryID.classList.add('modal-content-table-entry-id');
  entryID.innerText = ID;

  const entryTitle = document.createElement('input');
  entryTitle.type = 'text';
  entryTitle.classList.add('modal-content-table-entry-title');
  entryTitle.id = `${ID}-title`;
  entryTitle.value = title;

  const entryAmmount = document.createElement('input');
  entryAmmount.type = 'number';
  entryAmmount.classList.add('modal-content-table-entry-ammount');
  entryAmmount.id = `${ID}-ammount`;
  entryAmmount.value = ammount.toFixed(2);

  const entryDeleteButton = document.createElement('button');
  entryDeleteButton.classList.add('modal-content-table-entry-delete-button');

  const entryDeleteButtonIcon = new Image();
  entryDeleteButtonIcon.src = '/icons/delete.svg';
  entryDeleteButtonIcon.classList.add('modal-content-table-entry-delete-button-icon');
  entryDeleteButtonIcon.alt = 'Delete';
  entryDeleteButton.appendChild(entryDeleteButtonIcon);

  entryDeleteButton.addEventListener('click', () => {
    deleteEntry(entryID.innerText);
  });

  const entryEditButton = document.createElement('button');
  entryEditButton.classList.add('modal-content-table-entry-edit-button');

  const entryEditButtonIcon = new Image();
  entryEditButtonIcon.src = '/icons/edit.svg';
  entryEditButtonIcon.classList.add('modal-content-table-entry-edit-button-icon');
  entryEditButtonIcon.alt = 'Edit';
  entryEditButton.appendChild(entryEditButtonIcon);

  entryEditButton.addEventListener('click', () => { 
    editEntry(entryID.innerText);
  });

  entryDiv.appendChild(entryID);
  entryDiv.appendChild(entryTitle);
  entryDiv.appendChild(entryAmmount);
  entryDiv.appendChild(entryEditButton);
  entryDiv.appendChild(entryDeleteButton);

  return entryDiv;
}

const renderModalContent = () => {
  const modalContent = document.querySelector('.modal-content-table');
  
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }

  for (let i = 0; i < entries.length; i++) {
    modalContent.appendChild(renderEntry(entries[i].ID, entries[i].title, parseFloat(entries[i].ammount), i));
  }
}

renderModalContent();
renderExpanses();
