const loadImage = url => {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = () => {
      resolve(url)
    }
    img.onerror = () => {
      reject(url)
    }
    img.src = url
  })
}

const loadImages = urls => {
  let promises = []
  urls.forEach(url => {
    promises.push(loadImage(url))
  })
  return promises
}

export default loadImage
export { loadImage, loadImages }
