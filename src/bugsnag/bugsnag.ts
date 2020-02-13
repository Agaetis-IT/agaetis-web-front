import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'
import React from 'react'

let bugsnagClient: any

export default function initBugsnag() {
  if (!bugsnagClient) {
    bugsnagClient = bugsnag('53ba0f9a8bba328258d4d7c8a14f8e52')
    bugsnagClient.use(bugsnagReact, React)
  }
  return
}

export function getBugsnagClient() {
  return bugsnagClient
}
