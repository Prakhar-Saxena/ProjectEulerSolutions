#!/usr/bin/env python3

def quickSort(arr):
	if len(arr) <= 1:
		return arr
	else:
		return quickSort( [x for x in arr[1:] if x < arr[0]]) + [arr[0]]+quickSort([x for x in arr[1:] if x>=arr[0]])

def unique(x):
	y = []
	for i in x:
		if i not in y:
			y.append(i)
	return y
		

def checkPerMul(x):
	x1 = x
	x2 = x*2
	x3 = x*3
	x4 = x*4
	x5 = x*5
	x6 = x*6
	lsx1 = unique(list(str(x1)))
	lsx2 = unique(list(str(x2)))
	lsx3 = unique(list(str(x3)))
	lsx4 = unique(list(str(x4)))
	lsx5 = unique(list(str(x5)))
	lsx6 = unique(list(str(x6)))
	if lsx1 == lsx2 and lsx1 == lsx3 and lsx1 == lsx4 and lsx1 == lsx5 and lsx1 == lsx6:
		return True
	else:
		return False

i = 85289001

while True:
	print i
	if checkPerMul(i):
		print i, i*2, i*3, i*4, i*5, i*6
		break
	i += 1

print i, i*2, i*3, i*4, i*5, i*6
