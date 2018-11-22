#!/usr/bin/env python3

import random
streakH = 0
streakT = 0
streakHM = 0
streakTM = 0

arr = []

for x in range(100000):
	r = random.randint(1,101)
	if r >50:
		arr.append('H')
	else:
		arr.append('T')	

print arr
