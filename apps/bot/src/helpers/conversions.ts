import { Activity, ActivityType, Guild, type GuildMember, type User } from "discord.js";
import z from "zod";

const presenseSchema = z.object({
    status: z.string(),
    clientStatus: z.enum(["online", "idle", "dnd", "offline"]).optional().catch("offline"),
    activities: z.array(
        z.object({
            state: z.string().nullable(),
            emoji: z.object({
                name: z.string().nullable(),
                id: z.string().nullable(),
                animated: z.boolean().nullable(),
            }).nullable(),
            createdAt: z.number(),
        })
    ),
}).nullable();

const dbUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    discriminator: z.string(),
    avatar: z.string(),
    description: z.string().optional(),
    presense: presenseSchema
}).nullable();

export function toDBUser(member: GuildMember) {
    const user = member.user;

    const data = {
        id: user.id,
        name: user.username,
        discriminator: user.discriminator,
        avatar: user.displayAvatarURL({ size: 256 }),
        presense: toDBUserPresence(member)
    } satisfies z.infer<typeof dbUserSchema>;
    return dbUserSchema.parse(data);
}

function toDBUserPresence(member: GuildMember): z.infer<typeof presenseSchema> | null {
    const presence = member.presence;
    if (!presence) return null;
    const clientStatus = presence.clientStatus?.web ?? presence.clientStatus?.desktop

    const customActivity = presence.activities.find(
        activity => activity.type === ActivityType.Custom
    );

    const activities = [];

    if (customActivity) {
        activities.push(
            {
                state: customActivity.state,
                emoji: customActivity.emoji ? {
                    name: customActivity.emoji.name,
                    id: customActivity.emoji.id,
                    animated: customActivity.emoji.animated
                } : null,
                createdAt: customActivity.createdTimestamp,
            }
        );
    }

    const data = {
        status: presence.status,
        clientStatus,
        activities,
    } satisfies z.infer<typeof presenseSchema>;
    
    return presenseSchema.parse(data);
}