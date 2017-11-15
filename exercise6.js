let board = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
];
let isX = true;

const nextMove = function(board,isX){
	for(let i=0; i<board.length;i++){
		for(let k = 0;k<board[i].length;k++){
			if(board[i][k] === undefined){
				return [i,k];
			}
		}
	}
};

const makeMove = function(board, location ,isX){
	const x = location[0];
	const y = location[1];
	if(board[x][y] !== undefined || x<0 || x>2 || y<0 || y>2){
		return -1;
	}


	board[x][y] = isX ? 'x': 'o';

	return 0;
};

const findWinner = function(board){
	debugger;
	const result = {
		winner: "none",
		winningLocations:[]
	};
	//diagonal
	let xNum = 0;
	let oNum = 0;
	for(let i = 0; i< board.length; i++){
		if(board[i][i] === 'x'){
			xNum++;
		} else if (board[i][i] === 'o') {
			oNum++;
		}
		result.winningLocations.push([i,i]);
	}
	if(xNum === 3) {
		result.winner = 'x';
		return result;
	}
	if(oNum === 3) {
		result.winner = 'o';
		return result;
	}


	//anti diagonal
	xNum = 0;
	oNum = 0;
	result.winningLocations =[];
	for(let i = 0; i< board.length; i++){
		if(board[i][2-i] === 'x'){
			xNum++;
		} else if (board[i][2-i] === 'o') {
			oNum++;
		}
		result.winningLocations.push([i,2-i]);
	}
	if(xNum === 3) {
		result.winner = 'x';
		return result;
	}
	if(oNum === 3) {
		result.winner = 'o';
		return result;
	}

	//horizontal
	xNum = 0;
	oNum = 0;
	result.winningLocations =[];
	for(let i = 0; i< board.length; i++){
		for(let k = 0; k<board.length;k++){
			if(board[i][k] === 'x'){
				xNum++;
			} else if (board[i][k] === 'o') {
				oNum++;
			}
			result.winningLocations.push([i,k]);
		}
		if(xNum === 3) {
			result.winner = 'x';
			return result;
		}
		if(oNum === 3) {
			result.winner = 'o';
			return result;
		}
		xNum = 0;
		oNum = 0;
		result.winningLocations =[];
	}


	//vertical

	for(let i = 0; i< board.length; i++){
		for(let k = 0; k<board.length;k++){
			if(board[k][i] === 'x'){
				xNum++;
			} else if (board[k][i] === 'o') {
				oNum++;
			}
			result.winningLocations.push([k,i]);
		}
		if(xNum === 3) {
			result.winner = 'x';
			return result;
		}
		if(oNum === 3) {
			result.winner = 'o';
			return result;
		}
		xNum = 0;
		oNum = 0;
		result.winningLocations =[];
	}

	for(let i=0; i<board.length;i++){
		for(let k = 0;k<board[i].length;k++){
			if(board[i][k] === undefined){
				return;
			}
		}
	}

	delete result.winningLocations;
	return result;
};


const loop = function(isX){
	const location = nextMove(board, isX);
	const isOk = makeMove(board, location, isX);

	if(isOk === -1){
		console.log('invalid move');
		console.log("The winner is:" + isX ? 'o': 'x');
		return;
	}

	const winner = findWinner(board);
	if(winner){
		if(winner.winningLocations) {
			console.log("The winner is:" + winner.winner);
			return;
		}

		if(winner.winner === 'none'){
			console.log("it is a tie");
			return;
		}
	}

	loop(!isX);
};

loop(true);
