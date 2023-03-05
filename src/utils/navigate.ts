import Router from 'next/router'

export const navigate = (url: string | Record<string, string>) => {
  return Router?.push(url)
}
