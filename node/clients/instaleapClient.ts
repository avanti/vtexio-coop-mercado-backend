import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Instaleap extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://channels.instaleap.io',
      context,
      {
        ...options,
        headers: {
          VtexIdClientAutCookie:
            context.adminUserAuthToken ??
            context.storeUserAuthToken ??
            context.authToken,
        }
      }
    )
  }

  public async getJobId(body: GetJobIdBody): Promise<any> {
    return this.http.post('/translate_client_reference_to_jobid', body)
  }
}
