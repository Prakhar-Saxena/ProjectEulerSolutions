#!/usr/bin/env python3

def factors(x):
	l = []
	for i in range(1, x + 1):
		if x % i == 0:
			l.append(i)
	return l

def intersection(a, b):
	l = []
	for i in a:
		if i in b:
			l.append(i)
	return l

def phi(x):
	l = []
	factorX = factors(x)
	for i in range(1, x):
		factorI = factors(i)
		if intersection (factorX, factorI) == [1]:
			l.append(i)
	return len(l)

max = 0
res = 0

for n in range(2, 1000000):
	boi = ( n / phi(n) )
	if boi > max:
		max = boi
		res = n

print res
