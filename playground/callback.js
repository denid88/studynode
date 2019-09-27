setTimeout(() => {
  console.log('2 seconds')
}, 2000)

const names = ['Andrew', 'Jas', 'Den']
const shortName = names.filter((name) => {
  return name.length <= 4
})

const geocode = (address, callback) => {
  
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    }
    callback(data)
  }, 2000)
  
}

geocode('Philadelphia', (data) => {
  console.log(data)
})
