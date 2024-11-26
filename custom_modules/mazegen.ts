/* eslint-disable perfectionist/sort-variable-declarations */
import { inc, Index, offByOne, zero } from "./generalUse";
interface Cell {
	bottom: boolean,
	left: boolean,
	right: boolean,
	set: number,
	top: boolean,
	x: number,
	y: number,
}

type ObjectKey<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T & string]

const 
uniq = <T>(array: T[]): T[] => [...new Set(array)],
compact = <T>(array: T[]): T[] => array.filter(Boolean),
difference = <T>(arr1: T[], arr2: T[]): T[] => [ arr1, arr2 ].reduce((a, b) => a.filter(x => !b.includes(x))),
initial = <T>(array: T[]): T[] => array.slice(Index.First, Index.Last),
groupBy = <T>(list: T[], key: ObjectKey<T, number>): Record<number, T[]> => {
	const keys = list.map(item => item[key]).filter(item => typeof item === `number`),
	dict: Record<number, T[]> = uniq(keys).reduce((prev, next) => ({ ...prev, [next]: [] }), {});
	keys.map((item, i) => dict[item].push(list.filter(x => typeof x[key] === `number`)[i]));
	return dict;
},
last = <T>(array: T[]): T => array[array.length - offByOne],
range = (n: number, end = zero): number[] => end ? Array.from(Array(end - n).keys()).map(x => x + n) : Array.from(Array(n).keys()),
sampleSize = <T>(array: T[], n: number, random: () => number): T[] => {
	let num, index;
	num = n;
	index = Index.Last;
	const { length } = array;
	if (!length || num <= zero) 
		return [];
	num = num > length ? length : num;
	// eslint-disable-next-line one-var
	const lastIndex = length - offByOne,
	result = [...array];
	while ((index += inc) < num) {
		const rand = index + Math.floor(random() * (lastIndex - index + offByOne)),
		value = result[rand];
		result[rand] = result[index];
		result[index] = value;
	}
	return result.slice(Index.First, n);
},
mulberry32 = (seed: number) => (): number => {
	/* eslint-disable @typescript-eslint/no-magic-numbers */
	let x;
	x = seed + 0x6D2B79F5;
	x = Math.imul(x ^ x >>> 15, x | 1);
	x ^= x + Math.imul(x ^ x >>> 7, x | 61);
	return ((x ^ x >>> 14) >>> 0) / 4294967296;
	/* eslint-enable @typescript-eslint/no-magic-numbers */
},
mergeSetWith = (row: Cell[], oldSet: number, newSet: number): void => {
	row.forEach(box => {
		if (box.set === oldSet) box.set = newSet;
	});
},
half = 0.5,
populateMissingSets = (row: Cell[], random: () => number): void => {
	const setsInUse = compact(uniq(row.map(x => x.set))),
	allSets = range(Index.Second, row.length + offByOne),
	availableSets = difference(allSets, setsInUse).sort(() => half - random());
	row.filter(box => !box.set).forEach((box, i) => (box.set = availableSets[i]));
},
mergeRandomSetsIn = (row: Cell[], random: () => number, probability = half): void => {
	// Randomly merge some disjoint sets
	const allBoxesButLast = initial(row);
	allBoxesButLast.forEach((current, x) => {
		const next = row[x + offByOne],
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
defaultWidth = 8,
defaultSeed = 1,
generate = (width = defaultWidth, height = width, closed = true, seed = defaultSeed): Cell[][] => {
	const random = mulberry32(seed),
	maze: Cell[][] = [],
	rangeArr = range(width);
	
	// Populate maze with empty cells:
	for (let y = 0; y < height; y += inc) {
		const row: Cell[] = rangeArr.map(x => ({
			bottom: closed || y < (height - offByOne),
			left: closed || x > zero,
			right: closed || x < (width - offByOne),
			set: NaN,
			top: closed || y > zero,
			x,
			y,
			}));
		maze.push(row);
	}
	
	// All rows except last:
	initial(maze).forEach((row, y) => {
		populateMissingSets(row, random);
		mergeRandomSetsIn(row, random);
		addSetExits(row, maze[y + offByOne], random);
	});
	
	// eslint-disable-next-line one-var
	const lastRow = last(maze),
	probability = 1;
	populateMissingSets(lastRow, random);
	mergeRandomSetsIn(lastRow, random, probability);
	
	return maze;
};

export default generate;