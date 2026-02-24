const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

let field = {
    current: [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]],
    elemsCount: 0
};
let gameIsStop = false;

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field['current'][row][col] !== EMPTY || gameIsStop) {
        return;
    }
    let symbol = field['elemsCount'] % 2 === 0 ? CROSS : ZERO;
    renderSymbolInCell(symbol, row, col);

    field['elemsCount']++;
    field['current'][row][col] = symbol;

    if (isWinner() === 1) {
        alert("Победили крестики");
        gameIsStop = true;
        return;
    }
    else if (isWinner() === -1) {
        alert("Победили нолики");
        gameIsStop = true;
        return;
    }
    else if (field['elemsCount'] === 9) {
        alert('Ничья')
        gameIsStop = true;
        return;
    }
    return;
}


function isWinner() {
    for (let i = 0; i < 3; i++) {
        let x = 0;
        let o = 0;
        for (let j = 0; j < 3; j++) {
            if (field['current'][i][j] === CROSS) x++;
            if (field['current'][i][j] === ZERO) o++;
        }
        if (x === 3) {
            return 1
        }
        else if (o === 3) {
            return -1
        }
    }
    for (let i = 0; i < 3; i++) {
        let xx = 0;
        let oo = 0;
        for (let j = 0; j < 3; j++) {
            if (field['current'][j][i] === CROSS) xx++;
            if (field['current'][j][i] === ZERO) oo++;
        }
        if (xx === 3) {
            return 1
        }
        else if (oo === 3) {
            return -1
        }
    }

    let xxx = 0;
    let ooo = 0
    for (let i = 0; i < 3; i++) {
        if (field['current'][i][i] === CROSS) xxx++;
        if (field['current'][i][i] === ZERO) ooo++;
        if (xxx === 3) {
            return 1
        }
        else if (ooo === 3) {
            return -1
        }
    }
    if (field['current'][0][2] == CROSS && field['current'][1][1] == CROSS && field['current'][2][0] == CROSS) {return 1}
    if (field['current'][0][2] == ZERO && field['current'][1][1] == ZERO && field['current'][2][0] == ZERO) {return -1}
    return;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    field['current'] = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    field['elemsCount'] = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    gameIsStop = false;
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
