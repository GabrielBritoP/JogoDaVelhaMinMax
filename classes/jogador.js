import Board from './board.js';

export default class Jogador {
    constructor(profundidadeMax = -1) {
        this.profundidadeMax = profundidadeMax;
        this.nodesMap = new Map();
    }

    getMelhorMovimento(board, maximizing = true, callback = () => {
    }, profundidade = 0) {

        if (profundidade == 0) this.nodesMap.clear();

        if (board.isTerminal() || profundidade === this.profundidadeMax) {
            if (board.isTerminal().winner === 'x') {
                return 100 - profundidade;
            } else if (board.isTerminal().winner === 'o') {
                return -100 + profundidade;
            }
            return 0;
        }
        //Maximizando alpha
        if (maximizing) {

            let best = -100;

            board.getAvailableMoves().forEach(index => {

                const child = new Board([...board.state]);

                child.insert('x', index);
                //Recursivamente chamando o melhor movimento incrementando a profundidade comparando com o estado do campo
                const nodeValue = this.getMelhorMovimento(child, false, callback, profundidade + 1);

                best = Math.max(best, nodeValue);


            });

            if (profundidade == 0) {
                let returnValue;
                if (typeof this.nodesMap.get(best) == 'string') {
                    const arr = this.nodesMap.get(best).split(',');
                    const rand = Math.floor(Math.random() * arr.length);
                    returnValue = arr[rand];
                } else {
                    returnValue = this.nodesMap.get(best);
                }
                //run a callback after calculation and return the index
                callback(returnValue);
                return returnValue;
            }

            return best;
        }
        //Minimizando Beta
        if (!maximizing) {

            let best = 100;
            //Loop through all empty cells
            board.getAvailableMoves().forEach(index => {
                //Initialize a new board with a copy of our current state
                const child = new Board([...board.state]);

                //Create a child node by inserting the minimizing symbol o into the current empty cell
                child.insert('o', index);

                //Recursively calling getMelhorMovimento this time with the new board and maximizing turn and incrementing the profundidade
                let nodeValue = this.getMelhorMovimento(child, true, callback, profundidade + 1);
                //Updating best value
                best = Math.min(best, nodeValue);

                if (profundidade == 0) {

                    const moves = this.nodesMap.has(nodeValue) ? this.nodesMap.get(nodeValue) + ',' + index : index;
                    this.nodesMap.set(nodeValue, moves);
                }
            });

            if (profundidade == 0) {
                let returnValue;
                if (typeof this.nodesMap.get(best) == 'string') {
                    const arr = this.nodesMap.get(best).split(',');
                    const rand = Math.floor(Math.random() * arr.length);
                    returnValue = arr[rand];
                } else {
                    returnValue = this.nodesMap.get(best);
                }

                callback(returnValue);
                return returnValue;
            }

            return best;
        }
    }
}