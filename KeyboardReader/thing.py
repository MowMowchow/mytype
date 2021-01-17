from tkinter import font as tkfont  # python 3
import threading
import tkinter as tk
import pyrebase
import keyboard
import time
from pymongo import MongoClient
import logging

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

client = MongoClient("mongodb+srv://jason:Fuadisnot123@mytype.wfzap.mongodb.net/MyType?retryWrites=true&w=majority")
db = client.get_database('MyType')

email_confirm = ""


class KeyboardReader:

    def __init__(self):
        self._running = True

    def terminate(self):
        self._running = False

    def run(self, email):

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

        while self._running == True:
            event = keyboard.read_event()
            if event.event_type == "up":
                if t1 == 0:
                    t1 = event.time
                elif t1 != 0 and len(event.name) <= 1:
                    curr_word += event.name
                    # print("time taken between keys " + str(event.time - t1))

                    if abs(event.time - t1) <= 2:
                        counts[event.name] += 1
                        averages[event.name] += (((event.time - t1) - averages[event.name]) / counts[event.name])
                    t1 = float(event.time)

                elif event.name == "space":
                    words += 1
                    wpm_avg = (words / abs(timestart - time.time())) * 60
                    curr_word = ""
                    print(wpm_avg)

            if abs(time_track - time.time()) > 20 and event.event_type == "up" and len(event.name) <= 1:
                users = db.users

                already_saved_paths = users.find_one({'Email': str(email)})

                sum_avg_alphabet = {key: (already_saved_paths['Alphabet'][key] + averages[key]) / 2
                                    for key in already_saved_paths['Alphabet']}

                time_track = time.time()
                newvalues = {"$set": {"Alphabet": sum_avg_alphabet}}

                # print(averages)
                users.update_one(already_saved_paths, newvalues).modified_count


class SampleApp(tk.Tk):

    def __init__(self, *args, **kwargs):
        tk.Tk.__init__(self, *args, **kwargs)

        self.title_font = tkfont.Font(family='Helvetica', size=18, weight="bold", slant="italic")

        # the container is where we'll stack a bunch of frames
        # on top of each other, then the one we want visible
        # will be raised above the others
        self.container = tk.Frame(self)
        self.container.pack(side="top", fill="both", expand=True)
        self.container.grid_rowconfigure(0, weight=1)
        self.container.grid_columnconfigure(0, weight=1)

        self.frames = {}
        for F in (StartPage, MainPage):
            page_name = F.__name__
            frame = F(parent=self.container, controller=self, email=None)
            self.frames[page_name] = frame

            # put all of the pages in the same location;
            # the one on the top of the stacking order
            # will be the one that is visible.
            frame.grid(row=0, column=0, sticky="nsew")

        self.show_frame("StartPage")

    def show_frame(self, page_name, email=None):
        '''Show a frame for the given page name'''
        frame = self.frames[page_name]
        frame.tkraise()
        if email is not None:
            k = KeyboardReader()
            t = threading.Thread(target=k.run, args=(email,))
            t.start()

    def go_to_main(self, email):
        '''Show a frame for the given page name'''
        frame = MainPage(parent=self.container, controller=self, email=email)
        frame.grid(row=0, column=0, sticky="nsew")

        frame.tkraise()
        k = KeyboardReader()
        t = threading.Thread(target=k.run, args=(email,))
        t.start()


class StartPage(tk.Frame):

    def __init__(self, parent, controller, email=None):
        tk.Frame.__init__(self, parent)

        self.email_confirm = ""

        def attempt_login():
            try:
                email = entry_user.get()
                password = entry_pass.get()
                login = auth.sign_in_with_email_and_password(email, password)

                controller.go_to_main(email)
            except:
                status['text'] = "Invalid email or password"

        self.controller = controller
        login_label = tk.Label(self, text="Username")
        login_label.pack(side="top", fill="x", pady=10)

        entry_user = tk.Entry(self)
        entry_user.pack()

        label_pass = tk.Label(self, text="Password")
        label_pass.pack()

        entry_pass = tk.Entry(self)
        entry_pass.pack()

        button2 = tk.Button(self, text="Login",
                            command=attempt_login)
        button2.pack()

        status = tk.Label(self, text="")
        status.pack(side="top", fill="x", pady=10)


class MainPage(tk.Frame):

    def __init__(self, parent, controller, email):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        self.email = email

        label = tk.Label(self, text=self.email, font=controller.title_font)
        label.pack(side="top", fill="x", pady=10)


if __name__ == "__main__":
    app = SampleApp()
    app.mainloop()
