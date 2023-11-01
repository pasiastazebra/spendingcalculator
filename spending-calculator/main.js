import '/src/styles/style.scss';
import { entryBuilder, iconBuilder, buttonBuilder, inputFieldBuilder, idBuilder, countExpanses, isFuture } from '/src/scripts/functions.js'

//* elements consts

const modal = document.querySelector('.modal');
const showButton = document.getElementById('showModal');
const closeButton = document.getElementById('closeModal');
const clearButton = document.getElementById('clearModal');
const titleInput = document.getElementById('titleInputField');
const expanseInput = document.getElementById('expanseInputField');
const dateInput = document.getElementById('dateInputField');
const addButton = document.getElementById('formAddButton');
const totalExpanses = document.getElementById('totalExpanses');
const expanseSwitch = document.getElementById('expanseSwitch');
const expanseField = document.getElementById('expanseField');
const appWindow = document.querySelector('.app-window');
const alertWindow = document.querySelector('.alert-window');
const alertTitle = document.querySelector('.alert-window-top-title');
const alertDescription = document.querySelector('.alert-window-content-description');
const alertButton = document.querySelector('.alert-window-content-button');
const alertOverlay = document.querySelector('.alert-overlay');

const entries = JSON.parse(localStorage.getItem('entries')) || [];
dateInput.valueAsDate = new Date();

//* opening & closing modal
showButton.addEventListener('click', () =>  modal.showModal() );

closeButton.addEventListener('click', () => modal.close() );

//* closing alertbox

alertButton.addEventListener('click', () => {slideDown(); alertOverlay.style.display = 'none';} );

//* opening & closing expanse switch

expanseSwitch.addEventListener('click', () => toggleClass() );

//* adding, clearing and deleting buttons

addButton.addEventListener('click', () => {
  //

  if ( isFuture(dateInput.value) ) {

    showAlert('Future date chosen', `Cannot add entry. Please chose correct date and try again.`);
    alertButton.focus();

  } else if ( titleInput.value == '' || expanseInput.value == ''|| dateInput.value == '' ) {

    showAlert('Empty fields', `Cannot add entry. Please fill all fields and try again.`);
    alertButton.focus();

  } else {
    
    event.preventDefault(); //? adding preventDefault here bcs without it browser detects, 
                            //? that input fields are cleared right below and throw an alert about empty field

    const lastEntry = entries[entries.length - 1];

    showAlert('Adding new entry', 'New entry added.');
    alertButton.focus();
  
    entries.push({
      ID: lastEntry ? lastEntry.ID + 1 : 1,
      title: titleInput.value,
      ammount: parseFloat(expanseInput.value).toFixed(2),
      date: dateInput.value
    });

    titleInput.value = '';
    expanseInput.value = '';
    dateInput.valueAsDate = new Date();

    localStorage.setItem('entries', JSON.stringify(entries));
    renderModalContent();
    renderExpanses();
    
 }
});

clearButton.addEventListener('click', () => {

  localStorage.clear();
  entries.length = 0;
  renderModalContent();
  renderExpanses();
  
  showAlert('Clearing entries', `All entries deleted.`);
  modal.close();
  alertButton.focus();

});

const deleteEntry = (ID) => {

  const entryIndex = entries.findIndex(entry => entry.ID == ID);
  entries.splice(entryIndex, 1);
  localStorage.setItem('entries', JSON.stringify(entries));

  showAlert('Deleting entry', `Entry ${ID} deleted`);
  modal.close();
  alertButton.focus();

  renderModalContent();
  renderExpanses();
  
}

const editEntry = (ID) => {

  const entryIndex = entries.findIndex(entry => entry.ID == ID);
  const entryTitle = document.getElementById(`${ID}-title`);
  const entryAmmount = document.getElementById(`${ID}-ammount`);
  const entryDate = document.getElementById(`${ID}-date`);

  if ( isFuture(entryDate.value) ) {

    showAlert('Future date chosen', `Cannot edit entry ${ID}. Please chose correct date and try again.`);
    modal.close();
    alertButton.focus();

    entryTitle.value = entries[entryIndex].title;
    entryAmmount.value = entries[entryIndex].ammount;
    entryDate.value = entries[entryIndex].date;

  } else if ( entryTitle.value == entries[entryIndex].title && entryAmmount.value == entries[entryIndex].ammount && entries[entryIndex].date == entryDate.value ) {

    showAlert('There is no changes', `Cannot edit entry ${ID}. Please enter any changes and try again.`);
    modal.close();
    alertButton.focus();

  } else {

  entries[entryIndex].title = entryTitle.value;
  entries[entryIndex].ammount = entryAmmount.value;
  entries[entryIndex].date = entryDate.value;
  
  entries[entryIndex].ammount = parseFloat(entries[entryIndex].ammount).toFixed(2);

  localStorage.setItem('entries', JSON.stringify(entries));

  showAlert('Editing entry', `Entry ${ID} edited`);
  modal.close();
  alertButton.focus();

  renderModalContent();
  renderExpanses();

  }
}

//* rendering total expanses

const renderExpanses = () => totalExpanses.innerText = countExpanses(entries).toFixed(2);

//* rendering modal

const renderEntry = (ID, title, ammount, sequence, date) => {

  const entryDiv = entryBuilder(document, ID, sequence);
  const entryID = idBuilder(document, ID);
  const entryTitle = inputFieldBuilder(document, 'text', 'modal-content-table-entry-title', `${ID}-title`, title);
  const entryAmmount = inputFieldBuilder(document, 'number', 'modal-content-table-entry-ammount', `${ID}-ammount`,  ammount.toFixed(2));
  const entryDate = inputFieldBuilder(document, 'date', 'modal-content-table-entry-date', `${ID}-date`, date);

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
  entryDiv.appendChild(entryDate);
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
    modalContent.appendChild(renderEntry(entries[i].ID, entries[i].title, parseFloat(entries[i].ammount), i, entries[i].date));
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

  alertOverlay.style.display = 'block';
  slideDown();

}

renderModalContent();
renderExpanses();
