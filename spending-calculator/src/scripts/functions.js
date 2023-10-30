const isEven = (n) => n % 2 == 0;

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

const inputFieldBuilder = (document, inputType, cssClass, ID, ammount) => {
    const newInput = document.createElement('input');
    newInput.type = inputType;
    newInput.classList.add(cssClass);
    newInput.id = `${ID}-ammount`;
    newInput.value = ammount;

    return newInput;
}

export { entryBuilder, iconBuilder, buttonBuilder, inputFieldBuilder }
