#!/usr/bin/env python3

def quickSort(arr):
	if len(arr) <= 1:
		return arr
	else:
		return quickSort( [x for x in arr[1:] if x < arr[0]]) + [arr[0]]+quickSort([x for x in arr[1:] if x>=arr[0]])



while True:
	
