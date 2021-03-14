def print_formatted(n):
    # your code goes here
    s = len(str(bin(n))[2:])
    bins = [str(bin(i))[2:] for i in range(1, n+1)]
    octs = [str(oct(i))[2:] for i in range(1, n+1)]
    hexs = [str(hex(i))[2:] for i in range(1, n+1)]
    for i in range(n):
        print(str(i+1).rjust(s, ' '), octs[i].rjust(s, ' '), hexs[i].upper().rjust(s, ' '), bins[i].rjust(s, ' '))

def print_formatted2(n):
    # your code goes here
    s = len(str(bin(n))[2:])
    for i in range(1, n+1):
        print(*(out.upper().rjust(s, ' ') for out in [str(i), str(oct(i))[2:], str(hex(i))[2:], str(bin(i))[2:]]))