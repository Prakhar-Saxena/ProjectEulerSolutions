#!/usr/bin/env python3

num = 2 ** 1000

def dig(x):
	l = []
	num = x
	i = 0
	while num != 0:
		digit = num % 10
		l.append(digit)
		num /= 10
	
	return l

def sumOfList(x):
	sum = 0
	for i in x:
		sum += i
	return sum

l = dig(num)

print num

print sumOfList(l)
