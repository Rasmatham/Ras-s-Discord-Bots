import type * as djs from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Bots {
	botConfig: Array<{
		clientOtions: djs.ClientOptions;
		features?: {
			commands?: {
				botlink?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				coinflip?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				dice?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				generalReply?: Array<{		
					active: boolean;
					message: djs.InteractionReplyOptions;
					name: string;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				}>;
				joindate?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				maze?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				reboot?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				serverInfo?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				ticTacToe?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				userinfo?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				wordle?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
				xkcd?: {
					active: boolean;
					permissions?: {
						channelBlacklist?: djs.ChannelResolvable[];
						channelWhitelist?: djs.ChannelResolvable[];
						everyone: boolean;
						guildBlacklist?: djs.GuildResolvable[];
						guildWhitelist?: djs.GuildResolvable[];
						roleBlacklist?: djs.RoleResolvable[];
						roleWhitelist?: djs.RoleResolvable[];
						userBlacklist?: djs.UserResolvable[];
						userWhitelist?: djs.UserResolvable[];
					}
					visibility?: `choice` | `private` | `visible`;
				};
			};
			triggers?: Array<{
				active: boolean;
				input: {
					strict?: boolean;
					triggers: string[];
					type: `string`;
				} | {
					triggers: Array<djs.ChannelResolvable | djs.RoleResolvable | djs.UserResolvable>
					type: `mention`;
				} | {
					triggers: djs.EmojiResolvable[];
					type: `reaction`;
				};
				output: {
					emoji: djs.EmojiIdentifierResolvable
					type: `reaction`;
				} | {
					message: djs.MessageReplyOptions
					type: `message`;
				} | {
					reply: djs.MessageReplyOptions
					type: `reply`;
				};
			}>
		}
		name: string;
		token: string;
	}>;
	generalConfig: {
		envPath: string
	};
}