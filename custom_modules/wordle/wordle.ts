
import {ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionType, APIActionRowComponent, APIButtonComponent} from "discord.js";
import * as words from "./words";
type Letter = `a` | `b` | `c` | `d` | `e` | `f` | `g` | `h` | `i` | `j` | `k` | `l` | `m` | `n` | `o` | `p` | `q` | `r` | `s` | `t` | `u` | `v` | `w` | `x` | `y` | `z`;
export const startGame = (interaction: ChatInputCommandInteraction):void => {
	switch (interaction.options.getSubcommandGroup(false)) {
	case `play`:
		void interaction.reply({ephemeral: true, content: `please wait`}).then(() => {
			const wordle = new Wordle(interaction);
			wordle.start();
		});
		break;
	default:
		void interaction.reply({ephemeral: true, content: `This command will not be implemented until I have a dedicated computer to host on`});
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
const emoteButtonInstantiator = (letter:Letter) => {
	return new ButtonBuilder({customId: `wordle_${letter}`, style: ButtonStyle.Primary, emoji:emotes.black[letter]});
};
class Wordle {
	attempts: string[][];
	buttons: { a: ButtonBuilder; b: ButtonBuilder; c: ButtonBuilder; d: ButtonBuilder; e: ButtonBuilder; f: ButtonBuilder; g: ButtonBuilder; h: ButtonBuilder; i: ButtonBuilder; j: ButtonBuilder; k: ButtonBuilder; l: ButtonBuilder; m: ButtonBuilder; n: ButtonBuilder; o: ButtonBuilder; p: ButtonBuilder; q: ButtonBuilder; r: ButtonBuilder; s: ButtonBuilder; t: ButtonBuilder; u: ButtonBuilder; v: ButtonBuilder; w: ButtonBuilder; x: ButtonBuilder; y: ButtonBuilder; z: ButtonBuilder; am: ButtonBuilder; nz: ButtonBuilder; bs: ButtonBuilder; en: ButtonBuilder; };
	cmd: ChatInputCommandInteraction;
	gameID: string;
	word: string;
	attempt: number;
	slot: number;
	words: string[][];
	hints: {placed: [string, string, string, string, string], guessed: string[]}
	difficulty: string;
	constructor (interaction: ChatInputCommandInteraction) {
		this.cmd = interaction;
		this.difficulty = this.cmd.options.getSubcommand(true);
		this.gameID = interaction.id;
		this.word = words.spoilers[Math.floor(Math.random()*words.spoilers.length)];
		this.buttons = {
			a: emoteButtonInstantiator(`a`),
			b: emoteButtonInstantiator(`b`),
			c: emoteButtonInstantiator(`c`),
			d: emoteButtonInstantiator(`d`),
			e: emoteButtonInstantiator(`e`),
			f: emoteButtonInstantiator(`f`),
			g: emoteButtonInstantiator(`g`),
			h: emoteButtonInstantiator(`h`),
			i: emoteButtonInstantiator(`i`),
			j: emoteButtonInstantiator(`j`),
			k: emoteButtonInstantiator(`k`),
			l: emoteButtonInstantiator(`l`),
			m: emoteButtonInstantiator(`m`),
			n: emoteButtonInstantiator(`n`),
			o: emoteButtonInstantiator(`o`),
			p: emoteButtonInstantiator(`p`),
			q: emoteButtonInstantiator(`q`),
			r: emoteButtonInstantiator(`r`),
			s: emoteButtonInstantiator(`s`),
			t: emoteButtonInstantiator(`t`),
			u: emoteButtonInstantiator(`u`),
			v: emoteButtonInstantiator(`v`),
			w: emoteButtonInstantiator(`w`),
			x: emoteButtonInstantiator(`x`),
			y: emoteButtonInstantiator(`y`),
			z: emoteButtonInstantiator(`z`),
			am: new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`wordle_a_to_m`).setLabel(`A-M`),
			nz: new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`wordle_n_to_z`).setLabel(`N-Z`),
			bs: new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`wordle_backspace`).setEmoji(`⬅️`),
			en: new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId(`wordle_enter`).setEmoji(`✅`)
		};
		this.attempt = 0;
		this.slot = 0;
		this.attempts = [[`⬛`, `⬛`, `⬛`, `⬛`, `⬛`], [], [], [], [], []];
		this.hints = {placed: [``, ``, ``, ``, ``], guessed: []};
		this.words = [[],[],[],[],[],[]];
		this.cmd.client.on(`interactionCreate`, (interaction) => {
			if (interaction.type !== InteractionType.MessageComponent) return;
			if (!interaction.isButton()) return;
			if (interaction.message.interactionMetadata?.id != this.cmd.id) return;
			if (!interaction.customId.startsWith(`wordle_`)) return;
			const id = interaction.customId.replace(`wordle_`, ``);
			if (/^[a-z]{1}$/.test(id)) {
				if (this.slot >= 5) {
					void interaction.reply({ephemeral: true, content: `You can't add more letters`});
					return;
				}
				this.attempts[this.attempt][this.slot] = emotes.black[id as Letter];
				this.words[this.attempt][this.slot] = id;
				this.slot++;
				void interaction.update({content: this.attempts.map((x) => x.join(zws)).join(`\n`)});
			} else {
				switch (id) {
				case `a_to_m`:
					void interaction.update({components: this.buttonsFirstHalf});
					break;
				case `n_to_z`:
					void interaction.update({components: this.buttonsSecondHalf});
					break;
				case `backspace`:
					if (this.slot <= 0) {
						void interaction.reply({ephemeral: true, content: `You can't have less than 0 letters`});
						return;
					}
					this.slot--;
					this.attempts[this.attempt][this.slot] = `⬛`;
					this.words[this.attempt][this.slot] = ``;
					void interaction.update({content: this.attempts.map((x) => x.join(zws)).join(`\n`)});
					break;
				case `enter`:
					if (this.slot < 5) {
						void interaction.reply({ephemeral: true, content: `You need 5 letters to submit`});
						return;
					}
					if (!words.validWords.includes(this.words[this.attempt].join(``)) && !words.spoilers.includes(this.words[this.attempt].join(``))) {
						void interaction.reply({ephemeral: true, content: `This word is not valid`});
						return;
					}
					switch (this.difficulty) {
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
							void interaction.update({components: [], content: zws});
							void this.cmd.followUp({content: `GLaDLE ${(this.attempt + 1).toString()}/6\n${this.attempts.map((x) => x.join(zws)).join(`\n`)}\nFrom: ${this.cmd.user.tag}`});
						} else { //not won
							if (this.attempt < 5) { //if before last attempt
								this.words[this.attempt].forEach((x, i) => {
									if (this.word[i] == x) {
										this.attempts[this.attempt][i] = emotes.blue[x as Letter];
										this.buttons[x as Letter] = this.buttons[x as Letter].setEmoji(emotes.blue[x as Letter]);
									} else {
										this.buttons[x as Letter] = this.buttons[x as Letter].setStyle(ButtonStyle.Secondary);
									}
								});
								this.words[this.attempt].forEach((x, i) => {
									if (this.word.includes(x) && this.attempts[this.attempt][i] != emotes.blue[x as Letter] && this.attempts[this.attempt].filter(y => (y == emotes.blue[x as Letter] || y == emotes.orange[x as Letter])).length < this.word.split(``).filter(y => y == x).length) {
										this.attempts[this.attempt][i] = emotes.orange[x as Letter];
										this.buttons[x as Letter].setEmoji(emotes.orange[x as Letter]);
										this.buttons[x as Letter] = this.buttons[x as Letter].setStyle(ButtonStyle.Primary);
									}
								});
								this.slot = 0;
								this.attempt++;
								this.attempts[this.attempt] = [`⬛`, `⬛`, `⬛`, `⬛`, `⬛`];
								void interaction.update({components: this.buttonsFirstHalf, content: this.attempts.map((x) => x.join(zws)).join(`\n`)});
							} else if (this.attempt <= 5) { //if last attempt
								void interaction.update({components: [], content: zws});
								void this.cmd.followUp({content: `GLaDLE _FAILURE_/6\n${this.attempts.map((x) => x.join(zws)).join(`\n`)}\nFrom: ${this.cmd.user.tag}\nThe word was: ${this.word}`});
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
							void interaction.update({components: [], content: zws});
							void this.cmd.followUp({content: `GLaDLE ${(this.attempt + 1).toString()}/6\n${this.attempts.map((x) => x.join(zws)).join(`\n`)}\nFrom: ${this.cmd.user.tag}`});
						} else { //not won
							if (!(this.words[this.attempt].every((x, i) => (x == this.hints.placed[i] || this.hints.placed[i] == ``)) && this.hints.guessed.every((x) => this.words[this.attempt].includes(x)))) {
								void interaction.reply({ephemeral: true, content: `You need to use your hints`});
								return;
							}
							this.hints = {placed: [``, ``, ``, ``, ``], guessed: []};
							if (this.attempt < 5) { //if before last attempt
								this.words[this.attempt].forEach((x, i) => {
									if (this.word[i] == x) {
										this.attempts[this.attempt][i] = emotes.blue[x as Letter];
										this.buttons[x as Letter] = this.buttons[x as Letter].setEmoji(emotes.blue[x as Letter]);
										this.hints.placed[i] = x;
									} else {
										this.buttons[x as Letter] = this.buttons[x as Letter].setStyle(ButtonStyle.Secondary);
									}
								});
								this.words[this.attempt].forEach((x, i) => {
									if (this.word.includes(x) && this.attempts[this.attempt][i] != emotes.blue[x as Letter] && this.attempts[this.attempt].filter(y => (y == emotes.blue[x as Letter] || y == emotes.orange[x as Letter])).length < this.word.split(``).filter(y => y == x).length) {
										this.attempts[this.attempt][i] = emotes.orange[x as Letter];
										this.hints.guessed.push(x);
										this.buttons[x as Letter].setEmoji(emotes.orange[x as Letter]);
										this.buttons[x as Letter] = this.buttons[x as Letter].setStyle(ButtonStyle.Primary);
									}
								});
								this.slot = 0;
								this.attempt++;
								this.attempts[this.attempt] = [`⬛`, `⬛`, `⬛`, `⬛`, `⬛`];
								void interaction.update({components: this.buttonsFirstHalf, content: this.attempts.map((x) => x.join(zws)).join(`\n`)});
							} else if (this.attempt <= 5) { //if last attempt
								void interaction.update({components: [], content: zws});
								void this.cmd.followUp({content: `GLaDLE _FAILURE_/6\n${this.attempts.map((x) => x.join(zws)).join(`\n`)}\nFrom: ${this.cmd.user.tag}\nThe word was: ${this.word}`});
							}



						}
						break;
					}
					break;
				}
			}
		});
	}
	get buttonsFirstHalf() {
		return [
			new ActionRowBuilder().setComponents(this.buttons.a, this.buttons.b, this.buttons.c, this.buttons.d, this.buttons.e),
			new ActionRowBuilder().setComponents(this.buttons.f, this.buttons.g, this.buttons.h, this.buttons.i, this.buttons.j),
			new ActionRowBuilder().setComponents(this.buttons.k, this.buttons.l, this.buttons.m, this.buttons.bs, this.buttons.en),
			new ActionRowBuilder().setComponents(this.buttons.nz)
		].map(x => {
			return x.toJSON() as APIActionRowComponent<APIButtonComponent>
		});
	}
	get buttonsSecondHalf() {
		return [
			new ActionRowBuilder().setComponents(this.buttons.n, this.buttons.o, this.buttons.p, this.buttons.q, this.buttons.r),
			new ActionRowBuilder().setComponents(this.buttons.s, this.buttons.t, this.buttons.u, this.buttons.v, this.buttons.w),
			new ActionRowBuilder().setComponents(this.buttons.x, this.buttons.y, this.buttons.z, this.buttons.bs, this.buttons.en),
			new ActionRowBuilder().setComponents(this.buttons.am)
		].map(x => {
			return x.toJSON() as APIActionRowComponent<APIButtonComponent>
		});
	}
	start = () => {
		void this.cmd.editReply({
			content: this.attempts.map((x) => x.join(zws)).join(`\n`),
			components: this.buttonsFirstHalf
		});
	}
}