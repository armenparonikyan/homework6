const str = function(num, char){
	if(num === 0){
		return '';
	}
	return char + str(num-1, char);
};

const diamond = function(num, char){
	let tiv = num;

	const triangleUp = function(number, lastNum){
		if(number === lastNum){
			return;
		}
		console.log(str(lastNum-number, ' '), str(2*number+1, char));
		triangleUp(number+1, lastNum);
	};

	const triangleDown = function(number, lastNum){
		if(number < 0){
			return;
		}
		console.log(str(lastNum-number, ' '), str(2*number+1, char));
		triangleDown(number-1, lastNum);
	};

	if(tiv%2 ===0) {
		tiv+=1;
	}

	const upTriangleHeight = Math.ceil(num/2);
	const downTriangleHeight = tiv - upTriangleHeight-1;
	triangleUp(0, upTriangleHeight);
	triangleDown(downTriangleHeight, upTriangleHeight);
};

diamond(10,'@');
