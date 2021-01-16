import keyboard
import time
import pyrebase
from pymongo import MongoClient

client = MongoClient("mongodb+srv://jason:Fuadisnot123@mytype.wfzap.mongodb.net/MyType?retryWrites=true&w=majority")
db = client.get_database('MyType')
users = db.users

firebaseConfig = {
    "apiKey": "AIzaSyAutqLzz7ib4oWEoOzSo95WwrHd4bpZqF8",
    "authDomain": "mytype-1702e.firebaseapp.com",
    "projectId": "mytype-1702e",
    "storageBucket": "mytype-1702e.appspot.com",
    "messagingSenderId": "804403920555",
    "appId": "1:804403920555:web:0458f9894a0604062401ee",
    "databaseURL": "https://mytype-1702e.firebaseio.com"
}


def read():
    already_saved_paths = users.find_one({'Email': str(email)})

    long = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '%', '^', '&', '*', '(', ')',
            '-', '', '=', '+', '`', '~', '[', ']', '{', '}', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?']

    t1 = 0
    averages = {item: 0 for item in long}
    counts = {item: 0 for item in long}
    wpm_avg, words = 0, 0
    time_track, timestart = time.time(), time.time()
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
        if abs(time_track - time.time()) > 20 and event.event_type == "up":
            print("upload")

            time_track = time.time()
            newvalues = {"$set": {"alphabets": averages}}

            users.update_one(already_saved_paths, newvalues)


if __name__ == "__main__":
    read()
