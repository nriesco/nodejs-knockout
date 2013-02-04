/*
* This code is intended to help you understand some PHP->JS conversion-related tips
*/


// this array
$PHPArray = array();
$PHPArray[ ] = 'red';
$PHPArray[ ] = 'green';
$PHPArray[ ] = 'blue';

// equals to
var jsArray = [];
jsArray.push('red');
jsArray.push('green');
jsArray.push('blue');


// Sparse arrays (que tienen blancos entremedio)
$PHPArray = array();
$PHPArray[2] = 'red';
$PHPArray[5] = 'green';
$PHPArray[7] = 'blue';


var jsArray = [];
jsArray[2] = 'red';
jsArray[5] = 'green'; 
jsArray[7] = 'blue';
// WARNING: a.length equals 8!

// underlying code:
var jsArray = [];
jsArray[0] = undefined;
jsArray[1] = undefined;
jsArray[2] = 'red';
jsArray[3] = undefined;
jsArray[4] = undefined;
jsArray[5] = 'green';
jsArray[6] = undefined;
jsArray[7] = 'blue';

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
$PHPArray['red'] = 0; 
$PHPArray['green'] = 128; 
$PHPArray['blue'] = 255;

// instead of using [] use {} for object notation
var jsArray = {};
jsArray['red'] = 0; 
jsArray['green'] = 128; 
jsArray['blue'] = 255;

// this will result in the following object
{
	"red" : 0,
	"green" : 128,
	"blue" : 255
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

