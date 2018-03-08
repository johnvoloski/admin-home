import moment from 'moment'

const TODAY = moment()
const YESTERDAY = TODAY.clone()
  .subtract(1, 'days')
  .startOf('day')

export const isParentWindowTopbarLocale = () =>
  parent.window &&
  parent.window.vtex &&
  parent.window.vtex.topbar &&
  parent.window.vtex.topbar.service &&
  parent.window.vtex.topbar.service.Locale

export const isParentWindowRuntimeLocale = () =>
  parent.window.__RUNTIME__ &&
  parent.window.__RUNTIME__.culture &&
  parent.window.__RUNTIME__.culture.locale

export const getLocale = () => {
  if (isParentWindowTopbarLocale()) {
    return parent.window.vtex.topbar.service.Locale.getLocale()
  } else if (isParentWindowRuntimeLocale()) {
    return parent.window.__RUNTIME__.culture.locale
  }

  return navigator.language
}

export const setToSeconds = value => parseFloat((value / 1000).toFixed(1))

export const valueToFloor = value => Math.floor(value)

export const isYesterday = date => date.isSame(YESTERDAY, 'd')
