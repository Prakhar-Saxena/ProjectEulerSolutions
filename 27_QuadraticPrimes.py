#!/usr/bin/env python3

def isPrime(x):
	if x <= 3:
		return x > 1
	elif x % 2 == 0 or x % 3 == 0:
		return false
	i = 5
	while (i * i) <= x:
		if x % i == 0 or n % (i + 2) == 0:
			return false
	return true

# (n^2) + (a*n) + b

maxPrimeCount = 0

for a in range (-999,999):
	for b in range(-1000,1000):
		n = 0
		primeCount = 0
		while isPrime( ( (n^2) + (a*n) + (b) ) ):
			primeCount += 1
		if primeCount > maxPrimeCount:
			print "a =", a
			print "b =", b
