#!/usr/bin/env python3

def mot(x):
	if x % 3 == 0:
		return True
	else:
		return False

def mof(x):
        if x % 5 == 0 :
                return True
        else:
                return False

lst = []

for i in range(0,1000):
	if (mot(i)) or (mof(i)) :
		lst.append(i)

print lst

sum = 0
for i in range(0, len(lst)):
	sum += lst[i]

print sum
