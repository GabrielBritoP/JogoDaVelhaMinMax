
class Board {

    constructor(state = ['','','','','','','','','']) {
        this.state = state;
    }

    isEmpty() {
        return this.state.every(cell => !cell);
    }

    isFull() {
        return this.state.every(cell => cell);
    }

    insert(symbol, position) {

        if(this.state[position]) {
            return false;
        }
        this.state[position] = symbol;
        return true;
    }

    getAvailableMoves() {
        const moves = [];
        this.state.forEach((cell, index) => {
            if(!cell) moves.push(index);
        });
        return moves;
    }

    isTerminal() {
        if(this.isEmpty()) return false;
        // Horizontal ganha
        if(this.state[0] === this.state[1] && this.state[0] === this.state[2] && this.state[0]) {
            return {'vencedor': this.state[0], 'direction': 'H', 'row': 1};
        }
        if(this.state[3] === this.state[4] && this.state[3] === this.state[5] && this.state[3]) {
            return {'vencedor': this.state[3], 'direction': 'H', 'row': 2};
        }
        if(this.state[6] === this.state[7] && this.state[6] === this.state[8] && this.state[6]) {
            return {'vencedor': this.state[6], 'direction': 'H', 'row': 3};
        }

        // Vertical ganha
        if(this.state[0] === this.state[3] && this.state[0] === this.state[6] && this.state[0]) {
            return {'vencedor': this.state[0], 'direction': 'V', 'column': 1};
        }
        if(this.state[1] === this.state[4] && this.state[1] === this.state[7] && this.state[1]) {
            return {'vencedor': this.state[1], 'direction': 'V', 'column': 2};
        }
        if(this.state[2] === this.state[5] && this.state[2] === this.state[8] && this.state[2]) {
            return {'vencedor': this.state[2], 'direction': 'V', 'column': 3};
        }

        // Diagonal ganha
        if(this.state[0] === this.state[4] && this.state[0] === this.state[8] && this.state[0]) {
            return {'vencedor': this.state[0], 'direction': 'D', 'diagonal': 'main'};
        }
        if(this.state[2] === this.state[4] && this.state[2] === this.state[6] && this.state[2]) {
            return {'vencedor': this.state[2], 'direction': 'D', 'diagonal': 'counter'};
        }


        if(this.isFull()) {
            return {'vencedor': 'empate'};
        }

        return false;
    }
}
export default Board;