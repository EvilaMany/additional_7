"use strict"
//module.exports = 
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

	//преебираем все строки 
	for (let y in matrix) 
	{ 
		for(let x in matrix[y])
		{
			if(typeof(matrix[y][x]) != "object") continue;
			

			for(let number in matrix[y][x])
			{
				//ищем, возможно в строке это число может стоять только в текущей ячейке
				let foundInLine = false;
				for(let x2 in matrix[y])
				{

					//console.log( matrix[y][x2] )
					if(x == x2 || typeof(matrix[y][x2]) != 'object') continue;
					
					if(matrix[y][x2].indexOf(number) != -1)
					{
						foundInLine = true;
						break;
					}
				}
				if(foundInLine == false)
				{
					matrix[y][x] = number;
					break;
				}

				//ищем, возможно в блоке число может стоять только в текущей ячейке
				let foundInBlock = false;
				
				var blockY = Math.floor(y / 3) *3//границы блока
				var blockX = Math.floor(x / 3) *3
				for(let by = blockY; by < blockY+3; by++) {
					for(let bx = blockX;bx < blockX+3;bx++) {
						if(by == y && bx == x || typeOf(matrix[by][bx]) != 'object') continue;
						if(matrix[by][bx].indexOf(number) != -1)
						{
							foundInBlock = true;
							break;
						}
					}
				}
				
				if(foundInBlock == false)
				{
					matrix[y][x] = number;
					break;
				}
			}
		}
	} 
	console.log(matrix)

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
} 


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