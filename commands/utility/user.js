import { Command } from 'discord-akairo'
import { DateTime } from 'luxon'
import config from '../../quin.config.js'

class UserInfoCommand extends Command {
  constructor () {
    super('user', {
      aliases: ['user'],
      category: 'Utility',
      description: {
        content: 'Get information about a user.',
        usage: '!user [@username or ID]'
      },
      channelRestriction: 'guild',
      userPermissions: ['SEND_MESSAGES']
    })
  }

  * args () {
    const member = yield {
      type: 'member',
      default: message => message.member,
      prompt: {
        start: 'Which user do you want to look up?',
        retry: 'Please enter a valid username or ID.',
        optional: true
      }
    }

    return { member }
  }

  async exec (message, { member }) {
    const discordJoinDate = DateTime.fromISO(member.user.createdAt.toISOString())

    const guildJoinDate = DateTime.fromISO(member.joinedAt.toISOString())

    const lastMessageDate = DateTime.fromISO(member.lastMessage.createdAt.toISOString())

    const status = {
      online: ':green_circle: Online',
      idle: ':orange_circle: Idle',
      dnd: ':red_circle: Do Not Disturb',
      offline: ':black_circle: Offline'
    }

    const embed = this.client.util.embed()
      .setColor(config.embedColors.violet)
      .setThumbnail(member.user.displayAvatarURL())
      .setTitle(member.user.bot ? `${member.displayName} :robot:` : `${member.displayName}`)
      .setDescription(status[member.presence.status])
      .addField('Username', member.user.tag)
      .addField('ID', member.id)
      .addField('Joined Server', `${guildJoinDate.toLocaleString(DateTime.DATE_SHORT)} ${guildJoinDate.toLocaleString(DateTime.TIME_SIMPLE)} ${guildJoinDate.offsetNameShort}`)
      .addField('Joined Discord', `${discordJoinDate.toLocaleString(DateTime.DATE_SHORT)} ${discordJoinDate.toLocaleString(DateTime.TIME_SIMPLE)} ${discordJoinDate.offsetNameShort}`)
      .addField('Last Seen', `${lastMessageDate.toLocaleString(DateTime.DATE_SHORT)} ${lastMessageDate.toLocaleString(DateTime.TIME_SIMPLE)} ${lastMessageDate.offsetNameShort}`)

    return message.util.send({ embed })
  }
}

export default UserInfoCommand
