#!/usr/bin/env python3

import math

def isPrime(x):
	if x <= 1:
		return False
	elif x <=3:
		return True
	elif x % 2 == 0 or x % 3 == 0:
		return False
	i = 5
	while (i*i) <= x:
		if x % i == 0 or x % (i + 2) == 0:
			return False
		i += 6
	return True

primes = []

for i in range(1,2000000):
	if isPrime(i):
		primes.append(i)

sum = 0
for i in primes:
	sum += i

#print primes
print "sum: ", sum
