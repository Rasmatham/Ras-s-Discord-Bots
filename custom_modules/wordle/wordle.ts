
import {Client, Message, MessageEmbed, ColorResolvable, GuildMember, Interaction, MessageComponentInteraction, ButtonInteraction, CommandInteraction, SelectMenuInteraction, PartialGuildMember, BufferResolvable, InteractionReplyOptions, MessageActionRow, MessageButton, MessageInteraction, Emoji} from "discord.js";
import * as words from "./words";
type Letter = `a` | `b` | `c` | `d` | `e` | `f` | `g` | `h` | `i` | `j` | `k` | `l` | `m` | `n` | `o` | `p` | `q` | `r` | `s` | `t` | `u` | `v` | `w` | `x` | `y` | `z`;
export const startGame = (interaction: CommandInteraction):void => {
	switch (interaction.options.getSubcommandGroup(false)) {
	case `play`:
		interaction.reply({ephemeral: true, content: `please wait`}).then(() => {
			const wordle = new Wordle(interaction);
			wordle.start();
		});
		break;
	default:
		interaction.reply({ephemeral: true, content: `This command will not be implemented until I have a dedicated computer to host on`});
	}
};
// eslint-disable-next-line no-irregular-whitespace
const zws = `_​_`;
const emotes = {
	blue: {
		a: `🇦`,
		b: `🇧`,
		c: `🇨`,
		d: `🇩`,
		e: `🇪`,
		f: `🇫`,
		g: `🇬`,
		h: `🇭`,
		i: `🇮`,
		j: `🇯`,
		k: `🇰`,
		l: `🇱`,
		m: `🇲`,
		n: `🇳`,
		o: `🇴`,
		p: `🇵`,
		q: `🇶`,
		r: `🇷`,
		s: `🇸`,
		t: `🇹`,
		u: `🇺`,
		v: `🇻`,
		w: `🇼`,
		x: `🇽`,
		y: `🇾`,
		z: `🇿`
	},
	orange: {
		a: `<:A_:939208893333139506>`,
		b: `<:B_:939208895149248532>`,
		c: `<:C_:939208895610646548>`,
		d: `<:D_:939208898261434408>`,
		e: `<:E_:939208897066045500>`,
		f: `<:F_:939208897569361920>`,
		g: `<:G_:939208899301629962>`,
		h: `<:H_:939208897456128040>`,
		i: `<:I_:939208897749712976>`,
		j: `<:J_:939208897695199292>`,
		k: `<:K_:939208899301625916>`,
		l: `<:L_:939208898148171776>`,
		m: `<:M_:939208899708457041>`,
		n: `<:N_:939208899670716437>`,
		o: `<:O_:939208899595210842>`,
		p: `<:P_:939208899175780473>`,
		q: `<:Q_:939208900438269962>`,
		r: `<:R_:939208899855286292>`,
		s: `<:S_:939208899498770544>`,
		t: `<:T_:939208898496311376>`,
		u: `<:U_:939208899213525043>`,
		v: `<:V_:939208899528118313>`,
		w: `<:W_:939208900199211008>`,
		x: `<:X_:939208899867848835>`,
		y: `<:Y_:939208899138056263>`,
		z: `<:Z_:939208899490381864>`
	},
	black: {
		a: `<:A_:939208752396136449>`,
		b: `<:B_:939208753885102080>`,
		c: `<:C_:939208754686201866>`,
		d: `<:D_:939208754694598678>`,
		e: `<:E_:939208753402757210>`,
		f: `<:F_:939208753562157207>`,
		g: `<:G_:939208755311157248>`,
		h: `<:H_:939208754493292576>`,
		i: `<:I_:939208753499230268>`,
		j: `<:J_:939208754652655647>`,
		k: `<:K_:939208755269234749>`,
		l: `<:L_:939208753834758214>`,
		m: `<:M_:939208755743186965>`,
		n: `<:N_:939208755344707634>`,
		o: `<:O_:939208755495714816>`,
		p: `<:P_:939208755072094288>`,
		q: `<:Q_:939208756112277644>`,
		r: `<:R_:939208755541844009>`,
		s: `<:S_:939208756590411796>`,
		t: `<:T_:939208754027708527>`,
		u: `<:U_:939208755244060692>`,
		v: `<:V_:939208755730583632>`,
		w: `<:W_:939208756133261332>`,
		x: `<:X_:939208756368146573>`,
		y: `<:Y_:939208755428622356>`,
		z: `<:Z_:939208755520893010>`
	}
};
class Wordle {
	attempts: string[][];
	buttons: { a: MessageButton; b: MessageButton; c: MessageButton; d: MessageButton; e: MessageButton; f: MessageButton; g: MessageButton; h: MessageButton; i: MessageButton; j: MessageButton; k: MessageButton; l: MessageButton; m: MessageButton; n: MessageButton; o: MessageButton; p: MessageButton; q: MessageButton; r: MessageButton; s: MessageButton; t: MessageButton; u: MessageButton; v: MessageButton; w: MessageButton; x: MessageButton; y: MessageButton; z: MessageButton; am: MessageButton; nz: MessageButton; bs: MessageButton; en: MessageButton; };
	cmd: CommandInteraction;
	gameID: string;
	word: string;
	attempt: number;
	slot: number;
	words: string[][];
	hints: {placed: [string, string, string, string, string], guessed: string[]}
	difficulty: string;
	constructor (interaction: CommandInteraction) {
		this.cmd = interaction;
		this.difficulty = this.cmd.options.getSubcommand(true);
		this.gameID = interaction.id;
		this.word = words.spoilers[Math.floor(Math.random()*words.spoilers.length)];
		this.buttons = {
			a: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_a`).setEmoji(emotes.black.a),
			b: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_b`).setEmoji(emotes.black.b),
			c: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_c`).setEmoji(emotes.black.c),
			d: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_d`).setEmoji(emotes.black.d),
			e: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_e`).setEmoji(emotes.black.e),
			f: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_f`).setEmoji(emotes.black.f),
			g: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_g`).setEmoji(emotes.black.g),
			h: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_h`).setEmoji(emotes.black.h),
			i: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_i`).setEmoji(emotes.black.i),
			j: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_j`).setEmoji(emotes.black.j),
			k: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_k`).setEmoji(emotes.black.k),
			l: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_l`).setEmoji(emotes.black.l),
			m: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_m`).setEmoji(emotes.black.m),
			n: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_n`).setEmoji(emotes.black.n),
			o: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_o`).setEmoji(emotes.black.o),
			p: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_p`).setEmoji(emotes.black.p),
			q: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_q`).setEmoji(emotes.black.q),
			r: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_r`).setEmoji(emotes.black.r),
			s: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_s`).setEmoji(emotes.black.s),
			t: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_t`).setEmoji(emotes.black.t),
			u: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_u`).setEmoji(emotes.black.u),
			v: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_v`).setEmoji(emotes.black.v),
			w: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_w`).setEmoji(emotes.black.w),
			x: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_x`).setEmoji(emotes.black.x),
			y: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_y`).setEmoji(emotes.black.y),
			z: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_z`).setEmoji(emotes.black.z),
			am: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_a_to_m`).setLabel(`A-M`),
			nz: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_n_to_z`).setLabel(`N-Z`),
			bs: new MessageButton().setStyle(`PRIMARY`).setCustomId(`wordle_backspace`).setEmoji(`⬅️`),
			en: new MessageButton().setStyle(`SUCCESS`).setCustomId(`wordle_enter`).setEmoji(`✅`)
		};
		this.attempt = 0;
		this.slot = 0;
		this.attempts = [[`⬛`, `⬛`, `⬛`, `⬛`, `⬛`], [], [], [], [], []];
		this.hints = {placed: [``, ``, ``, ``, ``], guessed: []};
		this.words = [[],[],[],[],[],[]];
		this.cmd.client.on(`interactionCreate`, (interaction) => {
			if (!interaction.isMessageComponent()) return;
			if (!interaction.isButton()) return;
			if (interaction.message.interaction?.id != this.cmd.id) return;
			if (!interaction.customId.startsWith(`wordle_`)) return;
			const id = interaction.customId.replace(`wordle_`, ``);
			if (/^[a-z]{1}$/.test(id)) {
				if (this.slot >= 5){interaction.reply({ephemeral: true, content: `You can't add more letters`}); return;}
				this.attempts[this.attempt][this.slot] = emotes.black[id as Letter];
				this.words[this.attempt][this.slot] = id;
				this.slot++;
				interaction.update({content: this.attempts.map((x) => x.join(zws)).join(`\n`)});
			} else {
				switch (id) {
				case `a_to_m`:
					interaction.update({components: this.buttonsFirstHalf});
					break;
				case `n_to_z`:
					interaction.update({components: this.buttonsSecondHalf});
					break;
				case `backspace`:
					if (this.slot <= 0) {interaction.reply({ephemeral: true, content: `You can't have less than 0 letters`}); return;}
					this.slot--;
					this.attempts[this.attempt][this.slot] = `⬛`;
					this.words[this.attempt][this.slot] = ``;
					interaction.update({content: this.attempts.map((x) => x.join(zws)).join(`\n`)});
					break;
				case `enter`:
					if (this.slot < 5) {interaction.reply({ephemeral: true, content: `You need 5 letters to submit`}); return;}
					if (!words.validWords.includes(this.words[this.attempt].join(``)) && !words.spoilers.includes(this.words[this.attempt].join(``))){interaction.reply({ephemeral: true, content: `This word is not valid`}); return;}
					switch (this.difficulty){
					case `easy`:
						if (this.word == this.words[this.attempt].join(``)) { //if won
							this.words[this.attempt].forEach((x, i) => {
								if (this.word[i] == x) {
									this.attempts[this.attempt][i] = emotes.blue[x as Letter];
									this.buttons[x as Letter] = this.buttons[x as Letter].setEmoji(emotes.blue[x as Letter]);
								}
							});
							this.words[this.attempt].forEach((x, i) => {
								if (this.word.includes(x) && this.attempts[this.attempt][i] != emotes.blue[x as Letter] && this.attempts[this.attempt].filter(y => (y == emotes.blue[x as Letter] || y == emotes.orange[x as Letter])).length < this.word.split(``).filter(y => y == x).length) {
									this.attempts[this.attempt][i] = emotes.orange[x as Letter];
								}
							});
							interaction.update({components: [], content: zws});
							this.cmd.followUp({content: `GLaDLE ${this.attempt + 1}/6\n${this.attempts.map((x) => x.join(zws)).join(`\n`)}\nFrom: ${this.cmd.user.tag}`});
						} else { //not won
							if (this.attempt < 5) { //if before last attempt
								this.words[this.attempt].forEach((x, i) => {
									if (this.word[i] == x) {
										this.attempts[this.attempt][i] = emotes.blue[x as Letter];
										this.buttons[x as Letter] = this.buttons[x as Letter].setEmoji(emotes.blue[x as Letter]);
									} else {
										this.buttons[x as Letter] = this.buttons[x as Letter].setStyle(`SECONDARY`);
									}
								});
								this.words[this.attempt].forEach((x, i) => {
									if (this.word.includes(x) && this.attempts[this.attempt][i] != emotes.blue[x as Letter] && this.attempts[this.attempt].filter(y => (y == emotes.blue[x as Letter] || y == emotes.orange[x as Letter])).length < this.word.split(``).filter(y => y == x).length) {
										this.attempts[this.attempt][i] = emotes.orange[x as Letter];
										this.buttons[x as Letter].setEmoji(emotes.orange[x as Letter]);
										this.buttons[x as Letter] = this.buttons[x as Letter].setStyle(`PRIMARY`);
									}
								});
								this.slot = 0;
								this.attempt++;
								this.attempts[this.attempt] = [`⬛`, `⬛`, `⬛`, `⬛`, `⬛`];
								interaction.update({components: this.buttonsFirstHalf, content: this.attempts.map((x) => x.join(zws)).join(`\n`)});
							} else if (this.attempt <= 5){ //if last attempt
								interaction.update({components: [], content: zws});
								this.cmd.followUp({content: `GLaDLE _FAILURE_/6\n${this.attempts.map((x) => x.join(zws)).join(`\n`)}\nFrom: ${this.cmd.user.tag}\nThe word was: ${this.word}`});
							}
						}
						break;
					case `hard`:
						if (this.word == this.words[this.attempt].join(``)) { //if won
							this.words[this.attempt].forEach((x, i) => {
								if (this.word[i] == x) {
									this.attempts[this.attempt][i] = emotes.blue[x as Letter];
									this.buttons[x as Letter] = this.buttons[x as Letter].setEmoji(emotes.blue[x as Letter]);
								}
							});
							this.words[this.attempt].forEach((x, i) => {
								if (this.word.includes(x) && this.attempts[this.attempt][i] != emotes.blue[x as Letter] && this.attempts[this.attempt].filter(y => (y == emotes.blue[x as Letter] || y == emotes.orange[x as Letter])).length < this.word.split(``).filter(y => y == x).length) {
									this.attempts[this.attempt][i] = emotes.orange[x as Letter];
								}
							});
							interaction.update({components: [], content: zws});
							this.cmd.followUp({content: `GLaDLE ${this.attempt + 1}/6\n${this.attempts.map((x) => x.join(zws)).join(`\n`)}\nFrom: ${this.cmd.user.tag}`});
						} else { //not won
							if(!(this.words[this.attempt].every((x, i) => (x == this.hints.placed[i] || this.hints.placed[i] == ``)) && this.hints.guessed.every((x, i) => this.words[this.attempt].includes(x)))) {interaction.reply({ephemeral: true, content: `You need to use your hints`}); return;}
							this.hints = {placed: [``, ``, ``, ``, ``], guessed: []};
							if (this.attempt < 5) { //if before last attempt
								this.words[this.attempt].forEach((x, i) => {
									if (this.word[i] == x) {
										this.attempts[this.attempt][i] = emotes.blue[x as Letter];
										this.buttons[x as Letter] = this.buttons[x as Letter].setEmoji(emotes.blue[x as Letter]);
										this.hints.placed[i] = x;
									} else {
										this.buttons[x as Letter] = this.buttons[x as Letter].setStyle(`SECONDARY`);
									}
								});
								this.words[this.attempt].forEach((x, i) => {
									if (this.word.includes(x) && this.attempts[this.attempt][i] != emotes.blue[x as Letter] && this.attempts[this.attempt].filter(y => (y == emotes.blue[x as Letter] || y == emotes.orange[x as Letter])).length < this.word.split(``).filter(y => y == x).length) {
										this.attempts[this.attempt][i] = emotes.orange[x as Letter];
										this.hints.guessed.push(x);
										this.buttons[x as Letter].setEmoji(emotes.orange[x as Letter]);
										this.buttons[x as Letter] = this.buttons[x as Letter].setStyle(`PRIMARY`);
									}
								});
								this.slot = 0;
								this.attempt++;
								this.attempts[this.attempt] = [`⬛`, `⬛`, `⬛`, `⬛`, `⬛`];
								interaction.update({components: this.buttonsFirstHalf, content: this.attempts.map((x) => x.join(zws)).join(`\n`)});
							} else if (this.attempt <= 5){ //if last attempt
								interaction.update({components: [], content: zws});
								this.cmd.followUp({content: `GLaDLE _FAILURE_/6\n${this.attempts.map((x) => x.join(zws)).join(`\n`)}\nFrom: ${this.cmd.user.tag}\nThe word was: ${this.word}`});
							}



						}
						break;
					}
					break;
				}
			}
		});
	}
	get buttonsFirstHalf(){
		return [
			new MessageActionRow().addComponents(this.buttons.a).addComponents(this.buttons.b).addComponents(this.buttons.c).addComponents(this.buttons.d).addComponents(this.buttons.e),
			new MessageActionRow().addComponents(this.buttons.f).addComponents(this.buttons.g).addComponents(this.buttons.h).addComponents(this.buttons.i).addComponents(this.buttons.j),
			new MessageActionRow().addComponents(this.buttons.k).addComponents(this.buttons.l).addComponents(this.buttons.m).addComponents(this.buttons.bs).addComponents(this.buttons.en),
			new MessageActionRow().addComponents(this.buttons.nz)
		];
	}
	get buttonsSecondHalf(){
		return [
			new MessageActionRow().addComponents(this.buttons.n).addComponents(this.buttons.o).addComponents(this.buttons.p).addComponents(this.buttons.q).addComponents(this.buttons.r),
			new MessageActionRow().addComponents(this.buttons.s).addComponents(this.buttons.t).addComponents(this.buttons.u).addComponents(this.buttons.v).addComponents(this.buttons.w),
			new MessageActionRow().addComponents(this.buttons.x).addComponents(this.buttons.y).addComponents(this.buttons.z).addComponents(this.buttons.bs).addComponents(this.buttons.en),
			new MessageActionRow().addComponents(this.buttons.am)
		];
	}
	start = () => {
		this.cmd.editReply({
			content: this.attempts.map((x) => x.join(zws)).join(`\n`),
			components: this.buttonsFirstHalf
		});
	}
}