const isEven = (n) => n % 2 == 0;

const idBuilder = (document, ID, sequence) => {
    const newID = document.createElement('div');
    newID.classList.add('modal-content-table-entry');
    newID.id = ID;
    isEven(sequence) ? newID.classList.add('odd') : newID.classList.add('even');

    return newID;
}

export { idBuilder }
