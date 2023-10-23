import '/src/style.scss';

//* modal scripts 

const modal = document.querySelector('.modal');
const showButton = document.getElementById('showModal');
const closeButton = document.getElementById('closeModal');

showButton.addEventListener('click', () => { 
  modal.showModal();
});

closeButton.addEventListener('click', () => {
  modal.close();
});

//* adding new entries

const entries = [
  {
    title: 'First entry',
    ammount: '100,00'
  },
  {
    title: 'Second entry',
    ammount: '200,00'
  }
];

const addNewEntry = (title, ammount) => {
  const entryDiv = document.createElement('div');
  entryDiv.classList.add('modal-content-entry');

  const entryTitle = document.createElement('h2');
  entryTitle.innerText = title;

  const entryAmmount = document.createElement('p');
  entryAmmount.innerText = ammount;

  entryDiv.appendChild(entryTitle);
  entryDiv.appendChild(entryAmmount);

  return entryDiv;
}

const renderModalContent = () => {
  const modalContent = document.querySelector('.modal-content');
  
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }

  for (let i = 0; i < entries.length; i++) {
    modalContent.appendChild(addNewEntry(entries[i].title, entries[i].ammount));
  }
}

//run renderModalContent on showButton click
//!Need to fix multiple entries rendering
showButton.addEventListener('click', renderModalContent);
