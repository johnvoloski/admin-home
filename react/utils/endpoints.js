export const smartlinkBaseUrl = 'https://smartlink.vtex.com/api/pub/vtexadmin/'
export const helpCenterBaseUrl = '//help.vtex.com/'

export const integrationsBridgeTest = account =>
  `${smartlinkBaseUrl}home/metrics/activebridgeintegration/${account}`

export const feedCrmFetchUrl = account =>
  `//${
    account
  }.vtexcommercestable.com.br/api/ds/pub/documents/BC?f=Titulo%2CDescricao%2CLink&an=vtexcrm&fq=Status%3AAprovado&pgsize=4&pgnum=1&order=createdIn+desc`

export const pageload = (account, path = 'home', days = 7) =>
  `${smartlinkBaseUrl}home/metrics/pageload/${path}/${days}/${account}`
