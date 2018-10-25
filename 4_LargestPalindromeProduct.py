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

for i in range(num, 100000, -1):
	if isPalindrome(i) and isPerfectSquare(i):
		ans = i
		break

print ans
print math.sqrt(ans)
