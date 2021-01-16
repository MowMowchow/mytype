import threading
import tkinter as tk
import pyrebase
import keyboard
import time
from pymongo import MongoClient
import logging

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
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()


class KeyboardReader:

    def __init__(self):
        self._running = True

    def terminate(self):
        self._running = False

    def run(self, email):
        already_saved_paths = users.find_one({'Email': str(email)})

        long = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '%', '^', '&', '*', '(', ')',
                '-', '', '=', '+', '`', '~', '[', ']', '{', '}', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/',
                '?']

        t1 = 0
        averages = {item: 0 for item in long}
        counts = {item: 0 for item in long}
        wpm_avg, words = 0, 0
        time_track, timestart = time.time(), time.time()
        curr_word = ""

        print("adwad")
        logging.info("Thread %s: starting", "thing")

        while self._running == True:
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


class App(tk.Tk):
    def __init__(self):
        tk.Tk.__init__(self)
        self._frame = None
        self.switch_frame(StartPage)

    def switch_frame(self, frame_class):
        new_frame = frame_class(self)
        if self._frame is not None:
            self._frame.destroy()
        self._frame = new_frame
        self._frame.pack()


class StartPage(tk.Frame):
    def __init__(self, master):
        tk.Frame.__init__(self, master)

        def attempt_login():
            email = entry_user.get()
            password = entry_pass.get()
            login = auth.sign_in_with_email_and_password(email, password)
            status['text'] = "Logged in successfully"
            master.switch_frame(MainPage)

        label_user = tk.Label(text="Login")
        entry_user = tk.Entry()
        label_pass = tk.Label(text="Password")
        entry_pass = tk.Entry()
        button = tk.Button(
            text="Click me!",
            width=25,
            height=5,
            bg="blue",
            fg="yellow",
            command=attempt_login
        )

        status = tk.Label(text="")

        label_user.pack()
        entry_user.pack()
        label_pass.pack()
        entry_pass.pack()
        button.pack()
        status.pack()


class MainPage(tk.Frame):
    def __init__(self, master):
        tk.Frame.__init__(self, master)

        label_user = tk.Label(text="Login")
        entry_user = tk.Entry()
        label_pass = tk.Label(text="Password")
        entry_pass = tk.Entry()
        button = tk.Button(
            text="Click me!",
            width=25,
            height=5,
            bg="blue",
            fg="yellow"
        )

        status = tk.Label(text="")

        label_user.pack()
        entry_user.pack()
        label_pass.pack()
        entry_pass.pack()
        button.pack()
        status.pack()


if __name__ == "__main__":
    a = App()
    a.mainloop()
