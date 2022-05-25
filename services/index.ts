export const getDailyApi = async () => {
  const data = await fetch('https://wanted-madup.herokuapp.com/daily').then((res) => res.json())
  return data
}

export const getADListApi = async () => {
  const data = await fetch('https://wanted-madup.herokuapp.com/advertise').then((res) => res.json())
  return data
}

export const getMediaApi = async () => {
  const data = await fetch('https://wanted-madup.herokuapp.com/media').then((res) => res.json())
  return data
}
