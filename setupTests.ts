import '@testing-library/jest-dom'

// TODO: do we need a custom renderer ?
// We don't have global providers right now

const fbScript = document.createElement('script')
fbScript.id = 'facebook-jssdk'

document.body.appendChild(fbScript)
