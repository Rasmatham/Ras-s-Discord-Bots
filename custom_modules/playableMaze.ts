
//#region imports
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from "discord.js";
import type { ButtonInteraction, CommandInteraction, EmojiIdentifierResolvable, Interaction } from "discord.js";
import { boolToInt, ephemeral, genericCatch } from "./generalUse";
import mazeThing from "./mazegen";
//#endregion

//#region type definitions
interface emoteList {
	OOOO: EmojiIdentifierResolvable,
	OOOI: EmojiIdentifierResolvable,
	OOIO: EmojiIdentifierResolvable,
	OOII: EmojiIdentifierResolvable,
	OIOO: EmojiIdentifierResolvable,
	OIOI: EmojiIdentifierResolvable,
	OIIO: EmojiIdentifierResolvable,
	OIII: EmojiIdentifierResolvable,
	IOOO: EmojiIdentifierResolvable,
	IOOI: EmojiIdentifierResolvable,
	IOIO: EmojiIdentifierResolvable,
	IOII: EmojiIdentifierResolvable,
	IIOO: EmojiIdentifierResolvable,
	IIOI: EmojiIdentifierResolvable,
	IIIO: EmojiIdentifierResolvable,
	IIII: EmojiIdentifierResolvable,
	goal: {
		OOII: EmojiIdentifierResolvable,
		OIII: EmojiIdentifierResolvable,
		IOII: EmojiIdentifierResolvable
	}
}
type emoteTypeList = [
	emoteList[],
	emoteList[]
];
interface mazeObj {
	x: number,
	y: number,
	top: boolean,
	left: boolean,
	bottom: boolean,
	right: boolean,
	set: number
}
type halfBitAsString = `${ `I` | `O` }${ `I` | `O` }${ `I` | `O` }${ `I` | `O` }`;
//#endregion

//#region maze generator
export const mazeFunction = (inObjs: Array<{interaction: CommandInteraction}>): void => {
	inObjs.forEach((inObj) => {
		const 
		emotes:emoteTypeList = [
			[
				{
					IIII: `<:1111:733748792360304742>`,
					IIIO: `<:1110:733748791974428813>`,
					IIOI: `<:1101:733748792079286274>`,
					IIOO: `<:1100:733748792209309797>`,
					IOII: `<:1011:733748791978623099>`,
					IOIO: `<:1010:733748792452579368>`,
					IOOI: `<:1001:733748792238669865>`,
					IOOO: `<:1000:733748792238800996>`,
					OIII: `<:0111:733748792620220503>`,
					OIIO: `<:0110:733748791920033823>`,
					OIOI: `<:0101:733748791944937575>`,
					OIOO: `<:0100:733748791869702276>`,
					OOII: `<:0011:733748792133681212>`,
					OOIO: `<:0010:733748792158847047>`,
					OOOI: `<:0001:733748792138137702>`,
					OOOO: `<:0000:733748791806525522>`,
					goal: {
						IOII: `<:G1011:826100214707519519>`,
						OIII: `<:G0111:826100214737272842>`,
						OOII: `<:G0011:826100214766239794>`,
					},
				},
				{
					IIII: `<:1111Z:738891841641906326>`,
					IIIO: `<:1110Z:738891841339916400>`,
					IIOI: `<:1101Z:738891841415413813>`,
					IIOO: `<:1100Z:738891841444774010>`,
					IOII: `<:1011Z:738891841667334265>`,
					IOIO: `<:1010Z:738891841394704455>`,
					IOOI: `<:1001Z:738891841549893725>`,
					IOOO: `<:1000Z:738891841633517608>`,
					OIII: `<:0111Z:738891841604419646>`,
					OIIO: `<:0110Z:738891841264549960>`,
					OIOI: `<:0101Z:738891841289584691>`,
					OIOO: `<:0100Z:738891841587380225>`,
					OOII: `<:0011Z:738891841599963286>`,
					OOIO: `<:0010Z:738891841570865153>`,
					OOOI: `<:0001Z:738891841553956884>`,
					OOOO: `<:0000Z:738891841667334214>`,
					goal: {
						IOII: `<:G1011Z:826100258018820186>`,
						OIII: `<:G0111Z:826100257964032051>`,
						OOII: `<:G0011Z:826100257871364167>`,
					},
				},
			],
			[
				{
					IIII: `<:1111:739569121703755878>`,
					IIIO: `<:1110:739569121938636860>`,
					IIOI: `<:1101:739569121997357106>`,
					IIOO: `<:1100:739569121976647792>`,
					IOII: `<:1011:739569122182168667>`,
					IOIO: `<:1010:739569121565343826>`,
					IOOI: `<:1001:739569122165129287>`,
					IOOO: `<:1000:739569121884110968>`,
					OIII: `<:0111:739569121984905226>`,
					OIIO: `<:0110:739569121422999715>`,
					OIOI: `<:0101:739569121896955944>`,
					OIOO: `<:0100:739569121523400776>`,
					OOII: `<:0011:739569121846624326>`,
					OOIO: `<:0010:739569121905213440>`,
					OOOI: `<:0001:739569121695367280>`,
					OOOO: `<:0000:739569121695498341>`,
					goal: {
						IOII: `<:G1011:826101334834020362>`,
						OIII: `<:G0111:826101334809640974>`,
						OOII: `<:G0011:826101334863642685>`,
					},
				},
				{
					IIII: `<:1111Z:739569256399896678>`,
					IIIO: `<:1110Z:739569256676720790>`,
					IIOI: `<:1101Z:739569256412479510>`,
					IIOO: `<:1100Z:739569256710013029>`,
					IOII: `<:1011Z:739569256408154144>`,
					IOIO: `<:1010Z:739569256806744115>`,
					IOOI: `<:1001Z:825836934210781204>`,
					IOOO: `<:1000Z:739569256756150383>`,
					OIII: `<:0111Z:739569256659943544>`,
					OIIO: `<:0110Z:739569256202502162>`,
					OIOI: `<:0101Z:739569257087762473>`,
					OIOO: `<:0100Z:739569256743567452>`,
					OOII: `<:0011Z:739569256601092186>`,
					OOIO: `<:0010Z:739569256550629417>`,
					OOOI: `<:0001Z:739569256559149056>`,
					OOOO: `<:0000Z:739569256521269372>`,
					goal: {
						IOII: `<:G1011Z:826101295357755442>`,
						OIII: `<:G0111Z:826101295344517120>`,
						OOII: `<:G0011Z:826101295189721136>`,
					},
				},
			]
		],
		options = inObj.interaction.options.get(`style`),
		style = typeof options?.value === `number` ? options.value : 0;
	
		class Cell {
			public emotes:emoteTypeList;
			private loc: number[];
			private hasPlayer: boolean;
			private walls: halfBitAsString;
			public constructor(emoteList:emoteTypeList, x: number, y: number, hasPlayer: boolean, walls: halfBitAsString) {
				this.emotes = emotes;
				this.loc = [ x, y ];
				this.hasPlayer = hasPlayer;
				this.walls = walls;
			}
			public get playerState(): boolean {
				return this.hasPlayer;
			}
			public get x(): number {
				return this.loc[0];
			}
			public get y(): number {
				return this.loc[1];
			}
			public movePlayer(): void {
				this.hasPlayer = !this.hasPlayer;
			}
			public get getWalls(): EmojiIdentifierResolvable {
				if (this.loc[0] === 7 && this.loc[1] === 7) 
					return this.emotes[boolToInt({ bool: this.hasPlayer })][style].goal[this.walls as `OOII` | `OIII` | `IOII`];
				return this.emotes[boolToInt({ bool: this.hasPlayer })][style][this.walls];
				
			}
			public get boolWalls(): string[] {
				return this.walls.split(``);
			}
		}
		class Maze {
			private emotes:emoteTypeList;
			private playerLoc: number[];
			private cells: Cell[];
			public constructor(emoteList:emoteTypeList) {
				this.emotes = emoteList;
				this.playerLoc = [ 0, 0 ];
				this.cells = [];
			}
			public get cellArr(): Cell[] {
				return this.cells;
			}
			public addCell(x: number, y: number, walls: halfBitAsString): void {
				this.cells.push(new Cell(this.emotes, x, y, x === 0 && y === 0, walls));
			}
			public moveLeft(): void {
				let lock: boolean;
				lock = true;
				this.cells.forEach((cell, i) => {
					if (cell.playerState && cell.y > 0 && lock && cell.boolWalls[0] === `O`) {
						cell.movePlayer();
						this.cells[i - 1].movePlayer();
						lock = !lock;
					}
				});
			}
			public moveUp(): void {
				let lock: boolean;
				lock = true;
				this.cells.forEach((cell, i) => {
					if (cell.playerState && cell.x > 0 && lock && cell.boolWalls[1] === `O`) {
						cell.movePlayer();
						this.cells[i - 8].movePlayer();
						lock = !lock;
					}
				});
			}
			public moveDown(): void {
				let lock: boolean;
				lock = true;
				this.cells.forEach((cell, i) => {
					if (cell.playerState && cell.x < 7 && lock && cell.boolWalls[3] === `O`) {
						cell.movePlayer();
						this.cells[i + 8].movePlayer();
						lock = !lock;
					}
				});
			}
			public moveRight(): void {
				let lock: boolean;
				lock = true;
				this.cells.forEach((cell, i) => {
					if (cell.playerState && cell.y < 7 && lock && cell.boolWalls[2] === `O`) {
						cell.movePlayer();
						this.cells[i + 1].movePlayer();
						lock = !lock;
					}
				});
			}
		}
		// eslint-disable-next-line one-var
		const createdClass:Maze = new Maze(emotes),
		maze:mazeObj[][] = mazeThing(8, 8) as mazeObj[][];
		maze.forEach((x: mazeObj[], i: number) => {
			x.forEach((y: mazeObj, j: number) => {
				createdClass.addCell(i, j, `${y.left ? `I` : `O`}${y.top? `I` : `O`}${y.right? `I` : `O`}${y.bottom? `I` : `O`}`);
			});
		});
	
		// eslint-disable-next-line one-var
		const mazeMessage = (mazeObj: Maze):string => {
			let messageText;
			messageText = ``;
			for (let i = 0; i < 8; i += 1) {
				for (let j = 0; j < 8; j += 1) 
					messageText = `${messageText}${mazeObj.cellArr[i * 8 + j].getWalls.toString()}`;
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
					const buttonInteraction:ButtonInteraction = interaction;
					switch (buttonInteraction.customId) {
					case `Left`:
						createdClass.moveLeft();
						if (!createdClass.cellArr[63].playerState) 
							buttonInteraction.update(mazeMessage(createdClass)).catch(genericCatch);
						break;
					case `Up`:
						createdClass.moveUp();
						if (!createdClass.cellArr[63].playerState) 
							buttonInteraction.update(mazeMessage(createdClass)).catch(genericCatch);
						break;
					case `Down`:
						createdClass.moveDown();
						if (!createdClass.cellArr[63].playerState) 
							buttonInteraction.update(mazeMessage(createdClass)).catch(genericCatch);
						break;
					case `Right`:
						createdClass.moveRight();
						if (!createdClass.cellArr[63].playerState) 
							buttonInteraction.update(mazeMessage(createdClass)).catch(genericCatch);
						break;
					default:
						break;
					}
					if (createdClass.cellArr[63].playerState) {
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