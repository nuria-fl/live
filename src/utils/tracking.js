const isProduction = process.env.NODE_ENV === 'production'

/**
 * @param  {string} category The name you supply for the group of objects you want to track.
 * @param  {string} action   A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
 * @param  {string|undefined} label    (Optional) An optional string to provide additional dimensions to the event data.
 * @param  {int|undefined} value    (Optional) An integer that you can use to provide numerical data about the user event.
 */
const trackEvent = function(
  category,
  action,
  label = undefined,
  value = undefined
) {
  if (isProduction && window.ga) {
    // window.gtag('event', action, {
    //   'event_category': category,
    //   'event_label': label,
    //   'value': value
    // })
  } else {
    // eslint-disable-next-line no-console
    console.info(`[TRACKER] send`, 'event', category, action, label, value)

    if (value !== undefined && isNaN(value)) {
      throw Error('If defined, event value must be an integer')
    }
  }
}

export default {
  trackEvent
}
