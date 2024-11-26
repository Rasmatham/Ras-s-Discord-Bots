import type * as djs from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Bots {
	botConfig: Array<{
		name: string;
		clientOtions: djs.ClientOptions;
		token: string;
		features?: {
			commands?: {
				generalReply?: Array<{		
					active: boolean;
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					visibility?: `choice` | `private` | `visible`;
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
					type: `mention`;
					triggers: Array<djs.ChannelResolvable | djs.RoleResolvable | djs.UserResolvable>
				} | {
					type: `reaction`;
					triggers: djs.EmojiResolvable[];
				} | {
					type: `string`;
					strict?: boolean;
					triggers: string[];
				};
				output: {
					type: `message`;
					message: djs.MessageReplyOptions
				} | {
					type: `reaction`;
					emoji: djs.EmojiIdentifierResolvable
				} | {
					type: `reply`;
					reply: djs.MessageReplyOptions
				};
			}>
		}
	}>;
	generalConfig: {
		envPath: string
	};
}