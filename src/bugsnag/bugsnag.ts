import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'
import React from 'react'

let bugsnagClient: any

export default function initBugsnag() {
  if (!bugsnagClient) {
    bugsnagClient = bugsnag({
      apiKey: '53ba0f9a8bba328258d4d7c8a14f8e52',
      beforeSend(report: any) {
        // Disable reporting of errors in dev env
        if (
          !process.env.REACT_APP_ENV ||
          (process.env.REACT_APP_ENV !== 'PROD' && process.env.REACT_APP_ENV !== 'ACC')
        ) {
          report.ignore()
        }
      },
    })
    bugsnagClient.use(bugsnagReact, React)
  }
  return
}

export function getBugsnagClient() {
  return bugsnagClient
}
