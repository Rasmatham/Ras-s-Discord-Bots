//#region type definitions
type dexEntriesType = {
	re: string,
	bl: string,
	yr: string,
	go: string,
	si: string,
	cr: string,
	ru: string,
	sa: string,
	em: string,
	fr: string,
	lg: string,
	di: string,
	pe: string,
	pl: string,
	hg: string,
	ss: string,
	wh: string,
	b2: string,
	w2: string,
	x: string,
	y: string,
	or: string,
	as: string,
	su: string,
	mo: string,
	us: string,
	um: string,
	lgp: string,
	lge: string,
	sw: string,
	sh: string
};
export type pokeType = {
	name: string,
	color: string,
	weakTo?: string[],
	strongTo?: string[],
	NoDamageTo?: string[]
};
export type pokeObjType = {
	name: string,
	reg:string,
	nat:string,
	rarity:number,
	types:[pokeType,pokeType] | [pokeType],
	height:[
		string,
		string
	],
	weight:[
		string,
		string
	],
	dexEntries:dexEntriesType
}
//#endregion

//#region types
export const types = {
	bird: {
		name: `Bird`,
		color: `68A090`,
		weakTo: [
			`?`
		] as string[],
		strongTo: [
			`?`
		] as string[],
		NoDamageTo: [
			`?`
		] as string[]
	},
	normal: {
		name: `Normal`,
		color: `C6C5A9`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	fighting: {
		name: `Fighting`,
		color: `D37575`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	flying: {
		name: `Flying`,
		color: `C5B9F1`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	poison: {
		name: `Poison`,
		color: `BF83BE`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	ground: {
		name: `Ground`,
		color: `EAD4A2`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	rock: {
		name: `Rock`,
		color: `D1BF84`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	bug: {
		name: `Bug`,
		color: `C7CF78`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	ghost: {
		name: `Ghost`,
		color: `A193BA`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	steel: {
		name: `Steel`,
		color: `D1D1DF`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	fire: {
		name: `Fire`,
		color: `F3A97E`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	water: {
		name: `Water`,
		color: `9EB9F1`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	grass: {
		name: `Grass`,
		color: `AADA93`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	electric: {
		name: `Electric`,
		color: `F9DD83`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	psychic: {
		name: `Psychic`,
		color: `F790B1`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	ice: {
		name: `Ice`,
		color: `BEE7E6`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	dragon: {
		name: `Dragon`,
		color: `A082F4`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	dark: {
		name: `Dark`,
		color: `A19189`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	},
	fairy: {
		name: `Fairy`,
		color: `F2BCC9`,
		weakTo: [] as string[],
		strongTo: [] as string[],
		NoDamageTo: [] as string[]
	}
};
//#endregion

//#region pokemon
export const pokemon:pokeObjType[] = [
	{
		name: `Missingno`,
		reg: `0`,
		nat: `0`,
		rarity: 0,
		types: [
			types.bird,
			types.normal
		],
		height: [
			`?`,
			`?`
		],
		weight: [
			`?`,
			`?`
		],
		dexEntries: {
			re: `?`,
			bl: `?`,
			yr: `?`,
			go: `?`,
			si: `?`,
			cr: `?`,
			ru: `?`,
			sa: `?`,
			em: `?`,
			fr: `?`,
			lg: `?`,
			di: `?`,
			pe: `?`,
			pl: `?`,
			hg: `?`,
			ss: `?`,
			wh: `?`,
			b2: `?`,
			w2: `?`,
			x: `?`,
			y: `?`,
			or: `?`,
			as: `?`,
			su: `?`,
			mo: `?`,
			us: `?`,
			um: `?`,
			lgp: `?`,
			lge: `?`,
			sw: `?`,
			sh: `?`
		}
	},
	{
		name: `Bulbasaur`,
		reg: `001`,
		nat: `001`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Ivysaur`,
		reg: `002`,
		nat: `002`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Venusaur`,
		reg: `003`,
		nat: `003`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Charmander`,
		reg: `004`,
		nat: `004`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Charmeleon`,
		reg: `005`,
		nat: `005`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Charizard`,
		reg: `006`,
		nat: `006`,
		rarity: 0,
		types: [
			types.fire,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Squirtle`,
		reg: `007`,
		nat: `007`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Wartortle`,
		reg: `008`,
		nat: `008`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Blastoise`,
		reg: `009`,
		nat: `009`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Caterpie`,
		reg: `010`,
		nat: `010`,
		rarity: 0,
		types: [
			types.bug
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Metapod`,
		reg: `011`,
		nat: `011`,
		rarity: 0,
		types: [
			types.bug
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Butterfree`,
		reg: `012`,
		nat: `012`,
		rarity: 0,
		types: [
			types.bug,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Weedle`,
		reg: `013`,
		nat: `013`,
		rarity: 0,
		types: [
			types.bug,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Kakuna`,
		reg: `014`,
		nat: `014`,
		rarity: 0,
		types: [
			types.bug,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Beedrill`,
		reg: `015`,
		nat: `015`,
		rarity: 0,
		types: [
			types.bug,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Pidgey`,
		reg: `016`,
		nat: `016`,
		rarity: 0,
		types: [
			types.normal,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Pidgeotto`,
		reg: `017`,
		nat: `017`,
		rarity: 0,
		types: [
			types.normal,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Pidgeot`,
		reg: `018`,
		nat: `018`,
		rarity: 0,
		types: [
			types.normal,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Rattata`,
		reg: `019`,
		nat: `019`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Raticate`,
		reg: `020`,
		nat: `020`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Spearow`,
		reg: `021`,
		nat: `021`,
		rarity: 0,
		types: [
			types.normal,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Fearow`,
		reg: `022`,
		nat: `022`,
		rarity: 0,
		types: [
			types.normal,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Ekans`,
		reg: `023`,
		nat: `023`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Arbok`,
		reg: `024`,
		nat: `024`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Pikachu`,
		reg: `025`,
		nat: `025`,
		rarity: 0,
		types: [
			types.electric
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Raichu`,
		reg: `026`,
		nat: `026`,
		rarity: 0,
		types: [
			types.electric
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Sandshrew`,
		reg: `027`,
		nat: `027`,
		rarity: 0,
		types: [
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Sandslash`,
		reg: `028`,
		nat: `028`,
		rarity: 0,
		types: [
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Nidoran`,
		reg: `029`,
		nat: `029`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Nidorina`,
		reg: `030`,
		nat: `030`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Nidoqueen`,
		reg: `031`,
		nat: `031`,
		rarity: 0,
		types: [
			types.poison,
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Nidoran`,
		reg: `032`,
		nat: `032`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Nidorino`,
		reg: `033`,
		nat: `033`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Nidoking`,
		reg: `034`,
		nat: `034`,
		rarity: 0,
		types: [
			types.poison,
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Clefairy`,
		reg: `035`,
		nat: `035`,
		rarity: 0,
		types: [
			types.fairy
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Clefable`,
		reg: `036`,
		nat: `036`,
		rarity: 0,
		types: [
			types.fairy
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Vulpix`,
		reg: `037`,
		nat: `037`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Ninetales`,
		reg: `038`,
		nat: `038`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Jigglypuff`,
		reg: `039`,
		nat: `039`,
		rarity: 0,
		types: [
			types.normal,
			types.fairy
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Wigglytuff`,
		reg: `040`,
		nat: `040`,
		rarity: 0,
		types: [
			types.normal,
			types.fairy
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Zubat`,
		reg: `041`,
		nat: `041`,
		rarity: 0,
		types: [
			types.poison,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Golbat`,
		reg: `042`,
		nat: `042`,
		rarity: 0,
		types: [
			types.poison,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Oddish`,
		reg: `043`,
		nat: `043`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Gloom`,
		reg: `044`,
		nat: `044`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Vileplume`,
		reg: `045`,
		nat: `045`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Paras`,
		reg: `046`,
		nat: `046`,
		rarity: 0,
		types: [
			types.bug,
			types.grass
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Parasect`,
		reg: `047`,
		nat: `047`,
		rarity: 0,
		types: [
			types.bug,
			types.grass
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Venonat`,
		reg: `048`,
		nat: `048`,
		rarity: 0,
		types: [
			types.bug,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Venomoth`,
		reg: `049`,
		nat: `049`,
		rarity: 0,
		types: [
			types.bug,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Diglett`,
		reg: `050`,
		nat: `050`,
		rarity: 0,
		types: [
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Dugtrio`,
		reg: `051`,
		nat: `051`,
		rarity: 0,
		types: [
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Meowth`,
		reg: `052`,
		nat: `052`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Persian`,
		reg: `053`,
		nat: `053`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Psyduck`,
		reg: `054`,
		nat: `054`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Golduck`,
		reg: `055`,
		nat: `055`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Mankey`,
		reg: `056`,
		nat: `056`,
		rarity: 0,
		types: [
			types.fighting
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Primeape`,
		reg: `057`,
		nat: `057`,
		rarity: 0,
		types: [
			types.fighting
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Growlithe`,
		reg: `058`,
		nat: `058`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Arcanine`,
		reg: `059`,
		nat: `059`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Poliwag`,
		reg: `060`,
		nat: `060`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Poliwhirl`,
		reg: `061`,
		nat: `061`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Poliwrath`,
		reg: `062`,
		nat: `062`,
		rarity: 0,
		types: [
			types.water,
			types.fighting
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Abra`,
		reg: `063`,
		nat: `063`,
		rarity: 0,
		types: [
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Kadabra`,
		reg: `064`,
		nat: `064`,
		rarity: 0,
		types: [
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Alakazam`,
		reg: `065`,
		nat: `065`,
		rarity: 0,
		types: [
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Machop`,
		reg: `066`,
		nat: `066`,
		rarity: 0,
		types: [
			types.fighting
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Machoke`,
		reg: `067`,
		nat: `067`,
		rarity: 0,
		types: [
			types.fighting
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Machamp`,
		reg: `068`,
		nat: `068`,
		rarity: 0,
		types: [
			types.fighting
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Bellsprout`,
		reg: `069`,
		nat: `069`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Weepinbell`,
		reg: `070`,
		nat: `070`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Victreebel`,
		reg: `071`,
		nat: `071`,
		rarity: 0,
		types: [
			types.grass,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Tentacool`,
		reg: `072`,
		nat: `072`,
		rarity: 0,
		types: [
			types.water,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Tentacruel`,
		reg: `073`,
		nat: `073`,
		rarity: 0,
		types: [
			types.water,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Geodude`,
		reg: `074`,
		nat: `074`,
		rarity: 0,
		types: [
			types.rock,
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Graveler`,
		reg: `075`,
		nat: `075`,
		rarity: 0,
		types: [
			types.rock,
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Golem`,
		reg: `076`,
		nat: `076`,
		rarity: 0,
		types: [
			types.rock,
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Ponyta`,
		reg: `077`,
		nat: `077`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Rapidash`,
		reg: `078`,
		nat: `078`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Slowpoke`,
		reg: `079`,
		nat: `079`,
		rarity: 0,
		types: [
			types.water,
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Slowbro`,
		reg: `080`,
		nat: `080`,
		rarity: 0,
		types: [
			types.water,
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Magnemite`,
		reg: `081`,
		nat: `081`,
		rarity: 0,
		types: [
			types.electric,
			types.steel
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Magneton`,
		reg: `082`,
		nat: `082`,
		rarity: 0,
		types: [
			types.electric,
			types.steel
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Farfetch'd`,
		reg: `083`,
		nat: `083`,
		rarity: 0,
		types: [
			types.normal,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Doduo`,
		reg: `084`,
		nat: `084`,
		rarity: 0,
		types: [
			types.normal,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Dodrio`,
		reg: `085`,
		nat: `085`,
		rarity: 0,
		types: [
			types.normal,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Seel`,
		reg: `086`,
		nat: `086`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Dewgong`,
		reg: `087`,
		nat: `087`,
		rarity: 0,
		types: [
			types.water,
			types.ice
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Grimer`,
		reg: `088`,
		nat: `088`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Muk`,
		reg: `089`,
		nat: `089`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Shellder`,
		reg: `090`,
		nat: `090`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Cloyster`,
		reg: `091`,
		nat: `091`,
		rarity: 0,
		types: [
			types.water,
			types.ice
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Gastly`,
		reg: `092`,
		nat: `092`,
		rarity: 0,
		types: [
			types.ghost,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Haunter`,
		reg: `093`,
		nat: `093`,
		rarity: 0,
		types: [
			types.ghost,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Gengar`,
		reg: `094`,
		nat: `094`,
		rarity: 0,
		types: [
			types.ghost,
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Onix`,
		reg: `095`,
		nat: `095`,
		rarity: 0,
		types: [
			types.rock,
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Drowzee`,
		reg: `096`,
		nat: `096`,
		rarity: 0,
		types: [
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Hypno`,
		reg: `097`,
		nat: `097`,
		rarity: 0,
		types: [
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Krabby`,
		reg: `098`,
		nat: `098`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Kingler`,
		reg: `099`,
		nat: `099`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Voltorb`,
		reg: `100`,
		nat: `100`,
		rarity: 0,
		types: [
			types.electric
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Electrode`,
		reg: `101`,
		nat: `101`,
		rarity: 0,
		types: [
			types.electric
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Exeggcute`,
		reg: `102`,
		nat: `102`,
		rarity: 0,
		types: [
			types.grass,
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Exeggutor`,
		reg: `103`,
		nat: `103`,
		rarity: 0,
		types: [
			types.grass,
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Cubone`,
		reg: `104`,
		nat: `104`,
		rarity: 0,
		types: [
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Marowak`,
		reg: `105`,
		nat: `105`,
		rarity: 0,
		types: [
			types.ground
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Hitmonlee`,
		reg: `106`,
		nat: `106`,
		rarity: 0,
		types: [
			types.fighting
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Hitmonchan`,
		reg: `107`,
		nat: `107`,
		rarity: 0,
		types: [
			types.fighting
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Lickitung`,
		reg: `108`,
		nat: `108`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Koffing`,
		reg: `109`,
		nat: `109`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Weezing`,
		reg: `110`,
		nat: `110`,
		rarity: 0,
		types: [
			types.poison
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Ryhorn`,
		reg: `111`,
		nat: `111`,
		rarity: 0,
		types: [
			types.ground,
			types.rock
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Rhydon`,
		reg: `112`,
		nat: `112`,
		rarity: 0,
		types: [
			types.ground,
			types.rock
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Chansey`,
		reg: `113`,
		nat: `113`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Tangela`,
		reg: `114`,
		nat: `114`,
		rarity: 0,
		types: [
			types.grass
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Kangaskhan`,
		reg: `115`,
		nat: `115`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Horsea`,
		reg: `116`,
		nat: `116`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Seadra`,
		reg: `117`,
		nat: `117`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Goldeen`,
		reg: `118`,
		nat: `118`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Seaking`,
		reg: `119`,
		nat: `119`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Staryu`,
		reg: `120`,
		nat: `120`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Starmie`,
		reg: `121`,
		nat: `121`,
		rarity: 0,
		types: [
			types.water,
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Mr. Mime`,
		reg: `122`,
		nat: `122`,
		rarity: 0,
		types: [
			types.psychic,
			types.fairy
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Scyther`,
		reg: `123`,
		nat: `123`,
		rarity: 0,
		types: [
			types.bug,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Jynx`,
		reg: `124`,
		nat: `124`,
		rarity: 0,
		types: [
			types.ice,
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Electabuzz`,
		reg: `125`,
		nat: `125`,
		rarity: 0,
		types: [
			types.electric
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Magmar`,
		reg: `126`,
		nat: `126`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Pinsir`,
		reg: `127`,
		nat: `127`,
		rarity: 0,
		types: [
			types.bug
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Tauros`,
		reg: `128`,
		nat: `128`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Magikarp`,
		reg: `129`,
		nat: `129`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Gyarados`,
		reg: `130`,
		nat: `130`,
		rarity: 0,
		types: [
			types.water,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Lapras`,
		reg: `131`,
		nat: `131`,
		rarity: 0,
		types: [
			types.water,
			types.ice
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Ditto`,
		reg: `132`,
		nat: `132`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Eevee`,
		reg: `133`,
		nat: `133`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Vaporeon`,
		reg: `134`,
		nat: `134`,
		rarity: 0,
		types: [
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Jolteon`,
		reg: `135`,
		nat: `135`,
		rarity: 0,
		types: [
			types.electric
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Flareon`,
		reg: `136`,
		nat: `136`,
		rarity: 0,
		types: [
			types.fire
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Porygon`,
		reg: `137`,
		nat: `137`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Omanyte`,
		reg: `138`,
		nat: `138`,
		rarity: 0,
		types: [
			types.rock,
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Omastar`,
		reg: `139`,
		nat: `139`,
		rarity: 0,
		types: [
			types.rock,
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Kabuto`,
		reg: `140`,
		nat: `140`,
		rarity: 0,
		types: [
			types.rock,
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Kabutops`,
		reg: `141`,
		nat: `141`,
		rarity: 0,
		types: [
			types.rock,
			types.water
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Aerodactyl`,
		reg: `142`,
		nat: `142`,
		rarity: 0,
		types: [
			types.rock,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Snorlax`,
		reg: `143`,
		nat: `143`,
		rarity: 0,
		types: [
			types.normal
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Articuno`,
		reg: `144`,
		nat: `144`,
		rarity: 0,
		types: [
			types.ice,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Zapdos`,
		reg: `145`,
		nat: `145`,
		rarity: 0,
		types: [
			types.electric,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Moltres`,
		reg: `146`,
		nat: `146`,
		rarity: 0,
		types: [
			types.fire,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Dratini`,
		reg: `147`,
		nat: `147`,
		rarity: 0,
		types: [
			types.dragon
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Dragonair`,
		reg: `148`,
		nat: `148`,
		rarity: 0,
		types: [
			types.dragon
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Dragonite`,
		reg: `149`,
		nat: `149`,
		rarity: 0,
		types: [
			types.dragon,
			types.flying
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Mewtwo`,
		reg: `150`,
		nat: `150`,
		rarity: 0,
		types: [
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	},
	{
		name: `Mew`,
		reg: `151`,
		nat: `151`,
		rarity: 0,
		types: [
			types.psychic
		],
		height: [
			`impheight`,
			`metheight`
		],
		weight: [
			`impweight`,
			`metweight`
		],
		dexEntries: {
			re: ``,
			bl: ``,
			yr: ``,
			go: ``,
			si: ``,
			cr: ``,
			ru: ``,
			sa: ``,
			em: ``,
			fr: ``,
			lg: ``,
			di: ``,
			pe: ``,
			pl: ``,
			hg: ``,
			ss: ``,
			wh: ``,
			b2: ``,
			w2: ``,
			x: ``,
			y: ``,
			or: ``,
			as: ``,
			su: ``,
			mo: ``,
			us: ``,
			um: ``,
			lgp: ``,
			lge: ``,
			sw: ``,
			sh: ``
		}
	}
];
//#endregion

//#region trainers
export const trainerList:string[] = [
	//Core games
	[
	//Kanto
		[
			//Gen 1
			[
				`Red`,
				`Blue`,
			],
			//Gen 3
			[
				`Green`,
			],
			//Gen 7
			[
				`Chace`,
				`Elaine`,
				`Trace`,
			],
		],
		//Johto
		[
			//Gen 2
			[
				//GS
				[
					`Ethan`,
					`Silver`,
				],
				//C
				[
					`Kris`,
				],
			],
			//Gen 4
			[
				`Lyra`,
			],
		],
		//Hoenn
		[
			//Gen 3
			[
				`Brendan`,
				`May`,
				`Wally`,
			],
			//Gen 6
			[
				//none
			],
		],
		//Sinnoh
		[
			//Gen 4
			[
				`Lucas`,
				`Dawn`,
				`Barry`,
			],
			//Gen 8
			[
				//none
			],
		],
		//Unova
		[
			//Gen 5
			[
				//BW
				[
					`Hilbert`,
					`Hilda`,
					`Cheren`,
					`Bianca`,
					`N`,
				],
				//B2W2
				[
					`Nate`,
					`Rosa`,
					`Hugh`,
				],
			],
		],
		//Kalos
		[
			//Gen 6
			[
				`Calem`,
				`Serena`,
				`Shauna`,
				`Tierno`,
				`Trevor`,
			],
		],
		//Alola
		[
			//Gen 7
			[
				`Elio`,
				`Selene`,
				`Hau`,
				`Gladion`,
			],
		],
		//Galar
		[
			//Gen 8
			[
				//Base game
				[
					`Victor`,
					`Gloria`,
					`Hop`,
					`Bede`,
					`Marnie`,
				],
				//Isle of Armor
				[
					`Klara`,
					`Avery`,
				],
			],
		],
		//Hisui
		[
			//Gen 9
			[
				`Rei`,
				`Akari`,
			],
		],
	],
].flat(Infinity) as string[];
//#endregion