def bitList(n):
    out = [0, 1, 1]
    power2 = 2
    extra=1
    while len(out)<=n:
        out.append(out[power2] + out[extra]);
        # print(power2, extra, out)
        extra += 1
        if extra == power2:
            extra = 1
            power2 *= 2
            out.append(1)
    return out

def bitCount(n):
    return 0 if n==0 else 1+bitCount(n&(n-1))

pair = [[i, n==bitCount(i)] for i, n in enumerate(bitList(50))]
print(pair)