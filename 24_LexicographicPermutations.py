#!/usr/bin/env python3

import itertools

def quickSort(arr):
	if len(arr) <= 1:
		return arr
	else:
		return quickSort( [x for x in arr[1:] if x < arr[0]]) + [arr[0]]+quickSort([x for x in arr[1:] if x>=arr[0]])

def listToNum(arr):
	num = 0
	for x in arr:
		num = (num*10) + x
	return num

#l = list(itertools.permutations([1,2,3]))

print listToNum([3,1,4,1,5,9,2,6,5,3,5,8,9,7])
