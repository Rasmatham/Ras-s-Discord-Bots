/* eslint-disable sort-vars */
interface Cell {
	x: number,
	y: number,
	top: boolean,
	left: boolean,
	bottom: boolean,
	right: boolean,
	set: number,
}

type ObjectKey<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T & string]

const 
uniq = <T>(array: T[]): T[] => [...new Set(array)],
compact = <T>(array: T[]): T[] => array.filter(Boolean),
difference = <T>(arr1: T[], arr2: T[]): T[] => [ arr1, arr2 ].reduce((a, b) => a.filter(x => !b.includes(x))),
initial = <T>(array: T[]): T[] => array.slice(0, -1),
groupBy = <T>(list: T[], key: ObjectKey<T, number>): Record<number, T[]> => {
	const keys = list.map(item => item[key] as number),
	dict: Record<number, T[]> = uniq(keys).reduce((prev, next) => ({ ...prev, [next]: [] }), {});
	list.forEach(item => dict[item[key] as number].push(item));
	return dict;
},
last = <T>(array: T[]): T => array[array.length - 1],
range = (n: number, end = 0): number[] => end ? Array.from(Array(end - n).keys()).map(x => x + n) : Array.from(Array(n).keys()),
sampleSize = <T>(array: T[], n: number, random: () => number): T[] => {
	let num, index;
	num = n;
	index = -1;
	const { length } = array;
	if (!length || num < 1) 
		return [];
	num = num > length ? length : num;
	// eslint-disable-next-line one-var
	const lastIndex = length - 1,
	result = [...array];
	while ((index += 1) < num) {
		const rand = index + Math.floor(random() * (lastIndex - index + 1)),
		value = result[rand];
		result[rand] = result[index];
		result[index] = value;
	}
	return result.slice(0, n);
},
mulberry32 = (seed: number) => (): number => {
	let x;
	x = seed + 0x6D2B79F5;
	x = Math.imul(x ^ x >>> 15, x | 1);
	x ^= x + Math.imul(x ^ x >>> 7, x | 61);
	return ((x ^ x >>> 14) >>> 0) / 4294967296;
},
mergeSetWith = (row: Cell[], oldSet: number, newSet: number): void => {
	row.forEach(box => {
		if (box.set === oldSet) box.set = newSet;
	});
},
populateMissingSets = (row: Cell[], random: () => number): void => {
	const setsInUse = compact(uniq(row.map(x => x.set))),
	allSets = range(1, row.length + 1),
	availableSets = difference(allSets, setsInUse).sort(() => 0.5 - random());
	row.filter(box => !box.set).forEach((box, i) => (box.set = availableSets[i]));
},
mergeRandomSetsIn = (row: Cell[], random: () => number, probability = 0.5): void => {
	// Randomly merge some disjoint sets
	const allBoxesButLast = initial(row);
	allBoxesButLast.forEach((current, x) => {
		const next = row[x + 1],
		differentSets = current.set !== next.set,
		shouldMerge = random() <= probability;
		if (differentSets && shouldMerge) {
			mergeSetWith(row, next.set, current.set);
			current.right = false;
			next.left = false;
		}
	});
},
addSetExits = (row: Cell[], nextRow: Cell[], random: () => number): void => {
	// Randomly add bottom exit for each set
	const setsInRow = Object.values(groupBy(row, `set`)),
	{ ceil } = Math;
	setsInRow.forEach(set => {
		const exits = sampleSize(set, ceil(random() * set.length), random);
		exits.forEach(exit => {
			const below = nextRow[exit.x];
			exit.bottom = false;
			below.top = false;
			below.set = exit.set;
		});
	});
},
generate = (width = 8, height = width, closed = true, seed = 1): Cell[][] => {
	const random = mulberry32(seed),
	maze: Cell[][] = [],
	rangeArr = range(width);
	
	// Populate maze with empty cells:
	for (let y = 0; y < height; y += 1) {
		const row: Cell[] = rangeArr.map(x => ({
			bottom: closed || y < (height - 1),
			left: closed || x > 0,
			right: closed || x < (width - 1),
			set: NaN,
			top: closed || y > 0,
			x,
			y,
			}));
		maze.push(row);
	}
	
	// All rows except last:
	initial(maze).forEach((row, y) => {
		populateMissingSets(row, random);
		mergeRandomSetsIn(row, random);
		addSetExits(row, maze[y + 1], random);
	});
	
	// eslint-disable-next-line one-var
	const lastRow = last(maze);
	populateMissingSets(lastRow, random);
	mergeRandomSetsIn(lastRow, random, 1);
	
	return maze;
};

export default generate;