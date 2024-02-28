function checkExtenstion(fileName, extentionArray) {
  const fileLength = fileName.length
  const fileDot = fileName.lastIndexOf('.')
  const fileType = fileName.substring(fileDot, fileLength).toLowerCase()

  return extentionArray.includes(fileType)
}

export { checkExtenstion }
