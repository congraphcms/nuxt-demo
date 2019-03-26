
const messages = {
  _default: (field) => `Vrednost polja ${field} nije validna.`
}

const attributes = {
  fname: 'ime',
  lname: 'prezime',
  msg: 'poruka'
}

export default {
  name: 'sr_RS',
  messages,
  attributes
}
