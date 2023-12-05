export const getDatePublication = async (secs) => {
  try {
    let t = new Date(1970, 0, 1) // Epoch
    t.setSeconds(secs)

    return t
  } catch (error) {
    console.log(error)
  }
}
