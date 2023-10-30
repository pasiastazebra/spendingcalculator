const isEven = (n) => n % 2 == 0;

const idBuilder = (document, ID, sequence) => {

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

export { idBuilder, iconBuilder, buttonBuilder }
