#!/usr/bin/env python3

def getScore(x, l):
	letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	score = 0
	xSplit = list(x)
	for i in xSplit:
		score += (letters.index(i)+1)
	score *= (l.index(x)+1)
	return score

def quickSort(arr):
        if len(arr) <= 1:
                return arr
        else:
                return quickSort( [x for x in arr[1:] if x < arr[0]]) + [arr[0]]+quickSort([x for x in arr[1:] if x>=arr[0]])

f = open("p022_names.txt","r")
names = f.read()

namesS = names.split('\",\"')

namesS[0] = namesS[0][1:]
namesS[len(namesS)-1] = namesS[len(namesS)-1][:-1]

sortedNames = quickSort(namesS)

total = 0
for i in sortedNames:
	total += getScore(i, sortedNames)

print total
