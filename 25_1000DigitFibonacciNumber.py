#!/usr/bin/env python3

def numOfDigits(x):
	return( len( str( x ) ) )

temp = 0
n = 1
fib = 1
sum = 0

count = 2
while numOfDigits(fib) != 1000:
	temp = fib
	fib += n
	n = temp
	count += 1

print fib
print numOfDigits(fib)
print count
