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

    for (let II = 0; II < 10; II++) {
        //преебираем все строки
        for (let y in matrix) {
            for (let x in matrix[y]) {
                if (typeof (matrix[y][x]) != "object") continue;
 
 
                for (let number of matrix[y][x]) {
                    var blockY = Math.floor(y / 3) * 3 //границы блока
                    var blockX = Math.floor(x / 3) * 3

 					var setting = false
 					//единственное возможное число в ячейке
 					if(onlyPossibleNumber(number,matrix,y,x) == true)
 					{
 						matrix[y][x] = number;
                        setting = true 
 					}
                    //строка
                    if (possibleCountLength(number, matrix, y, 0, y, 8) == 1) {
                         matrix[y][x] = number;
                         setting = true
                    }
                    //столбец
                    if (possibleCountLength(number, matrix, 0, x, 8, x) == 1) {
                        matrix[y][x] = number;
                        setting = true 
                    }
                    //блок
 
                    if (possibleCountLength(number, matrix, blockY, blockX, blockY + 2, blockX + 2) == 1) {
                        matrix[y][x] = number;
                        setting = true;
                    } 
                    if(setting == true)
                    {
                    	matrix = removePossibleNumber(number, matrix, 0, x, 8, x);
                        matrix = removePossibleNumber(number, matrix, y, 0, y, 8);
                        matrix = removePossibleNumber(number, matrix, blockY, blockX, blockY + 2, blockX + 2);
                    	break;
                    }
                }
            }
        }
    }
    return printMatrix(matrix)
 
    function printMatrix(matrix)
    {
    	for(var y in matrix)
    		for(var x in matrix[y])
    			if(typeof(matrix[y][x]) == "object")
					matrix[y][x] = 0
					//matrix[y][x] = matrix[y][x].join('+')
		return matrix;
    }
    function onlyPossibleNumber(number,matrix,y,x)
    {	 
    	for(let n of matrix[y][x])
    	{
    		if(typeof(n) == 'number' && n != number)
    			return false;
    	}
    	return true;
    }
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
 
 /*
console.log(solveSudoku([
    [0, 5, 0, 4, 0, 0, 0, 1, 3],
    [0, 2, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 8, 5, 6, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 0, 0, 0],
    [3, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 7, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 0]
  ]))
*/