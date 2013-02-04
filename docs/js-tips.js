/*
* This code is intended to help you understand some PHP->JS conversion-related tips
*/


// this array
$PHPArray = array();
$PHPArray[ ] = 'Santiago';
$PHPArray[ ] = 'Pucón';
$PHPArray[ ] = 'Punta Arenas';

// equals to
var jsArray = [];
jsArray.push('Santiago');
jsArray.push('Pucón');
jsArray.push('Punta Arenas');


// Sparse arrays (que tienen blancos entremedio)
$PHPArray = array();
$PHPArray[100] = 'Santiago';
$PHPArray[200] = 'Pucón';
$PHPArray[300] = 'Punta Arenas';


var jsArray = [];
jsArray[100] = 'Santiago';
jsArray[200] = 'Pucón'; 
jsArray[300] = 'Punta Arenas';
// WARNING: a.length equals 301!

// underlying code:
var jsArray = [];
jsArray[0] = undefined;
...
jsArray[99] = undefined;
jsArray[100] = 'Santiago';
jsArray[101] = undefined;
...
jsArray[199] = undefined;
jsArray[200] = 'Pucón';
jsArray[201] = undefined;
...
jsArray[299] = undefined;
jsArray[300] = 'Punta Arenas';

// implement count() for arrays
function count(array) {
	var count = 0;
	for (var i = 0; i < array.length; ++i) {
		if ((typeof array[i]) != 'undefined') { 
			++count;
		}
	}
	return count; 
}


// associative arrays (objects in JS)
$PHPArray = array(); 
$PHPArray['Santiago'] = 13; 
$PHPArray['Pucón'] = 9; 
$PHPArray['Punta Arenas'] = 12;

// instead of using [] use {} for object notation
var jsArray = {};
jsArray['Santiago'] = 13; 
jsArray['Pucón'] = 9; 
jsArray['Punta Arenas'] = 12;

// this will result in the following object
{
	"Santiago" : 13,
	"Pucón" : 9,
	"Punta Arenas" : 12
}

// implement count() for objects
function count(thisObject) {
	return Object.keys(thisObject).length;
}

// combined implementation
function count(arrayOrObject) { 
	var count = 0;
	if (arrayOrObject instanceof Array) {
		for (var i = 0; i < arrayOrObject.length; ++i) {
			if ((typeof arrayOrObject[i]) != 'undefined') {	
				++count; 
			}
		}
	} else {
		count = Object.keys(arrayOrObject).length;
	}
	return count; 
}


// multidimensional arrays (asoc)
$PHPArray = array();
$PHPArray['meetup']['name'] = 'Dynlang';

var a = {};
a['meetup']['name'] = 'Dynlang';

// or
$PHPArray = array();
$PHPArray['meetup'] = array();
$PHPArray['meetup']['name'] = 'Dynlang';

var a = {};
a['meetup'] = { };
a['meetup']['name'] = 'Dynlang';

