const canvas = document.getElementById('myCanvas');
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = "https://www.filterforge.com/filters/4592.jpg";

const oImg = new Image();
oImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/IEC5008_Off_Symbol.svg/480px-IEC5008_Off_Symbol.svg.png";

const xImg = new Image();
xImg.src = "https://upload.wikimedia.org/wikipedia/commons/c/ca/Transparent_X.png";

ctx.drawImage(background, 0,0,canvas.width, canvas.height);

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

	if(isX){
		ctx.drawImage(xImg, x*200, y*200, 200,200);
	}else {
		ctx.drawImage(oImg, x*200, y*200, 200,200);
	}

	return 0;
};

const findWinner = function(board){
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


const loop = function(isX, x, y){
	let isOk = makeMove(board, [x,y], isX);

	if(isOk === -1){
		console.log('invalid move');
		console.log("The winner is:" + isX ? 'o': 'x');
		return;
	}

	let winner = findWinner(board);
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
	isX = !isX;
	let location = nextMove(board, isX);
	isOk = makeMove(board, location, isX);

	if(isOk === -1){
		console.log('invalid move');
		console.log("The winner is:" + isX ? 'o': 'x');
		return;
	}

	winner = findWinner(board);
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

};

canvas.addEventListener('click', function(evt) {
	const x = Math.floor(evt.offsetX/200);
	const y = Math.floor(evt.offsetY/200);

	loop(true, x,y);
}, false);
