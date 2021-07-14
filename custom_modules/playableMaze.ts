
import { CommandInteraction, MessageActionRow, MessageButton, ButtonInteraction, Interaction } from "discord.js";
const mazeThing = require(`generate-maze`);
var mazeFunction = (interaction: CommandInteraction) => {
    const style = interaction.options.get(`style`).value as boolean
    const emotes = {
        false: {
            normal: {
                OOOO: `<:0000:733748791806525522>`,
                OOOI: `<:0001:733748792138137702>`,
                OOIO: `<:0010:733748792158847047>`,
                OOII: `<:0011:733748792133681212>`,
                OIOO: `<:0100:733748791869702276>`,
                OIOI: `<:0101:733748791944937575>`,
                OIIO: `<:0110:733748791920033823>`,
                OIII: `<:0111:733748792620220503>`,
                IOOO: `<:1000:733748792238800996>`,
                IOOI: `<:1001:733748792238669865>`,
                IOIO: `<:1010:733748792452579368>`,
                IOII: `<:1011:733748791978623099>`,
                IIOO: `<:1100:733748792209309797>`,
                IIOI: `<:1101:733748792079286274>`,
                IIIO: `<:1110:733748791974428813>`,
                IIII: `<:1111:733748792360304742>`,
                goal: {
                    OOII: `<:G0011:826100214766239794>`,
                    OIII: `<:G0111:826100214737272842>`,
                    IOII: `<:G1011:826100214707519519>`,
                },
            },
            zelda: {
                OOOO: `<:0000Z:738891841667334214>`,
                OOOI: `<:0001Z:738891841553956884>`,
                OOIO: `<:0010Z:738891841570865153>`,
                OOII: `<:0011Z:738891841599963286>`,
                OIOO: `<:0100Z:738891841587380225>`,
                OIOI: `<:0101Z:738891841289584691>`,
                OIIO: `<:0110Z:738891841264549960>`,
                OIII: `<:0111Z:738891841604419646>`,
                IOOO: `<:1000Z:738891841633517608>`,
                IOOI: `<:1001Z:738891841549893725>`,
                IOIO: `<:1010Z:738891841394704455>`,
                IOII: `<:1011Z:738891841667334265>`,
                IIOO: `<:1100Z:738891841444774010>`,
                IIOI: `<:1101Z:738891841415413813>`,
                IIIO: `<:1110Z:738891841339916400>`,
                IIII: `<:1111Z:738891841641906326>`,
                goal: {
                    OOII: `<:G0011Z:826100257871364167>`,
                    OIII: `<:G0111Z:826100257964032051>`,
                    IOII: `<:G1011Z:826100258018820186>`,
                },
            },
        },
        true: {
            normal: {
                OOOO: `<:0000:739569121695498341>`,
                OOOI: `<:0001:739569121695367280>`,
                OOIO: `<:0010:739569121905213440>`,
                OOII: `<:0011:739569121846624326>`,
                OIOO: `<:0100:739569121523400776>`,
                OIOI: `<:0101:739569121896955944>`,
                OIIO: `<:0110:739569121422999715>`,
                OIII: `<:0111:739569121984905226>`,
                IOOO: `<:1000:739569121884110968>`,
                IOOI: `<:1001:739569122165129287>`,
                IOIO: `<:1010:739569121565343826>`,
                IOII: `<:1011:739569122182168667>`,
                IIOO: `<:1100:739569121976647792>`,
                IIOI: `<:1101:739569121997357106>`,
                IIIO: `<:1110:739569121938636860>`,
                IIII: `<:1111:739569121703755878>`,
                goal: {
                    OOII: `<:G0011:826101334863642685>`,
                    OIII: `<:G0111:826101334809640974>`,
                    IOII: `<:G1011:826101334834020362>`,
                },
            },
            zelda: {
                OOOO: `<:0000Z:739569256521269372>`,
                OOOI: `<:0001Z:739569256559149056>`,
                OOIO: `<:0010Z:739569256550629417>`,
                OOII: `<:0011Z:739569256601092186>`,
                OIOO: `<:0100Z:739569256743567452>`,
                OIOI: `<:0101Z:739569257087762473>`,
                OIIO: `<:0110Z:739569256202502162>`,
                OIII: `<:0111Z:739569256659943544>`,
                IOOO: `<:1000Z:739569256756150383>`,
                IOOI: `<:1001Z:825836934210781204>`,
                IOIO: `<:1010Z:739569256806744115>`,
                IOII: `<:1011Z:739569256408154144>`,
                IIOO: `<:1100Z:739569256710013029>`,
                IIOI: `<:1101Z:739569256412479510>`,
                IIIO: `<:1110Z:739569256676720790>`,
                IIII: `<:1111Z:739569256399896678>`,
                goal: {
                    OOII: `<:G0011Z:826101295189721136>`,
                    OIII: `<:G0111Z:826101295344517120>`,
                    IOII: `<:G1011Z:826101295357755442>`,
                },
            },
        },
    };
    
    class Cell {
        private _emotes: any;
        private _loc: number[];
        private _hasPlayer: boolean;
        private _walls: string;
        constructor(emotes: any, x: number, y: number, hasPlayer: boolean, walls: `${`I`|`O`}${`I`|`O`}${`I`|`O`}${`I`|`O`}`) {
            this._emotes = emotes;
            this._loc = [x, y];
            this._hasPlayer = hasPlayer;
            this._walls = walls;
        }
        get playerState() {
            return this._hasPlayer;
        }
        get x() {
            return this._loc[0];
        }
        get y() {
            return this._loc[1];
        }
        movePlayer() {
            this._hasPlayer = !this._hasPlayer;
        }
        get walls() {
            if (this._loc[0] === 7 && this._loc[1] === 7) {
                return this._emotes[this._hasPlayer.toString()][style.toString()].goal[this._walls];
            } else {
                return this._emotes[this._hasPlayer.toString()][style.toString()][this._walls];
            }
        }
        get boolWalls() {
            return this._walls.split(``);
        }
    }
    class Maze {
        private _emotes: any;
        private _playerLoc: number[];
        private _cells: any[];
        constructor(emotes: any) {
            this._emotes = emotes;
            this._playerLoc = [0, 0];
            this._cells = [];
        }
        get cellArr() {
            return this._cells;
        }
        addCell(x: number, y: number, walls: `${`I`|`O`}${`I`|`O`}${`I`|`O`}${`I`|`O`}`) {
            this._cells.push(new Cell(this._emotes, x, y, x === 0 && y === 0, walls));
        }
        moveLeft() {
            let lock = true;
            this._cells.forEach((cell, i) => {
                if (cell.playerState && cell.y > 0 && lock && cell.boolWalls[0] === `O`) {
                    cell.movePlayer();
                    this._cells[i - 1].movePlayer();
                    lock = !lock;
                }
            });
        }
        moveUp() {
            let lock = true;
            this._cells.forEach((cell, i) => {
                if (cell.playerState && cell.x > 0 && lock && cell.boolWalls[1] === `O`) {
                    cell.movePlayer();
                    this._cells[i - 8].movePlayer();
                    lock = !lock;
                }
            });
        }
        moveDown() {
            let lock = true;
            this._cells.forEach((cell, i) => {
                if (cell.playerState && cell.x < 7 && lock && cell.boolWalls[3] === `O`) {
                    cell.movePlayer();
                    this._cells[i + 8].movePlayer();
                    lock = !lock;
                }
            });
        }
        moveRight() {
            let lock = true;
            this._cells.forEach((cell, i) => {
                if (cell.playerState && cell.y < 7 && lock && cell.boolWalls[2] === `O`) {
                    cell.movePlayer();
                    this._cells[i + 1].movePlayer();
                    lock = !lock;
                }
            });
        }
    }
    const createdClass = new Maze(emotes);
    var maze = mazeThing(8, 8);
    maze.forEach((x: any, i: number) => {
        x.forEach((y: {left: boolean, top: boolean, right: boolean, bottom: boolean}, j: number) => {
            createdClass.addCell(i, j, `${y.left
            }${y.top
            }${y.right
            }${y.bottom
            }`.replace(/true/g, `I`)
            .replace(/false/g, `O`) as `${`I`|`O`}${`I`|`O`}${`I`|`O`}${`I`|`O`}`);
        })
    })
    
    var mazeMessage = (mazeObj: any) => {
        let messageText = ``;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                messageText = `${messageText}${mazeObj.cellArr[i * 8 + j].walls}`;
            }
            messageText = `${messageText}\n`;
        }
        return messageText;
    }
    const arrows = new MessageActionRow()
    .addComponents([
        new MessageButton()
        .setCustomID(`Left`)
        .setEmoji(`⬅️`)
        .setStyle(`SECONDARY`)
    ],[
        new MessageButton()
        .setCustomID(`Up`)
        .setEmoji(`⬆️`)
        .setStyle(`SECONDARY`)
    ],[
        new MessageButton()
        .setCustomID(`Down`)
        .setEmoji(`⬇️`)
        .setStyle(`SECONDARY`)
    ],[
        new MessageButton()
        .setCustomID(`Right`)
        .setEmoji(`➡️`)
        .setStyle(`SECONDARY`)
    ])
    interaction.reply({content: mazeMessage(createdClass), components: [arrows], ephemeral: true}).then(() => {
        interaction.client.on(`interactionCreate`, (interaction: Interaction) => {
            if (interaction.isButton() && interaction.id == interaction.message.interaction.id){
                const buttonInteraction = interaction as ButtonInteraction
                switch (buttonInteraction.customID) {
                    case `Left`:
                    createdClass.moveLeft();
                    if (!createdClass.cellArr[63].playerState) {
                        buttonInteraction.update(mazeMessage(createdClass))
                        .catch(console.error);
                    }
                    break;
                    case `Up`:
                    createdClass.moveUp();
                    if (!createdClass.cellArr[63].playerState) {
                        buttonInteraction.update(mazeMessage(createdClass))
                        .catch(console.error);
                    }
                    break;
                    case `Down`:
                    createdClass.moveDown();
                    if (!createdClass.cellArr[63].playerState) {
                        buttonInteraction.update(mazeMessage(createdClass))
                        .catch(console.error);
                    }
                    break;
                    case `Right`:
                    createdClass.moveRight();
                    if (!createdClass.cellArr[63].playerState) {
                        buttonInteraction.update(mazeMessage(createdClass))
                        .catch(console.error);
                    }
                    break;
                    default:
                    break;
                }
                if (createdClass.cellArr[63].playerState) {
                    buttonInteraction.update({content: `**Congratulations!**\nYou managed to navigate through a maze even one of my ~~test subjects~~paid workers could finish!`, components: []})
                    .catch(console.error);
                } 
            }
        })
    })
    .catch(console.error);
}
module.exports = mazeFunction;