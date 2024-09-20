const getJobId = async (context: Context) => {
  try {
    context.set('Cache-Control', 'no-cache')
    const sellerOrderId = context.vtex?.route?.params?.sellerOrderId as string
    const { instaleapClient } = context.clients

    if (!sellerOrderId) {
      context.status = 400
      context.body = {
        errorMessage: 'Need sellerOrderId'
      }
      return
    }

    const body:GetJobIdBody = {
      channel: "vtex",
      order_references: [sellerOrderId]
    }

    const result = await instaleapClient.getJobId(body)
    const jobId = result?.data?.jobIds?.[sellerOrderId]

    context.response.status = 200
    context.response.body = { jobId, } || { error: result?.data?.error || 'Error getJobId' }
  } catch (error) {
    console.log(error)
    context.status = 500
    context.body = {
      errorMessage: 'Request Error'
    }
  }
}

export { getJobId }
