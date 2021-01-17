from tkinter import font as tkfont  # python 3
import threading
import tkinter as tk
import pyrebase
import keyboard
import time
from pymongo import MongoClient
import sys

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


class KeyboardReader:

    def __init__(self):
        self._running = True

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

        while self._running:
            event = keyboard.read_event()
            if event.event_type == "up":
                if t1 == 0:
                    t1 = event.time
                elif t1 != 0 and len(event.name) <= 1 and event.name in long:
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

            if abs(time_track - time.time()) >= 10 and event.event_type == "up" and len(event.name) <= 1:
                users = db.users

                already_saved_paths = users.find_one({'Email': str(email)})

                sum_avg_alphabet = {}

                for key in already_saved_paths['Alphabet']:
                    if already_saved_paths['Alphabet'][key] != averages[key]:
                        sum_avg_alphabet[key] = (already_saved_paths['Alphabet'][key] + averages[key]) / 2
                    else:
                        sum_avg_alphabet[key] = already_saved_paths['Alphabet'][key]

                arr = already_saved_paths['wpm_list']

                new_arr = [wpm_avg]
                for i in range(len(arr) - 1):
                    new_arr.append(arr[i])

                newvalues = {"$set": {"wpm_list": new_arr, "Alphabet": sum_avg_alphabet}}

                time_track = time.time()

                print(users.update_one(already_saved_paths, newvalues).modified_count)


class App(tk.Tk):

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
        F = StartPage
        page_name = F.__name__
        frame = F(parent=self.container, controller=self)
        self.frames[page_name] = frame

        # put all of the pages in the same location;
        # the one on the top of the stacking order
        # will be the one that is visible.
        frame.grid(row=0, column=0, sticky="nsew")

        self.show_frame("StartPage")

    def show_frame(self, page_name):
        '''Show a frame for the given page name'''
        frame = self.frames[page_name]
        frame.tkraise()

    def go_to_main(self, email):
        '''Show a frame for the given page name'''
        frame = MainPage(parent=self.container, controller=self, email=email)
        frame.grid(row=0, column=0, sticky="nsew")

        frame.tkraise()
        k = KeyboardReader()
        t = threading.Thread(target=k.run, args=(email,))
        t.daemon = True
        t.start()


class StartPage(tk.Frame):

    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.configure(background='#2B2D42')

        def attempt_login():
            try:
                email = entry_user.get()
                password = entry_pass.get()
                login = auth.sign_in_with_email_and_password(email, password)

                users = db.users
                already_saved_paths = users.find_one({'Email': str(email)})
                if not already_saved_paths['wpm_list']:
                    newvalues = {"$set": {"wpm_list": [0 for _ in range(20)]}}
                    print(users.update_one(already_saved_paths, newvalues).modified_count)

                controller.go_to_main(email)
            except:
                status['text'] = "Invalid email or password"

        self.controller = controller

        titleFont = tkfont.Font(family='MS Reference Sans Serif', name='buttonFont', size=20, weight='bold')
        buttonFont = tkfont.Font(family='PT Sans Narrow', name='appHighlightFont', size=12, weight='bold')

        loginfont = tkfont.Font(family='MS Reference Sans Serif', name='loginfont', size=10)

        title = tk.Label(self, text="MyType", font=titleFont, bg="#2B2D42", fg="#EDF2F4")
        title.pack(side="top", fill="x", padx=20, pady=5)

        login_label = tk.Label(self, text="Username", font=buttonFont, bg="#2B2D42", fg="#E0BF6E")
        login_label.pack(side="top", fill="x", padx=20, pady=3)

        entry_user = tk.Entry(self)
        entry_user.pack(padx='20', pady='5')

        label_pass = tk.Label(self, text="Password", font=buttonFont, bg="#2B2D42", fg="#E0BF6E")
        label_pass.pack(padx='20', pady='3')

        entry_pass = tk.Entry(self)
        entry_pass.pack(padx='20', pady='5')

        button2 = tk.Button(self, text="Login",
                            command=attempt_login, font=loginfont, bg="#2B2D42", fg="#E0BF6E", relief="sunken")
        button2.pack()

        status = tk.Label(self, text="", bg="#2B2D42", fg="#E0BF6E")
        status.pack(side="top", fill="x", pady=5)


class MainPage(tk.Frame):

    def __init__(self, parent, controller, email):
        tk.Frame.__init__(self, parent)
        self.configure(background='#2B2D42')
        self.controller = controller
        self.email = email

        titleFont = tkfont.Font(family='MS Reference Sans Serif', name='buttonFont', size=20, weight='bold')
        buttonFont = tkfont.Font(family='PT Sans Narrow', name='appHighlightFont', size=12, weight='bold')
        loginfont = tkfont.Font(family='MS Reference Sans Serif', name='loginfont', size=10, weight='bold')

        title = tk.Label(self, text="MyType", font=titleFont, bg="#2B2D42", fg="#EDF2F4")
        title.pack(side="top", fill="x", padx=20, pady=5)

        heading = tk.Label(self, text="Current Logged in user:", bg="#2B2D42", fg="#EDF2F4", font=loginfont)
        heading.pack(side="top", fill="x", pady=10)

        user_title = tk.Label(self, text=self.email, bg="#2B2D42", fg="#FE6D73", font=buttonFont)
        user_title.pack(side="top", fill="x", pady=2)

        notice = "MyType is currently tracking your keystrokes and reporting time data back to our servers."

        message = tk.Label(self, text=notice, bg="#2B2D42", fg="#D7E2E6", font=buttonFont, wraplength="150")
        message.pack(side="top", fill="x", pady=2)

        notice1 = "To view your statistics, please login to your profile at https://mytypee.herokuapp.com/"

        message1 = tk.Label(self, text=notice1, bg="#2B2D42", fg="#D7E2E6", font=buttonFont, wraplength="150")
        message1.pack(side="top", fill="x", pady=5)


def on_closing():
    app.destroy()
    sys.exit()


if __name__ == "__main__":
    app = App()
    app.protocol("WM_DELETE_WINDOW", lambda: on_closing())
    app.mainloop()
