#!/usr/bin/env python3

def getDigits(x):
	l = []
	num = x
	rem = 0
	while num != 0:
		rem = num % 10
		num /= 10
		l.append(rem)
	return l[::-1]

def isIncreasing(x):
	l = getDigits(x)
	size = len(l)
	count = 0
	for i in range(0,size-2):
		if l[i] < l[i+1]:
			count += 1
	if count == size-2:
		return True
	else:
		return False

def isDecreasing(x):
	l = getDigits(x)
	size = len(l)
	count = 0
	for i in range(0,size-2):
		if l[i] > l[i+1]:
			count += 1
	if count == size-2:
		return True
	else:
		return False

def isBouncy(x):
	if x < 100:
		return False

	if isDecreasing(x) == False and isIncreasing(x) == False:
		return True
	else:
		return False

print isBouncy(12345)
print isBouncy(54321)
print isBouncy(12321)

print isBouncy(121)
