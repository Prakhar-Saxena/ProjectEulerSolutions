#!/usr/bin/env python3

def factors(x):
	l = []
	for i in range(1,x):
		if x % i == 0:
			l.append(i)
	return l

def isPerfect(x):
	fl = factors(x)
	sumOfFact = sum(fl)
	if sumOfFact == x:
		return True
	else:
		return False

def isDeficient(x):
	fl = factors(x)
	sumOfFace = sum(fl)
	if sumOfFact == x
