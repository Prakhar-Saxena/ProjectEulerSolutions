#!/usr/bin/env python3

import math

def isPrime(number):
      if number < 2:
            return False
      if number % 2 == 0:
            return False
      else:
            for i in range(3, number):
                  if not number % i:
                        return False
            return True 


n = 10001

primes = []
i=0
while True:
	if isPrime(i):
		primes.append(i)
	if len(primes) == n:
		break
	i += 1

print("10001st prime number is: " + str(primes[n-1]))
