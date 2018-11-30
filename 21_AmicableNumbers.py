#!/usr/bin/env python3

def listOfDivisors(n):
	l = []
	for i in range(1,n):
		if n % i == 0:
			l.append(i)
	return l

def sumOfList(x):
        sum = 0
        for i in x:
                sum += i
        return sum

def d(n):
	l = listOfDivisors(n)
	return sum(l)

def isAmicable(a,b):
	if a != b  and d(b) == a: #not including d(a) == b, becasue that's a given whenever this function will be called
		return True
	else:
		return False

def listOfAmicableNumbers(n):
	l = []
	for a in range(1, n):
		b = d(a)
		if b < n and isAmicable(a, b):
			l.append(a)
			l.append(b)
	return l

l = listOfAmicableNumbers(10000)
print l

sum = sumOfList(l)
print sum
