#!/usr/bin/env python3

def isValidTriangle(a,b,c):
	if (a+b) > c and (b+c) > a and (a+c) > b:
		return True
	else:
		return False

def isPTriplet(a,b,c):
	if isValidTriangle(a,b,c) and (a*a) + (b*b) == (c*c):
		return True
	else:
		return False

def PTriplets(p):
	l = []
	for i in range(p-1):
		for j in range(i,p-1):
			for k in range(j,p-1):
				if isPTriplet(i,j,k) and (i+j+k) == p:
					l.append([i,j,k])
	return l

max = 1
ansP = 0

for p in range(200, 1000):
	print p
	length = len(PTriplets(p))
	if length > max:
		max = length
		ansP = p

print "p = ", ansP
print "max => ", max
