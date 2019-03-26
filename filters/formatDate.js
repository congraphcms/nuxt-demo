/**
 *  Takes relative url and makes it
 *  absolute url to backend delivery File API
 *
 *  files/image.jpeg => https://api.backend.com/api/delivery/files/image.jpeg
 */
// @TODO move format to a config or .env
import { format } from 'date-fns'

function formatDate(date) {
  // @TODO make this configurable
  const defaultFormat = 'MMM Do YYYY'
  // return moment(date).format(format)
  return format(date, defaultFormat)
}


export default formatDate
