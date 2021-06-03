import { AkairoHandler } from 'discord-akairo'
import SlashCommand from './SlashCommand'

class SlashCommandHandler extends AkairoHandler {
  constructor (client, options = {}) {
    super(client, {
      directory: options.directory,
      classToHandle: SlashCommand
    })

    this.setup()
  }

  setup () {
    this.client.once('ready', async () => {
      // Register slash commands
      const data = this.modules.map(m => {
        return { name: m.name, description: m.description, options: m.args }
      })

      await this.client.guilds.cache.first().commands.set(data)
      this.client.log.success(`${data.length} slash commands registered`)
    })

    this.client.on('interaction', async i => {
      this.client.log.info('interaction received')
      this.handle(i)
    })
  }

  register (command, filepath) {
    super.register(command, filepath)
  }

  deregister (command) {
    super.deregister(command)
  }

  async handle (i) {
    try {
      if (!i.isCommand()) return

      const command = this.modules.get(i.commandName)
      await command.exec(i, command.args)
    } catch (e) {
      this.client.log.error(e)
    }
  }

  useListenerHandler (listenerHandler) {
    this.resolver.listenerHandler = listenerHandler
  }
}

export default SlashCommandHandler
