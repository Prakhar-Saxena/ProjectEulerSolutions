#!/usr/bin/env python3

def numOfDiv(x):
	nod = 1
	for i in range(2,x):
		if (x % i) == 0:
			nod += 1
	return nod

def sumOfNum(x):
	sum = 0
	for i in range(0,x+1):
		sum += i
	return sum

i = 1
while True:
	n = sumOfNum(i)
	if numOfDiv(n) >= 500:
		print n
		print i
		break
	i += 1

