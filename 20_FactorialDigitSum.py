#!/usr/bin/env python3

def fact(x):
	if x == 0 or x == 1:
		return 1
	else:
		return (x * fact(x-1))

def digitProd(x):
	n = x
	p = 1
	while n:
		p *= n % 10
		n /= 10
	return p

num = fact(100)
d = 1
d = digitProd(num)

print d
