#!/usr/bin/env python3

def isFactor(n, x):
	if n % x == 0:
		return True
	else:
		return False
i = 232792555

while True:
	print i
	factorCount = 0
	for j in range(1, 21):
		if isFactor(i, j):
			factorCount += 1
		else:
			break
	if factorCount == 20:
		print i
		break
	i += 1
