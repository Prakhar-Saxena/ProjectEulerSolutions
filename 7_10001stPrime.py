#!/usr/bin/env python3

import math

def isPrime(number):
	if number < 2:
		return False
	
	if number == 2:
		return True
	
	if number % 2 == 0:
		return False
	
	max = (number**0.5) + 1
	
	i = 3
	while i <= max:
		if number % i == 0:
			return False
		i += 2
	return True
	
n = 10001

primes = []
i=0
while len(primes) <= 10001:
	if isPrime(i):
		primes.append(i)
	i += 1

print str(primes[n-1])

