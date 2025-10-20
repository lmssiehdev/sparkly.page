import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { toDBUser } from '../helpers/conversions';

@ApplyOptions<Listener.Options>({
  event: Events.MessageCreate,
  name: 'message-create',
})
export class MessageCreateListener extends Listener {
  async run(message: Message) {
    // TODO: make this consent based
    try {
        console.log("called")
        if ( !message.guild || message.channel.isDMBased() ) return;
        const member = message.guild.members.cache.get(message.author.id);

        if ( !member ) return;
        console.log(member);


        const user = await toDBUser(member);
        console.log(user);

    } catch (error) {
      this.container.logger.error('message-create-event-failed', error);
    }
  }
}