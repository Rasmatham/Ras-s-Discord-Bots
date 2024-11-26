//#region imports
import type { ButtonInteraction, CommandInteraction, EmojiIdentifierResolvable, Interaction } from "discord.js";

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from "discord.js";

import { Index, boolToInt, ephemeral, genericCatch, inc, offByOne, zero } from "./generalUse";
import mazeThing from "./mazegen";
//#endregion

//#region type definitions
interface EmoteList {
	goal: {
		ooii: EmojiIdentifierResolvable,
		oiii: EmojiIdentifierResolvable,
		ioii: EmojiIdentifierResolvable
	}
	iiii: EmojiIdentifierResolvable,
	iiio: EmojiIdentifierResolvable,
	iioi: EmojiIdentifierResolvable,
	iioo: EmojiIdentifierResolvable,
	ioii: EmojiIdentifierResolvable,
	ioio: EmojiIdentifierResolvable,
	iooi: EmojiIdentifierResolvable,
	iooo: EmojiIdentifierResolvable,
	oiii: EmojiIdentifierResolvable,
	oiio: EmojiIdentifierResolvable,
	oioi: EmojiIdentifierResolvable,
	oioo: EmojiIdentifierResolvable,
	ooii: EmojiIdentifierResolvable,
	ooio: EmojiIdentifierResolvable,
	oooi: EmojiIdentifierResolvable,
	oooo: EmojiIdentifierResolvable,
}
type EmoteTypeList = [
	EmoteList[],
	EmoteList[]
];
type HalfByteAsString = `${ `i` | `o` }${ `i` | `o` }${ `i` | `o` }${ `i` | `o` }`;
interface MazeObj {
	bottom: boolean,
	left: boolean,
	right: boolean,
	set: number
	top: boolean,
	x: number,
	y: number,
}
//#endregion

//#region maze generator
export const mazeFunction = (inObjs: Array<{interaction: CommandInteraction}>): void => {
	inObjs.forEach((inObj) => {
		const defaultSize = 8,
		emotes:EmoteTypeList = [
			[
				{
					goal: {
						ioii: `<:G1011:826100214707519519>`,
						oiii: `<:G0111:826100214737272842>`,
						ooii: `<:G0011:826100214766239794>`,
					},
					iiii: `<:1111:733748792360304742>`,
					iiio: `<:1110:733748791974428813>`,
					iioi: `<:1101:733748792079286274>`,
					iioo: `<:1100:733748792209309797>`,
					ioii: `<:1011:733748791978623099>`,
					ioio: `<:1010:733748792452579368>`,
					iooi: `<:1001:733748792238669865>`,
					iooo: `<:1000:733748792238800996>`,
					oiii: `<:0111:733748792620220503>`,
					oiio: `<:0110:733748791920033823>`,
					oioi: `<:0101:733748791944937575>`,
					oioo: `<:0100:733748791869702276>`,
					ooii: `<:0011:733748792133681212>`,
					ooio: `<:0010:733748792158847047>`,
					oooi: `<:0001:733748792138137702>`,
					oooo: `<:0000:733748791806525522>`,
				},
				{
					goal: {
						ioii: `<:G1011Z:826100258018820186>`,
						oiii: `<:G0111Z:826100257964032051>`,
						ooii: `<:G0011Z:826100257871364167>`,
					},
					iiii: `<:1111Z:738891841641906326>`,
					iiio: `<:1110Z:738891841339916400>`,
					iioi: `<:1101Z:738891841415413813>`,
					iioo: `<:1100Z:738891841444774010>`,
					ioii: `<:1011Z:738891841667334265>`,
					ioio: `<:1010Z:738891841394704455>`,
					iooi: `<:1001Z:738891841549893725>`,
					iooo: `<:1000Z:738891841633517608>`,
					oiii: `<:0111Z:738891841604419646>`,
					oiio: `<:0110Z:738891841264549960>`,
					oioi: `<:0101Z:738891841289584691>`,
					oioo: `<:0100Z:738891841587380225>`,
					ooii: `<:0011Z:738891841599963286>`,
					ooio: `<:0010Z:738891841570865153>`,
					oooi: `<:0001Z:738891841553956884>`,
					oooo: `<:0000Z:738891841667334214>`,
				},
			],
			[
				{
					goal: {
						ioii: `<:G1011:826101334834020362>`,
						oiii: `<:G0111:826101334809640974>`,
						ooii: `<:G0011:826101334863642685>`,
					},
					iiii: `<:1111:739569121703755878>`,
					iiio: `<:1110:739569121938636860>`,
					iioi: `<:1101:739569121997357106>`,
					iioo: `<:1100:739569121976647792>`,
					ioii: `<:1011:739569122182168667>`,
					ioio: `<:1010:739569121565343826>`,
					iooi: `<:1001:739569122165129287>`,
					iooo: `<:1000:739569121884110968>`,
					oiii: `<:0111:739569121984905226>`,
					oiio: `<:0110:739569121422999715>`,
					oioi: `<:0101:739569121896955944>`,
					oioo: `<:0100:739569121523400776>`,
					ooii: `<:0011:739569121846624326>`,
					ooio: `<:0010:739569121905213440>`,
					oooi: `<:0001:739569121695367280>`,
					oooo: `<:0000:739569121695498341>`,
				},
				{
					goal: {
						ioii: `<:G1011Z:826101295357755442>`,
						oiii: `<:G0111Z:826101295344517120>`,
						ooii: `<:G0011Z:826101295189721136>`,
					},
					iiii: `<:1111Z:739569256399896678>`,
					iiio: `<:1110Z:739569256676720790>`,
					iioi: `<:1101Z:739569256412479510>`,
					iioo: `<:1100Z:739569256710013029>`,
					ioii: `<:1011Z:739569256408154144>`,
					ioio: `<:1010Z:739569256806744115>`,
					iooi: `<:1001Z:825836934210781204>`,
					iooo: `<:1000Z:739569256756150383>`,
					oiii: `<:0111Z:739569256659943544>`,
					oiio: `<:0110Z:739569256202502162>`,
					oioi: `<:0101Z:739569257087762473>`,
					oioo: `<:0100Z:739569256743567452>`,
					ooii: `<:0011Z:739569256601092186>`,
					ooio: `<:0010Z:739569256550629417>`,
					oooi: `<:0001Z:739569256559149056>`,
					oooo: `<:0000Z:739569256521269372>`,
				},
			]
		],
		options = inObj.interaction.options.get(`style`),
		style = typeof options?.value === `number` ? options.value : zero;
		
		class Cell {
			public emotes:EmoteTypeList;
			private readonly loc: number[];
			private hasPlayer: boolean;
			private readonly walls: HalfByteAsString;
			public constructor(emoteList:EmoteTypeList, x: number, y: number, hasPlayer: boolean, walls: HalfByteAsString) {
				this.emotes = emotes;
				this.loc = [ x, y ];
				this.hasPlayer = hasPlayer;
				this.walls = walls;
			}
			public get playerState(): boolean {
				return this.hasPlayer;
			}
			public get x(): number {
				return this.loc[Index.First];
			}
			public get y(): number {
				return this.loc[Index.Second];
			}
			public movePlayer(): void {
				this.hasPlayer = !this.hasPlayer;
			}
			public getWalls(height: number, width: number): EmojiIdentifierResolvable {
				if (this.loc[Index.First] === width - offByOne && this.loc[Index.Second] === height - offByOne) {
					if (this.walls === `ooii` || this.walls === `oiii` || this.walls === `ioii`)
						return this.emotes[boolToInt({ bool: this.hasPlayer })][style].goal[this.walls];
				}
				return this.emotes[boolToInt({ bool: this.hasPlayer })][style][this.walls];
				
			}
			public get boolWalls(): string[] {
				return this.walls.split(``);
			}
		}
		class Maze {
			private readonly emotes:EmoteTypeList;
			private readonly playerLoc: number[];
			private readonly cells: Cell[];
			public readonly width = defaultSize;
			public readonly height = defaultSize;
			public constructor(emoteList:EmoteTypeList) {
				this.emotes = emoteList;
				this.playerLoc = [ zero, zero ];
				this.cells = [];
			}
			public get cellArr(): Cell[] {
				return this.cells;
			}
			public addCell(x: number, y: number, walls: HalfByteAsString): void {
				this.cells.push(new Cell(this.emotes, x, y, x === zero && y === zero, walls));
			}
			public moveLeft(): void {
				let lock: boolean;
				lock = true;
				this.cells.forEach((cell, i) => {
					if (cell.playerState && cell.y > zero && lock && cell.boolWalls[Index.First] === `O`) {
						cell.movePlayer();
						this.cells[i - offByOne].movePlayer();
						lock = !lock;
					}
				});
			}
			public moveUp(): void {
				let lock: boolean;
				lock = true;
				this.cells.forEach((cell, i) => {
					if (cell.playerState && cell.x > zero && lock && cell.boolWalls[Index.Second] === `O`) {
						cell.movePlayer();
						this.cells[i - this.height].movePlayer();
						lock = !lock;
					}
				});
			}
			public moveDown(): void {
				let lock: boolean;
				lock = true;
				this.cells.forEach((cell, i) => {
					if (cell.playerState && cell.x < this.height-offByOne && lock && cell.boolWalls[Index.Fourth] === `O`) {
						cell.movePlayer();
						this.cells[i + this.height].movePlayer();
						lock = !lock;
					}
				});
			}
			public moveRight(): void {
				let lock: boolean;
				lock = true;
				this.cells.forEach((cell, i) => {
					if (cell.playerState && cell.y < this.width-offByOne && lock && cell.boolWalls[Index.Third] === `O`) {
						cell.movePlayer();
						this.cells[i + offByOne].movePlayer();
						lock = !lock;
					}
				});
			}
		}
		// eslint-disable-next-line one-var
		const createdClass:Maze = new Maze(emotes),
		maze:MazeObj[][] = mazeThing(defaultSize, defaultSize) as MazeObj[][];
		maze.forEach((x: MazeObj[], i: number) => {
			x.forEach((y: MazeObj, j: number) => {
				createdClass.addCell(i, j, `${y.left ? `i` : `o`}${y.top? `i` : `o`}${y.right? `i` : `o`}${y.bottom? `i` : `o`}`);
			});
		});
	
		// eslint-disable-next-line one-var
		const mazeMessage = (mazeObj: Maze):string => {
			let messageText;
			messageText = ``;
			for (let i = 0; i < defaultSize; i += inc) {
				for (let j = 0; j < defaultSize; j += inc) 
					messageText = `${messageText}${mazeObj.cellArr[i * defaultSize + j].getWalls.toString()}`;
				messageText = `${messageText}\n`;
			}
			return messageText;
		};
		// eslint-disable-next-line one-var
		const arrows = new ActionRowBuilder<ButtonBuilder>()
			.setComponents([
				new ButtonBuilder()
					.setCustomId(`Left`)
					.setEmoji(`⬅️`)
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId(`Up`)
					.setEmoji(`⬆️`)
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId(`Down`)
					.setEmoji(`⬇️`)
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId(`Right`)
					.setEmoji(`➡️`)
					.setStyle(ButtonStyle.Secondary)
			]);
		inObj.interaction.reply({
			components: [arrows],
			content: mazeMessage(createdClass),
			ephemeral
		}).then(() => {
			inObj.interaction.client.on(Events.InteractionCreate, (interaction: Interaction) => {
				if (interaction.isButton()) {
					const buttonInteraction:ButtonInteraction = interaction,
					totalCells = createdClass.height*createdClass.width;
					switch (buttonInteraction.customId) {
					case `Left`:
						createdClass.moveLeft();
						if (!createdClass.cellArr[totalCells-offByOne].playerState) 
							buttonInteraction.update(mazeMessage(createdClass)).catch(genericCatch);
						break;
					case `Up`:
						createdClass.moveUp();
						if (!createdClass.cellArr[totalCells-offByOne].playerState) 
							buttonInteraction.update(mazeMessage(createdClass)).catch(genericCatch);
						break;
					case `Down`:
						createdClass.moveDown();
						if (!createdClass.cellArr[totalCells-offByOne].playerState) 
							buttonInteraction.update(mazeMessage(createdClass)).catch(genericCatch);
						break;
					case `Right`:
						createdClass.moveRight();
						if (!createdClass.cellArr[totalCells-offByOne].playerState) 
							buttonInteraction.update(mazeMessage(createdClass)).catch(genericCatch);
						break;
					default:
						break;
					}
					if (createdClass.cellArr[totalCells-offByOne].playerState) {
						buttonInteraction.update({
							components: [],
							content: `**Congratulations!**\nYou managed to navigate through a maze even one of my ~~test subjects~~paid workers could finish!`
						}).catch(genericCatch);
					} 
				}
			});
		}).catch(genericCatch);
	});
};
//#endregion