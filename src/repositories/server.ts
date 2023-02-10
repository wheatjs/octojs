import type { ServerGetResponse, VersionGetResponse } from '../__types'
import type { RepositoryOptions } from './__types'

export interface ServerRepositoryOptions extends RepositoryOptions {

}

export function createServerRepository(options: ServerRepositoryOptions) {
  const { http } = options

  const version = () => http<VersionGetResponse>('/api/version')
  const server = () => http<ServerGetResponse>('/api/server')

  return {
    version,
    server,
  }
}
