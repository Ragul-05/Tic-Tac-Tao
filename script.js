document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restart-btn');
    const winnerMessage = document.getElementById('winnerMessage');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const crackers = document.querySelector('.crackers');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let scores = { X: 0, O: 0 };

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

    const handleCellClick = (e, index) => {
      if (gameState[index] !== '' || !gameActive) return;

      gameState[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWin()) {
        updateScore();
        winnerMessage.textContent = `🎉 Congratulations! Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        triggerCelebration();
        return;
      }

      if (!gameState.includes('')) {
        winnerMessage.textContent = "It's a Draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkWin = () => {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          cells[a].classList.add('win');
          cells[b].classList.add('win');
          cells[c].classList.add('win');
          return true;
        }
      }
      return false;
    };

    const updateScore = () => {
      scores[currentPlayer]++;
      scoreX.textContent = scores.X;
      scoreO.textContent = scores.O;
    };

    const triggerCelebration = () => {
      crackers.style.display = 'block';
      setTimeout(() => {
        crackers.style.display = 'none';
      }, 3000);
    };

    const restartGame = () => {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      winnerMessage.textContent = '';
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
      });
    };

    cells.forEach((cell, index) => {
      cell.addEventListener('click', (e) => handleCellClick(e, index));
    });

    restartBtn.addEventListener('click', restartGame);
  });