module.exports =
function solveSudoku(matrix) {
 
    //преебираем все строки
    for (let y in matrix)
    {
        let line = matrix[y]
        for(let x in line)
        {
            let cell = line[x]
            if(cell != 0) continue;
           
            let possibleNumbers = detectPossibleNumbers(y,x,matrix)
           
            matrix[y][x] = possibleNumbers
        }
    }

    matrix = findObviousNumbers(matrix)


    if(isSolvedMatrix(matrix) != true)
    for(var y in matrix)
    {
    	for(var x in matrix[y])
    	{
    		if(typeof(matrix[y][x]) == "object")
    		{
    			for(var possibleNumber of matrix[y][x])
    			{
    				var matrixCopy = JSON.parse(JSON.stringify(matrix));

    				matrixCopy = putNumber(possibleNumber,matrixCopy,y,x)

    				matrixCopy = findObviousNumbers(matrixCopy)
    				if(isSolvedMatrix(matrixCopy))
    				{
    					return matrixCopy;
    				}

    			}
    		}
    	}
    }

    return printMatrix(matrix)
 

    function isSolvedMatrix(matrix)
    {
    	for(var y in matrix)
    		for(var x in matrix[y])
    			if(typeof(matrix[y][x]) != 'number' || 
    				matrix[y][x] == 0 || 
    				(new Set(matrix[y])).size !== matrix[y].length)
    				return false;
    	return true;
    }

    function findObviousNumbers(matrix)
    {
    	for (let II = 0; II < 100; II++) {
	    	var edited = false
	        //преебираем все строки
	        for (let y in matrix) {
	            for (let x in matrix[y]) {
	                if (typeof (matrix[y][x]) != "object") continue;
	 
	 
	                for (let number of matrix[y][x]) {
	                    var blockY = Math.floor(y / 3) * 3 //границы блока
	                    var blockX = Math.floor(x / 3) * 3

	 					if(	
	 						isOnlyPossibleNumber(number,matrix,y,x) == true || //единственное возможное число в ячейке	
	 						possibleCountLength(number, matrix, y, 0, y, 8) == 1 ||  //строка
	 						possibleCountLength(number, matrix, 0, x, 8, x) == 1 ||	 //столбец
	 						possibleCountLength(number, matrix, blockY, blockX, blockY + 2, blockX + 2) == 1 //блок
	 					  )
	 					{
	 						matrix = putNumber(number,matrix,y,x);
	 						edited = true
	                    	break;
	 					}
	                }
	            }
	        }
	        if(edited == false)
	        {
        		return(matrix);
	        }
    	}
    }

    function printMatrix(matrix)
    {
    	for(var y in matrix)
    		for(var x in matrix[y])
    			if(typeof(matrix[y][x]) == "object")
					matrix[y][x] = 0
					//matrix[y][x] = matrix[y][x].join('+')
		return matrix;
    }
    function isOnlyPossibleNumber(number,matrix,y,x)
    {	 
    	for(let n of matrix[y][x])
    	{
    		if(typeof(n) == 'number' && n != number)
    			return false;
    	}
    	return true;
    }

    /*
	Вписывает число в ячейку, при этом удаляя это число из возможных в столбе, строке и блоке
    */
    function putNumber(number,matrix,y,x)
    {
    	var blockY = Math.floor(y / 3) * 3 //границы блока
        var blockX = Math.floor(x / 3) * 3

    	matrix[y][x] = number;
        matrix = removePossibleNumber(number, matrix, 0, x, 8, x);
        matrix = removePossibleNumber(number, matrix, y, 0, y, 8);
        matrix = removePossibleNumber(number, matrix, blockY, blockX, blockY + 2, blockX + 2);

        return matrix;
	}
	
	/*
	Определяет возможные номера в переданной ячейке
	*/
    function detectPossibleNumbers(y,x,matrix)
    {
        //нашли все цифры в строке
        var linePresentNumbers = matrix[y].filter((number) => number > 0)
       
        //нашли все цифры в колонке
        var column = matrix.map((value) => value[x])
        var columnPresentNumbers = column.filter((number) => number > 0)
 
        //нашли все цифры в блоке
        var blockY = Math.floor(y / 3) *3//границы блока
        var blockX = Math.floor(x / 3) *3
        var blockPresentNumbers = []
        for(let y = blockY; y < blockY+3; y++) {
            for(let x = blockX;x < blockX+3;x++) {
                if(matrix[y][x] > 0)
                    blockPresentNumbers[blockPresentNumbers.length] = matrix[y][x]
            }
        }
        //определяем какие цифры ни разу не встречались
        var possibleNumbers = []
        for(let num = 1;num < 10;num++)
        {
            if(blockPresentNumbers.indexOf(num) == -1 &&
                linePresentNumbers.indexOf(num) == -1 &&
                columnPresentNumbers.indexOf(num) == -1)
            possibleNumbers[possibleNumbers.length] = num;
        }
        return possibleNumbers;
    }
 
 	/*
	Определяет в скольки ячейках в переданном диапозоне ячеек переданное число содержится в "возможных"
 	*/
    function possibleCountLength(number,matrix, y1, x1, y2, x2) {
        let count = 0;
        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                if (typeof (matrix[y][x]) != "object")
                    continue;
                if (matrix[y][x].indexOf(number) != -1)
                    count++;
            }
        }
        return count;
    }
 
    /*
	Удаляет число из "возможных" в переданном диапозоне ячеек
    */
    function removePossibleNumber(number, matrix, y1, x1, y2, x2) {
        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                if (typeof (matrix[y][x]) != "object")
                    continue;
                var numberIndex = matrix[y][x].indexOf(number);
                if (numberIndex != -1)
                    matrix[y][x].splice(numberIndex,1)
            }
        }
        return matrix;
    }
}
 
 
/*console.log(solveSudoku([
	[0, 5, 0, 0, 7, 0, 0, 0, 1],
    [8, 7, 6, 0, 2, 1, 9, 0, 3],
    [0, 0, 0, 0, 3, 5, 0, 0, 0],
    [0, 0, 0, 0, 4, 3, 6, 1, 0],
    [0, 4, 0, 0, 0, 9, 0, 0, 2],
    [0, 1, 2, 0, 5, 0, 0, 0, 4],
    [0, 8, 9, 0, 6, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [1, 6, 7, 0, 0, 2, 5, 4, 0]
  ]))*/