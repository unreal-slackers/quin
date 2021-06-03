import { AkairoError, AkairoModule } from 'discord-akairo'

class SlashCommand extends AkairoModule {
  constructor (id, options = {}) {
    super(id, options)

    const {
      name = '',
      description = '',
      scope = 'guild',
      permissions = [],
      args = []
    } = options

    this.name = name
    this.description = description
    this.scope = scope
    this.permissions = permissions
    this.args = args
  }

  // Executes the commandf
  exec () {
    throw new AkairoError('not implemented!')
  }
}

export default SlashCommand
