#!/usr/bin/env python3

def factorial(x):
	if x == 1 or x == 0:
		return 1
	else:
		return x*factorial(x-1)

def Comb(n,r):
	c = ( factorial(n) / ( factorial(r) * factorial(n-r) )  )
	return c

count = 0

for n in range(1, 101):
	for r in range(1, n):
		if Comb(n, r) > 1000000:
			count += 1

print count
