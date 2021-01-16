import keyboard


def main():
    long = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
            '-', '', '=', '+', '`', '~', '[', ']', '{', '}', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?']

    t1 = 0
    averages = {item: 0 for item in long}
    counts = {item: 0 for item in long}
    while True:
        event = keyboard.read_event()
        if event.event_type == "up":
            if t1 == 0:
                t1 = event.time
            elif t1 != 0:
                # print("key pressed " + event.name)
                print("time taken between keys " + str(event.time - t1))

                if len(event.name) <= 1:
                    counts[event.name] += 1
                    averages[event.name] += (((event.time - t1) - averages[event.name]) / counts[event.name])
                t1 = float(event.time)
        print(averages)


if __name__ == "__main__":
    main()
