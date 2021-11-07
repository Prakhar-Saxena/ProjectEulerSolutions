#!/usr/bin/env python3
import math

def isPalindrome(x):
	num = x
	rev = 0
	
	while num > 0:
		dig = num % 10
		rev = rev * 10
		rev = rev + dig
		num = int(num/10)
	
	if x == rev:
		return True
	else:
		return False

def isPerfectSquare(x):
	if math.sqrt(x) % 1 != 0:
		return False
	else:
		return True

num = 999*999

ans = 0

l = []

for i in range(999,100, -1):
	for j in range(999,100,-1):
		if isPalindrome(i*j):
			l.append(i*j)

print max(l)
