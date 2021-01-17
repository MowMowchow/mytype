var char_check = [];

//now, create mass string
//create inital typing test

//having problems with shift
const personal_test = "to be or not to be, that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles and by opposing end them. to die, to sleep .- no more. and by a sleep, to say we end the heart-ache and the thousand natural shocks that flesh is heir to; 'tis a consummation devoutly to be wished. to die, to sleep .- to sleep, perchance to dream .- aye, there's the rub: for in that sleep of death, what dreams may come when we have shuffled off this mortal coil must give us pause. there's the respect that makes calamity of so long life:";
//create user string
var user_string = "";
var diff_1 = 0;
var diff_2 = 0;
var value;
var occur_sum = 0;

var cur_key = '';

//stopwatch
setInterval(updateDisplay, 1000); // every second call updateDisplay


function updateDisplay(){
      value = parseInt($('#timer').find('.value').text(), 10);
    	
    value++;
     $('#timer').find('.value').text(value);
    
}

let key_occurrences = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0, 'K': 0, 'L': 0, 'M': 0, 'N': 0, 'O': 0, 'P': 0, 'Q': 0, 'R': 0, 'S': 0, 'T': 0, 'U': 0, 'V': 0, 'W': 0, 'X': 0, 'Y': 0, 'Z': 0, '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '!': 0, '@': 0, '#': 0, '$': 0, '%': 0, '^': 0, '&': 0, '*': 0, '(': 0, ')': 0, '-': 0, '': 0, '=': 0, '+': 0, '`': 0, '~': 0, '[': 0, ']': 0, '{': 0, '}': 0, '|': 0, ';': 0, ':': 0, "'": 0, '"': 0, ',': 0, '<': 0, '.': 0, '>': 0, '/': 0, '?': 0};

let key_averages = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0, 'K': 0, 'L': 0, 'M': 0, 'N': 0, 'O': 0, 'P': 0, 'Q': 0, 'R': 0, 'S': 0, 'T': 0, 'U': 0, 'V': 0, 'W': 0, 'X': 0, 'Y': 0, 'Z': 0, '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '!': 0, '@': 0, '#': 0, '$': 0, '%': 0, '^': 0, '&': 0, '*': 0, '(': 0, ')': 0, '-': 0, '': 0, '=': 0, '+': 0, '`': 0, '~': 0, '[': 0, ']': 0, '{': 0, '}': 0, '|': 0, ';': 0, ':': 0, "'": 0, '"': 0, ',': 0, '<': 0, '.': 0, '>': 0, '/': 0, '?': 0};

// ????????? for some reason this is buggy
key_averages['a'] = 0 

const keyboard_char = ['a','b','c','d','e','f','g','h','i','j','k',
'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 
'-', '_', '=', '+',  '`', '~', '[', ']', '{', '}', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?', ' '];



document.addEventListener('onkeydown', function(event) {
	if (event.key == 'Backspace') {user_string = user_string.slice(0, occur_sum-1)};
  
});


document.addEventListener('keydown', function(event) {
   cur_key = '';
    // add character to user_string
    var j;
    for(j = 0; j < keyboard_char.length; j ++){
        if (event.key == keyboard_char[j]){
            cur_key = keyboard_char[j];
            break;
        }
       }
  
	  //if its correct they dont have an option to backspace more
    //do 0,1,2 check
    //the char at the length of the mass string
    //make sure its char to char check
    if (cur_key == personal_test.charAt(user_string.length)){
        user_string = user_string + keyboard_char[j];
        char_check[user_string.length] = 1;
    }
    //option to hit backspace and remove character from user_input string
    if (cur_key != personal_test.charAt(user_string.length)){
        char_check[user_string.length] = 2;
        user_string = user_string.slice(0, user_string.length);
        
    }
//update occurences + average
    var i;
    for(i = 0; i < keyboard_char.length; i++){
        if (event.key == keyboard_char[i]) {
            cur_key = keyboard_char[i];
            var num_occurences = key_occurrences[cur_key] += 1;
            key_occurrences[cur_key] = num_occurences;
            diff_2 = value - diff_1;
            diff_1 = value;
            key_averages[cur_key] = key_averages[cur_key] + (diff_2 - key_averages[cur_key]/key_occurrences[cur_key]);
        }
    }
//    console.log(key_averages);
});
    