const str = function(num, char){
	if(num === 0){
		return '';
	}
	return char + str(num-1, char);
};

const diamond = function(num, char){
	let tiv = num;
	debugger;
	const triangleUp = function(number, lastNum){
		for(let i = number; i < lastNum; i++){
			console.log(str(lastNum-i, ' '), str(2*i+1, char));
		}
	};

	const triangleDown = function(number, lastNum){
		for(let i = number;i >= 0; i--){
			console.log(str(lastNum-i, ' '), str(2*i+1, char));
		}
	};

	if(tiv%2 ===0) {
		tiv+=1;
	}

	const upTriangleHeight = Math.ceil(num/2);
	const downTriangleHeight = tiv - upTriangleHeight-1;
	triangleUp(0, upTriangleHeight);
	triangleDown(downTriangleHeight, upTriangleHeight);
};

diamond(5,'@');
