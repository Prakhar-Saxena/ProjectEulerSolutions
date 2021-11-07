#!/usr/bin/env python3

def isEven(x):
	if x % 2 == 0:
		return True
	else:
		return False

temp = 0
n = 1
fib = 1
sum = 0

while fib < 4000000:
	if isEven(fib):
		print fib
		sum += fib
	temp = fib
	fib += n
	n = temp

print "sum: ", sum
