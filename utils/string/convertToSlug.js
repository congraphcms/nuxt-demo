const convertToSlug = text =>
  text
    ? text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    : null

export default convertToSlug
