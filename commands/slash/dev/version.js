import SlashCommand from '../../../structures/SlashCommand'
import pkg from '../../../package.json'

class Version extends SlashCommand {
  constructor () {
    super('version', {
      name: 'version',
      description: 'Get the bot\'s version number.',
      scope: 'guild'
    })
  }

  exec (interaction) {
    return interaction.reply(pkg.version, { ephemeral: true })
  }
}

export default Version
