import type { ClientsConfig, ServiceContext, RecorderState, ParamsContext } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { getJobId } from './instaleap/apis'

const TIMEOUT_MS = 2000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>
  interface State extends RecorderState {
    code: number
  }
}

// Export a service that defines route handlers and client options.
export default new Service<Clients, State, ParamsContext>({
  clients,
  routes: {
    instaleapGetJobId: method({
      POST: [getJobId],
    }),
  }
})
