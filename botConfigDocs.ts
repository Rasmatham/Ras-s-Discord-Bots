import * as djs from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Bots {
	generalConfig: {
		envPath: string
	};
	botConfig: Array<{
		name: string;
		clientOtions: djs.ClientOptions;
		token: string;
		features?: {
			commands?: {
				generalReply?: Array<{		
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
					name: string;
					message: djs.InteractionReplyOptions;
				}>;
				botlink?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				userinfo?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				serverInfo?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				joindate?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				dice?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				xkcd?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				maze?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				ticTacToe?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				coinflip?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				wordle?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
				reboot?: {
					active: boolean;
					visibility?: `visible` | `private` | `choice`;
					permissions?: {
						everyone: boolean;
						guildWhitelist?: djs.GuildResolvable[];
						guildBlacklist?: djs.GuildResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						channelBlacklist?: djs.ChannelResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						userWhitelist?: djs.UserResolvable[];
						userBlacklist?: djs.UserResolvable[];
					}
				};
			};
			triggers?: Array<{
				active: boolean;
				input: {
					type: `string`;
					strict?: boolean;
					triggers: string[];
				} | {
					type: `reaction`;
					triggers: djs.EmojiResolvable[];
				} | {
					type: `mention`;
					triggers: Array<djs.UserResolvable | djs.ChannelResolvable | djs.RoleResolvable>
				};
				output: {
					type: `message`;
					message: djs.MessageReplyOptions
				} | {
					type: `reply`;
					reply: djs.MessageReplyOptions
				} | {
					type: `reaction`;
					emoji: djs.EmojiIdentifierResolvable
				};
			}>
		}
	}>;
}