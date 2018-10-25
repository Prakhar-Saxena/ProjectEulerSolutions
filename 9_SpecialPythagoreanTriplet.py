#!/usr/bin/env python3

import math

def isTriplet(a, b, c):
	if (a*a) + (b*b) == (c*c) and a % 1 == 0 and b % 1 == 0 and c % 1 == 0:
		return True
	else:
		return False

def isPerfectPair(a, b):
	if math.sqrt( (a*a) + (b*b) ) % 1 == 0:
		return True
	else:
		return False

for a in range(1, 1000):
	foundIt = False
	for b in range(a, 1000):
		cSq = (a*a) + (b*b)
		c = math.sqrt(cSq)
		if c % 1 == 0 and a + b + c == 1000:
			print a, b, c, a + b + c
			foundIt = True
			break
	if foundIt:
		break
