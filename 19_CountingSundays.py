#!/usr/bin/env python3

SundayCount = 0

days count = 7

withLYear = [31,29,31,30,31,30,31,31,30,31,30,31]

noLYear = [31,28,31,30,31,30,31,31,30,31,30,31]

y = []

for i in range(1901, 2000):
	if i % 4 == 0 or i % 400 == 0:
		y.append('L')
	else:
		y.append('N')


