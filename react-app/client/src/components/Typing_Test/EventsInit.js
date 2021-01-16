//when done, focus on optimizations (bs, bitsets, treemap)

//create character check array
var char_check = [];

//now, create mass string
//create inital typing test
const init_test = "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous Fortune, Or to take arms against a sea of troubles And by opposing end them. To die, to sleep .- No more. And by a sleep, to say we end The heart-ache and the thousand natural shocks That flesh is heir to; 'tis a consummation Devoutly to be wished. To die, to sleep .- To sleep, perchance to dream .- aye, there's the rub: For in that sleep of death, what dreams may come When we have shuffled off this mortal coil Must give us pause. There's the respect That makes calamity of so long life:";
//create user string
var user_string = "";
var minutes, seconds;

//create global maps
//set occurences and averages map to 0

key_occurrences = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0, 'K': 0, 'L': 0, 'M': 0, 'N': 0, 'O': 0, 'P': 0, 'Q': 0, 'R': 0, 'S': 0, 'T': 0, 'U': 0, 'V': 0, 'W': 0, 'X': 0, 'Y': 0, 'Z': 0, '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '!': 0, '@': 0, '#': 0, '$': 0, '%': 0, '^': 0, '&': 0, '*': 0, '(': 0, ')': 0, '-': 0, '': 0, '=': 0, '+': 0, '`': 0, '~': 0, '[': 0, ']': 0, '{': 0, '}': 0, '|': 0, ';': 0, ':': 0, "'": 0, '"': 0, ',': 0, '<': 0, '.': 0, '>': 0, '/': 0, '?': 0};
key_averages = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0, 'K': 0, 'L': 0, 'M': 0, 'N': 0, 'O': 0, 'P': 0, 'Q': 0, 'R': 0, 'S': 0, 'T': 0, 'U': 0, 'V': 0, 'W': 0, 'X': 0, 'Y': 0, 'Z': 0, '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '!': 0, '@': 0, '#': 0, '$': 0, '%': 0, '^': 0, '&': 0, '*': 0, '(': 0, ')': 0, '-': 0, '': 0, '=': 0, '+': 0, '`': 0, '~': 0, '[': 0, ']': 0, '{': 0, '}': 0, '|': 0, ';': 0, ':': 0, "'": 0, '"': 0, ',': 0, '<': 0, '.': 0, '>': 0, '/': 0, '?': 0};


//create global cur_key
//this is also equivalent to backspace
var cur_key = '';

// create array of all keyboard characters 
// so that event.key can check for each character

keyboard_char = ['a','b','c','d','e','f','g','h','i','j','k',
'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 
'-', '_', '=', '+',  '`', '~', '[', ']', '{', '}', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];

//fix this
var intervalID = false;

function startTimer(duration, display){
var timer = duration;

intervalID = setInterval(function () {
minutes = parseInt(timer / 60, 10);
seconds = parseInt(timer % 60, 10);

// modify these conditions (not good)
minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;

display.textContent = minutes + ":" + seconds;

if (--timer < 0) {
    console.log("window.open('1.html', '_self')");
  }
} , 1000);

}
// changes five minute marker to unlimited??? 
// make condition where if last char inputed is correct, (know from user_string)
// timer will stop
var start = timeFunction = function() {
    var fiveMinutes = 1 * 10,
      display = document.querySelector('#time');
      
    startTimer(fiveMinutes, display);
  };
  
  var timesdown = 0

  //use eventkey instead of eventcode which doesnt
  //know the difference between letter cases

  //loop the events to check for the correct char that is inputed
  //maybe not neeeded since parameters dont matter for which key is pressed
  // if time - add binary search for speed
document.addEventListener('keydown', function(event) {

    // add character to user_string
    var j;
    for(j = 0; j < keyboard.length; j ++){
        if (event.key == keyboard_char[j]){
            cur_key = keyboard_char[j];
            user_string = user_string + keyboard_char[j];
        }
    }

    //do 0,1,2 check
    //the char at the length of the mass string)
    if (cur_key == init_test[init_test.length - 1]){
        char_check[init_test.length-1] = 1;
    }
    //option to hit backspace and remove character from user_input string
    else if (cur_key != init_test[init_test.length - 1] && cur_key == ''){
        char_check[init_test.length-1] = 2;
        user_input = user_input.splice(user_input.length-1);
    }
    else char_check[init_test.length-1] = 2;

    
    if (timesdown == 0){
    var i;
    for(i = 0; i < keyboard_char.length; i++){
        if (event.key == keyboard_char[i]) {
            cur_key = keyboard_char[i];
            var num_occurences = key_occurrences.get(cur_key) += 1;
            key_occurrences.set(cur_key, num_occurences);
            start();
            timesdown = 1;
        }
    }
}
});

document.addEventListener('keyup', function(event) {
    timesdown = 0;
    key_averages.set(cur_key, key_averages.get(cur_key) + (seconds - key_averages.get(cur_key))/key_occurrences.get(cur_key));
    //map function here
    //use mean algorithm
    // mk = mk-1 + (xk - mk-1)/k
    //num time each character appears
    //average time of each character of k appearances


    clearInterval(intervalID);
});




//still have to call word api (or database of words)

