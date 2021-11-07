#!/usr/bin/env python3

def isDecPalindrome(x):
	if str(x) == str(x)[::-1]:
		return True
	else:
		return False

def isBinPalindrome(x):
	if bin(x)[2:] == (bin(x)[2:])[::-1]:
		return True
	else:
		return False

def isDBPalindrome(x):
	if isDecPalindrome(x) and isBinPalindrome(x):
		return True
	else:
		return False

sum = 0

for i in range(1000000):
	if isDBPalindrome(i):
		sum += i

print sum
