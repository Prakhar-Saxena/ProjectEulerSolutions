#!/usr/bin/env python3

def square(x):
	return x*x

def add(lst):
	sum = 0
	for i in lst:
		sum += i
	return sum

arr = range(1,101)

arrSq = []

for i in arr:
	arrSq.append(square(i))
print arrSq
sum = (101*50)*(101*50)

sumSq = add(arrSq)

print "difference: ", sum - sumSq
