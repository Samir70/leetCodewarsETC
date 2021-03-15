limit = 1000
ints = [0]*(limit*limit)
p = 2
while p < limit:
    for i in range(2*p, limit*limit, p):
        ints[i] = 1
    p += 1
    while ints[p] == 1:
        p += 1
primes = []
for i in range(2, limit*limit):
    if ints[i] == 0:
        primes.append(i)
# print(primes)

t = int(input().strip())
for a0 in range(t):
    n = int(input().strip())
    factors = []
    original = n
    i = 0
    while i < len(primes) and primes[i] <= n:
        p = primes[i]
        if (n % p == 0):
            factors.append(p)
            while n%p == 0:
                n = n//p
        i += 1
    print(n if n > 1 else factors[-1])