#!/usr/bin/env python3

ls=[]

def getFifthSquareSum(x):
	sum = 0
	for i in x:
		sum += (i^5)
	return sum

def getDigits(x):
	l = []
	num = x
	rem = 0
	while num != 0:
		rem = num % 10
		num /= 10
		l.append(rem)
	return l


x = 1

print (9^5) * 5
count = 1

answerList = []
while count <= ( ( 9 ^ 5 ) * 5):
	if getFifthSquareSum(getDigits(count)) == count:
		answerList.append(count)
	count += 1


print answerList
