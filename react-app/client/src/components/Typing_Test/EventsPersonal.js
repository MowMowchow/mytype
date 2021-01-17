<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>

//get word api and copy code from events init

// call datamuse api
//format into string


//when done, focus on optimizations (bs, bitsets, treemap)

//create character check array
var char_check = [];
var mass_string = "";

//call to word generator API
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

var client = new HttpClient();
mass_string = client.get('https://random-word-api.herokuapp.com/word?number=1000', function(response) {
});


//create inital typing test
//create user string
var personal_test = "";
var user_string = "";
var diff_1 = 0;
var diff_2 = 0;
var value;

//stopwatch
setInterval(updateDisplay, 1000); // every second call updateDisplay


function updateDisplay(){
      value = parseInt($('#timer').find('.value').text(), 10);
    	
    value++;
     $('#timer').find('.value').text(value);
    
}

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


  //use eventkey instead of eventcode which doesnt
  //know the difference between letter cases
  // if time - add binary search for speed
document.addEventListener('keydown', function(event) {

    // add character to user_string
    var j;
    for(j = 0; j < keyboard.length; j ++){
        if (event.key == keyboard_char[j]){
            cur_key = keyboard_char[j];
            user_string = user_string + keyboard_char[j];
            break;
        }
    }

    //do 0,1,2 check
    //the char at the length of the mass string
    if (cur_key == init_test[user_string.length - 1]){
        char_check[user_string.length-1] = 1;
    }
    //option to hit backspace and remove character from user_input string
    else if (cur_key != init_test[user_string.length - 1] && cur_key == ''){
        char_check[user_string.length-1] = 2;
        user_input = user_input.slice(0, user_input.length-1);
    }
    else char_check[user_string.length-1] = 2;

//update occurences + average
    var i;
    for(i = 0; i < keyboard_char.length; i++){
        if (event.key == keyboard_char[i]) {
            cur_key = keyboard_char[i];
            var num_occurences = key_occurrences[cur_key] += 1;
            key_occurrences.set(cur_key, num_occurences);
            diff_2 = value - diff_1;
            diff_1 = value;
                key_averages.set(cur_key,  key_averages[cur_key] + (diff2 - key_averages[cur_key])/key_occurences[cur_key]);

        }
    }
});

//document.addEventListener('keyup', function(event) {
   // key_averages.set(cur_key, key_averages.get(cur_key) + (seconds - key_averages.get(cur_key))/key_occurrences.get(cur_key));
    //map function here
    //use mean algorithm
    // mk = mk-1 + (xk - mk-1)/k
    //num time each character appears
    //average time of each character of k appearances
//});

