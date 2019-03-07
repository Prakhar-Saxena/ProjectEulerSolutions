#!/usr/bin/env python3

def numOfDiv(x):
	nod = 2
	for i in range(2, int(x/2) + 1):
		if (x % i) == 0:
			nod += 1
	return nod

def sumOfNum(x):
	sum = 0
	for i in range(0, x + 1):
		sum += i
	return sum

i = 1
while True:
	n = sumOfNum(i)
	nod = numOfDiv(n)
	if nod >= 500:
		print "BOI", n
		print i
		break
	i += 1

