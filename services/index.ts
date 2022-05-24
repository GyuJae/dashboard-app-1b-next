export const getDailyApi = async () => {
  const data = await fetch('https://wanted-madup.herokuapp.com/daily').then((res) => res.json())
  return data
}
