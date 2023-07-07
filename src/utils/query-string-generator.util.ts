interface Params {
  [key: string]: string | number
}

export function queryStringGeneratorUtil(params: Params): string {
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')

  return queryString
}
