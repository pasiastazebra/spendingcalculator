import '/src/styles/style.scss';
import { entryBuilder, iconBuilder, buttonBuilder, inputFieldBuilder, idBuilder, countExpanses } from '/src/scripts/functions.js'

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
const alertWindow = document.querySelector('.alert-window');
const alertTitle = document.querySelector('.alert-window-top-title');
const alertDescription = document.querySelector('.alert-window-content-description');
const alertButton = document.querySelector('.alert-window-content-button');

const entries = JSON.parse(localStorage.getItem('entries')) || [];

//* opening & closing modal
showButton.addEventListener('click', () =>  modal.showModal() );

closeButton.addEventListener('click', () => modal.close() );

//* closing alertbox

alertButton.addEventListener('click', () => slideDown() );

//* opening & closing expanse switch

expanseSwitch.addEventListener('click', () => toggleClass() );

//* adding, clearing and deleting buttons

addButton.addEventListener('click', () => {
  event.preventDefault();

  const lastEntry = entries[entries.length - 1];

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

  showAlert('Deleting entry', `Entry ${ID} deleted`);
  modal.close();

  renderModalContent();
  renderExpanses();
  
}

const editEntry = (ID) => {

  const entryIndex = entries.findIndex(entry => entry.ID == ID);
  const entryTitle = document.getElementById(`${ID}-title`).value;
  const entryAmmount = document.getElementById(`${ID}-ammount`).value;

  entries[entryIndex].title = entryTitle;
  entries[entryIndex].ammount = entryAmmount;
  
  entries[entryIndex].ammount = parseFloat(entries[entryIndex].ammount).toFixed(2);

  localStorage.setItem('entries', JSON.stringify(entries));

  alert(`Entry ${ID} edited`);

  renderModalContent();
  renderExpanses();

}

//* rendering total expanses

const renderExpanses = () => totalExpanses.innerText = countExpanses(entries).toFixed(2);

//* rendering modal

const renderEntry = (ID, title, ammount, sequence) => {

  const entryDiv = entryBuilder(document, ID, sequence);
  const entryID = idBuilder(document, ID);
  const entryTitle = inputFieldBuilder(document, 'text', 'modal-content-table-entry-title', `${ID}-title`, title);
  const entryAmmount = inputFieldBuilder(document, 'number', 'modal-content-table-entry-ammount', `${ID}-ammount`,  ammount.toFixed(2));

  const entryDeleteButton = buttonBuilder(document, 'modal-content-table-entry-delete-button',);
  const entryDeleteButtonIcon = iconBuilder('/icons/delete.svg', 'modal-content-table-entry-delete-button-icon', 'Delete');

  entryDeleteButton.appendChild(entryDeleteButtonIcon);

  entryDeleteButton.addEventListener('click', () => {
    deleteEntry(entryID.innerText);
  });

  const entryEditButton = buttonBuilder(document, 'modal-content-table-entry-edit-button',);
  const entryEditButtonIcon = iconBuilder('/icons/edit.svg', 'modal-content-table-entry-edit-button-icon', 'Edit');
  
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

//* animations functions

const toggleClass = () => {

  expanseSwitch.classList.toggle('active-button');
  expanseField.classList.toggle('active-segment');
  appWindow.classList.toggle('active-window');

}

const slideDown = () => {

  alertWindow.classList.toggle('slideDown');
  alertWindow.classList.toggle('slideUp');

}

//* alert function

const showAlert = (title, message) => {

  alertTitle.innerText = title;
  alertDescription.innerText = message;

  slideDown();

}

renderModalContent();
renderExpanses();
