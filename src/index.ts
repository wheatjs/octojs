import { ofetch } from 'ofetch'
import { createConnectionRepository, createServerRepository } from './repositories'

export interface ClientOptions {
  /**
   * The URL of the OctoPrint server
   */
  url: string

  /**
   * The API key of the OctoPrint server
   */
  token: string
}

export function createClient(options: ClientOptions) {
  const { token, url } = options

  const http = ofetch.create({
    baseUrl: url,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': token,
    },
    onRequest({ request, options }) {
      options.baseURL = url
      options.headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': token,
      }
    },
  })

  return {
    server: createServerRepository({ http }),
    connection: createConnectionRepository({ http }),
  }
}
