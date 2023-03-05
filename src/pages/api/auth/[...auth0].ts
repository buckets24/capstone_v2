import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: 'https://stg-api', // or AUTH0_AUDIENCE
      scope: 'openid profile email read:listings' // or AUTH0_SCOPE
    }
  })
})
