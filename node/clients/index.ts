import { IOClients } from '@vtex/api'

import Status from './status'
import Instaleap from './instaleapClient'

export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  public get instaleapClient() {
    return this.getOrSet('instaleapClient', Instaleap)
  }
}
