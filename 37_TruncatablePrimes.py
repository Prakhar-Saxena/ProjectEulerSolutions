#!/usr/bin/env python3

def isPrime(x):
	if x <= 3:
		return x > 1
	elif x % 2 == 0 or x % 3 == 0:
		return False
	i = 5
	while (i * i) <= x:
		if x % i == 0 or n % (i + 2) == 0:
			return False
	return True

def isTruncatablePrime(x):
	count = 0
	numOfDigits = len(list(string(x)))
	n = x
	if n < 10:
		return False
	while True:
		

n = 0

while True:
	if isPrime(n):
		
