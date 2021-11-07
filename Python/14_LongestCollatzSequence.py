#!/usr/bin/env python3

def nextNum(x):
	if (x % 2) == 0:
		return (x/2)
	else:
		return ((3*x) +1)

def chainLen(x):
	next = nextNum(x)
	if next == 1:
		return 1
	else:
		return 1 + chainLen(next)

maxLen = 1
num = 0

for i in range(1, 1000000):
	cl = chainLen(i) + 1
	if cl > maxLen:
		maxLen = cl
		num = i

print num
