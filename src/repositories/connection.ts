import type { ConnectCommandRequest } from '../__types'
import type { RepositoryOptions } from './__types'

export interface ConnectionRepositoryOptions extends RepositoryOptions {

}

export function createConnectionRepository(options: ConnectionRepositoryOptions) {
  const { http } = options

  const connection = () => http.native('/api/connection')
  const connect = (options: Omit<ConnectCommandRequest, 'command'> = {}) => http<boolean>('/api/connection', { method: 'POST', body: { ...options, command: 'connect' } })
    .then(() => true)
    .catch(() => false)

  const disconnect = () => http<boolean>('/api/connection', { method: 'POST', body: { command: 'disconnect' } })
    .then(() => true)
    .catch(() => false)

  const fakeAck = () => http<boolean>('/api/connection', { method: 'POST', body: { command: 'fake_ack' } })
    .then(() => true)
    .catch(() => false)

  return {
    connection,
    connect,
    disconnect,
    fakeAck,
  }
}
