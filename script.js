import Board from './classes/board.js';
import Jogador from './classes/jogador.js';
import {addClass, drawWinningLine, hasClass} from './helpers.js';

function newGame(profundidade = -1, startingJogador = 1) {
    console.log(profundidade)
    const jogador = new Jogador(parseInt(profundidade));
    const board = new Board(['', '', '', '', '', '', '', '', '']);

    const boardDIV = document.getElementById("board");
    boardDIV.className = '';
    boardDIV.innerHTML =
        `<div class="cells-wrap">
            <button class="cell-0"></button>
            <button class="cell-1"></button>
            <button class="cell-2"></button>
            <button class="cell-3"></button>
            <button class="cell-4"></button>
            <button class="cell-5"></button>
            <button class="cell-6"></button>
            <button class="cell-7"></button>
            <button class="cell-8"></button>
        </div>`;

    const htmlCells = [...boardDIV.querySelector('.cells-wrap').children];

    const starting = parseInt(startingJogador),
        maximizando = starting;
    let jogadorTurn = starting;

    if (!starting) {
        const centerAndCorners = [0, 2, 4, 6, 8];
        const firstChoice = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
        const symbol = !maximizando ? 'x' : 'o';
        board.insert(symbol, firstChoice);
        addClass(htmlCells[firstChoice], symbol);
        jogadorTurn = 1;
    }

    board.state.forEach((cell, index) => {
        htmlCells[index].addEventListener('click', () => {

            if (hasClass(htmlCells[index], 'x') || hasClass(htmlCells[index], 'o') || board.isTerminal() || !jogadorTurn) return false;
            const symbol = maximizando ? 'x' : 'o';

            board.insert(symbol, index);
            addClass(htmlCells[index], symbol);

            if (board.isTerminal()) {
                drawWinningLine(board.isTerminal());
            }
            jogadorTurn = 0;

            jogador.getMelhorMovimento(board, !maximizando, best => {
                const symbol = !maximizando ? 'x' : 'o';
                board.insert(symbol, parseInt(best));
                addClass(htmlCells[best], symbol);
                if (board.isTerminal()) {
                    drawWinningLine(board.isTerminal());
                }
                jogadorTurn = 1;
            });
        }, false);
        if (cell) addClass(htmlCells[index], cell);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const profundidade = -1;
    const startingJogador = 1;
    newGame(profundidade, startingJogador);
    document.getElementById("newGame").addEventListener('click', () => {
        const startingDIV = document.getElementById("starting");
        const starting = startingDIV.options[startingDIV.selectedIndex].value;
        newGame(-1, starting);
    });
});