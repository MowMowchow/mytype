import keyboard
import time
import pyrebase

firebaseConfig = {
    "apiKey": "AIzaSyAutqLzz7ib4oWEoOzSo95WwrHd4bpZqF8",
    "authDomain": "mytype-1702e.firebaseapp.com",
    "projectId": "mytype-1702e",
    "storageBucket": "mytype-1702e.appspot.com",
    "messagingSenderId": "804403920555",
    "appId": "1:804403920555:web:0458f9894a0604062401ee",
    "databaseURL": "https://mytype-1702e.firebaseio.com"
}


def main():
    login_state = False
    while not login_state:
        firebase = pyrebase.initialize_app(firebaseConfig)
        auth = firebase.auth()

        email = input("What's your email?")
        password = input("What's your password?")

        try:
            login = auth.sign_in_with_email_and_password(email, password)
            login_state = True
        except:
            print("Invalid email or password")

    long = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
            '-', '', '=', '+', '`', '~', '[', ']', '{', '}', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?']

    t1 = 0
    averages = {item: 0 for item in long}
    counts = {item: 0 for item in long}
    wpm_avg, words = 0, 0
    timestart = time.time()
    curr_word = ""
    while True:
        event = keyboard.read_event()
        if event.event_type == "up":
            if t1 == 0:
                t1 = event.time
            elif t1 != 0 and len(event.name) <= 1:
                curr_word += event.name
                # print("time taken between keys " + str(event.time - t1))
                counts[event.name] += 1
                averages[event.name] += (((event.time - t1) - averages[event.name]) / counts[event.name])
                t1 = float(event.time)
            elif event.name == "space":
                words += 1
                wpm_avg = (words / abs(timestart - time.time())) * 60
                curr_word = ""
                print(wpm_avg)

        # print(averages)


if __name__ == "__main__":
    main()
