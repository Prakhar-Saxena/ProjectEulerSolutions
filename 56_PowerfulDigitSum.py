#!/usr/bin/env python3

def sumList(x):
	l = (list(str(x)))
	sum = 0
	for i in l:
		sum += int(i)
	return sum

max = 0

for a in range(1, 100):
	for b in range(1, 100):
		sum = sumList(a**b)
		if sum > max:
			max = sum

print max
