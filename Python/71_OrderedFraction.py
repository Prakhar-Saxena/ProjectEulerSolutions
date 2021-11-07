#!/usr/bin/env python3

def HCF(x, y):
	if x > y:
		smaller = y
	else:
		smaller = x
	for i in range(1, smaller +1):
		if ( ( x % i == 0 ) and ( y % i == 0 ) ):
			hcf = i
	return hcf
def quickSort(arr):
        if len(arr) <= 1:
                return arr
        else:
                return quickSort( [x for x in arr[1:] if x < arr[0]]) + [arr[0]]+quickSort([x for x in arr[1:] if x>=arr[0]])

L = []

for d in range(2, 1000000):
	for n in range(1, d):
		if HCF(n, d) == 1:
			L.append(n/d)

sortedL = quicksort(L)

index = sortedL.index(3/7)

print sortedL[index-1]
