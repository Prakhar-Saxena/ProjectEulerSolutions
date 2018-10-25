#!/usr/bin/env python3

def isPrime(x):
	count = 0
	while i in range(2, int(x/2) + 1):
		if x % i == 0:
			return False
	return True

def isFactor(n, x):
	if n % x == 0:
		return True
	else:
		return False

n = 600851475143

lp = 1

for i in range(2, int(n/2) + 1):
	if i > lp and isPrime(i) and isFactor(n, i):
		lp = i

print lp
