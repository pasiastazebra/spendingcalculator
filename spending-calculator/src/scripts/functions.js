const isEven = (n) => n % 2 == 0;

const countExpanses = (array) => {
    let sum = 0.00;
  
    array.forEach(element => {
      sum += parseFloat(element.ammount);
    });
  
    return sum;
  }

const entryBuilder = (document, ID, sequence) => {

    const newID = document.createElement('div');
    newID.classList.add('modal-content-table-entry');
    newID.id = ID;
    isEven(sequence) ? newID.classList.add('odd') : newID.classList.add('even');

    return newID;
}

const iconBuilder = (src, cssClass, alt) => {

    const newIcon = new Image();
    newIcon.src = src;
    newIcon.classList.add(cssClass);
    newIcon.alt = alt;

    return newIcon;
}

const buttonBuilder = (document, cssClass) => {
    const newButton = document.createElement('button');
    newButton.classList.add(cssClass);

    return newButton;
}

const inputFieldBuilder = (document, inputType, cssClass, cssID, ammount) => {
    const newInput = document.createElement('input');
    newInput.type = inputType;
    newInput.classList.add(cssClass);
    newInput.id = cssID;
    newInput.value = ammount;

    return newInput;
}

const idBuilder = (document, ID) => {
    const newID = document.createElement('p');
    newID.innerText = ID;

    return newID;
}

export { entryBuilder, iconBuilder, buttonBuilder, inputFieldBuilder, idBuilder, countExpanses }
