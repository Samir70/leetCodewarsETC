# convert 3 rgb numbers (account for out of range 0-255) into 6 digit hex string
def myhex(n):
    chars = '0123456789ABCDEF'
    if n <=0:
        return '00'
    if n >= 255:
        return 'FF'
    left = n // 16
    right = n % 16
    return chars[left]+chars[right]
    
def rgb(r, g, b):
    # your code here :)
    return ''+myhex(r)+myhex(g)+myhex(b)
