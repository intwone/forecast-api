import { BeachRepository } from '@src/private-database/beach.repository'
import { UserRepository } from '@src/private-database/user.repository'

const DatabaseProvider = {
  BeachRepository,
  UserRepository,
}

const DatabaseProviders = Object.values(DatabaseProvider)

export { DatabaseProvider, DatabaseProviders }
