#!/usr/bin/env python3

def square(x):
	return x*x

def add(lst):
	sum = 0
	for i in lst:
		sum += i
	return sum

arr = range(1,100)

arrSq = []

for i in arr:
	arrSq.append(square(i))

sum = add(arr)

sumSq = add(arrSq)

print "sum: ", sum, " ; sumSq: ", sumSq
print "difference: ", sumSq - sum
