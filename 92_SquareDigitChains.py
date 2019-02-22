#!/usr/bin/env python3

def getDigits(x):
	l = []
	num = x
	rem = 0
	while num != 0:
		rem = num % 10
		num /= 10
		l.append(rem)
	return l

def chain(x):
	l = []
	l.append(x)
	n = x
	while n != 1 and n != 89:
		digits = getDigits(n)
		next = 0
		for i in digits:
			next += i * i
		n = next
		l.append(n)
	return l

count = 0
for i in range(1, 10000000):
	l = chain(i)
	if l[len(l)-1] == 89:
		count += 1

print count
