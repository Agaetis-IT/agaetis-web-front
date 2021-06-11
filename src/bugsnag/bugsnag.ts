import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

export default function initBugsnag() {
  Bugsnag.start({
    apiKey: '53ba0f9a8bba328258d4d7c8a14f8e52',
    onError(_: any) {
      // Disable reporting of errors in dev env
      return !(
        !process.env.REACT_APP_ENV ||
        (process.env.REACT_APP_ENV !== 'PROD' && process.env.REACT_APP_ENV !== 'ACC')
      )
    },
    plugins: [new BugsnagPluginReact()]
  })
  return
}