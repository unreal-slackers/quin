import SlashCommand from '../../../structures/SlashCommand'

// Style 1
class Ping extends SlashCommand {
  constructor () {
    super('ping', {
      name: 'ping',
      description: 'Check the bot\'s response time.',
      scope: 'guild'
    })
  }

  async exec (interaction) {
    await interaction.reply(':ping_pong: Pong!')
    const message = await interaction.fetchReply()
    const difference = interaction.createdAt - message.createdAt
    return interaction.editReply(`:ping_pong: Pong! Response Time: **${difference}ms**`)
  }
}

export default Ping
