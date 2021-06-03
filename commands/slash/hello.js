import SlashCommand from '../../structures/SlashCommand'

class Hello extends SlashCommand {
  constructor () {
    super('hello', {
      name: 'hello',
      description: 'A demo slash command',
      scope: 'guild'
    })
  }

  exec (interaction) {
    return interaction.reply('Hello! :wave:')
  }
}

export default Hello
