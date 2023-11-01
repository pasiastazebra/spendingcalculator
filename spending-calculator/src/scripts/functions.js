const isEven = (n) => n % 2 == 0;

const countExpanses = (array) => {
    let sum = 0.00;
  
    array.forEach(element => {
      sum += parseFloat(element.ammount);
    });
  
    return sum;
  }

const isFuture = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    date = new Date(date);
    date.setHours(0, 0, 0, 0);

    if (date > today) return true; 
    else return false;

}

//creates main entry div
const entryBuilder = (document, ID, sequence) => {

    const newEntry = document.createElement('div');
    newEntry.classList.add('modal-content-table-entry');
    newEntry.id = ID;
    isEven(sequence) ? newEntry.classList.add('odd') : newEntry.classList.add('even');

    return newEntry;
}

//creates button
const buttonBuilder = (document, cssClass) => {
    const newButton = document.createElement('button');
    newButton.classList.add(cssClass);

    return newButton;
}

//creates icon
const iconBuilder = (src, cssClass, alt) => {

    const newIcon = new Image();
    newIcon.src = src;
    newIcon.classList.add(cssClass);
    newIcon.alt = alt;

    return newIcon;
}

//creates input field
const inputFieldBuilder = (document, inputType, cssClass, cssID, ammount) => {
    const newInput = document.createElement('input');

    newInput.type = inputType;
    newInput.classList.add(cssClass);
    newInput.id = cssID;
    newInput.value = ammount;

    return newInput;
}

//creates ID field
const idBuilder = (document, ID) => {
    const newID = document.createElement('p');
    newID.classList.add('modal-content-table-entry-id');
    newID.innerText = ID;

    return newID;
}

const currencyBuilder = (document, currency) => {

    const newCurrency = document.createElement('p');
    newCurrency.classList.add('modal-content-table-entry-currency');
    newCurrency.innerText = currency;

    return newCurrency;

}

export { entryBuilder, iconBuilder, buttonBuilder, inputFieldBuilder, idBuilder, countExpanses, isFuture, currencyBuilder }
