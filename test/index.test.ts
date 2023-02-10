import { describe, expect, it } from 'vitest'
import { createClient } from '../src'

const url = ''
const token = ''

describe('should', () => {
  const client = createClient({ url, token })

  it('returns a version', async () => {
    const version = await client.server.version()
    expect(version.api).toBeDefined()
  })

  it('returns server information', async () => {
    const server = await client.server.server()
    expect(server.version).toBeDefined()
  })

  it('returns connection information', async () => {
    const connection = await client.connection.connection()
    expect(connection.current).toBeDefined()
  })

  /**
   * Seems like the response from the API does not actually indicate if the printer was connected.
   * So this test could probably be removed.
   */
  it('should connect to the printer', async () => {
    const connected = await client.connection.connect()
    expect(connected).toBeTruthy()
  })

  /**
   * Seems like the response from the API does not actually indicate if the printer was disconnected.
   * So this test could probably be removed.
   */
  it('should disconnect from the printer', async () => {
    const disconnected = await client.connection.disconnect()
    expect(disconnected).toBeTruthy()
  })
})
