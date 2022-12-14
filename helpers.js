export function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else
        return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

export function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
}

export function drawWinningLine(statusObject) {
    if (!statusObject) return;
    const {winner, direction, row, column, diagonal} = statusObject;
    if (winner === 'draw') return;
    const board = document.getElementById("board");
    addClass(board, `${direction.toLowerCase()}-${row || column || diagonal}`);
    setTimeout(() => {
        addClass(board, 'fullLine');
    }, 50);
}