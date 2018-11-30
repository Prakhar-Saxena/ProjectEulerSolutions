#!/usr/bin/env python3

def listOfDivisors(n):
	l = []
	for i in range(1,n):
		if n % i == 0:
			l.append(i)
	return l

def d(n):
	l = listOfDivisors(n)
	return len(l)

def isAmicable(a,b):
	if a != b and d(a) == b and d(b) == a:
		return True
	else:
		return False
