document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resultDisplay = document.getElementById('result');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let gameActive = true;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = cell.getAttribute('data-index');
        if (cell.textContent || !gameActive) {
            return;
        }
        cell.textContent = currentPlayer;
        if (checkWin()) {
            resultDisplay.textContent = `${currentPlayer} ha ganado!`;
            gameActive = false;
        } else if (isDraw()) {
            resultDisplay.textContent = `Es un empate!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                computerMove();
            }
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => cell.textContent);
    }

    function computerMove() {
        const emptyCells = [...cells].filter(cell => !cell.textContent);
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            randomCell.textContent = 'O';
            if (checkWin()) {
                resultDisplay.textContent = `O ha ganado!`;
                gameActive = false;
            } else if (isDraw()) {
                resultDisplay.textContent = `Es un empate!`;
                gameActive = false;
            } else {
                currentPlayer = 'X';
            }
        }
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        gameActive = true;
        resultDisplay.textContent = '';
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);
});
