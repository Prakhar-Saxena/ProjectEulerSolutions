#!/usr/bin/env python3

def fact(x):
	if x == 0 or x == 1:
		return 1
	else:
		return (x * fact(x-1))

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

num = fact(100)

digs = dig(num)

sum = sumOfList(digs)

print digs

print sum
