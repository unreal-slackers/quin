import SlashCommand from '../../../structures/SlashCommand'
import ms from 'pretty-ms'

class Uptime extends SlashCommand {
  constructor () {
    super('uptime', {
      name: 'uptime',
      description: 'Check how long it\'s been since the last time the bot logged in.',
      scope: 'guild'
    })
  }

  async exec (interaction) {
    const uptime = await ms(this.client.uptime, { secondsDecimalDigits: 0 })
    return interaction.reply(`:stopwatch: Uptime: **${uptime}**`, { ephemeral: true })
  }
}

export default Uptime
