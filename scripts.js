;(function main() {
  /* ----------------------------- CONFIG ----------------------------- */
  const apiUrl = 'https://www.bitstamp.net/api/ticker/'
  const updateFrequencyInMs = 30000 // exchange rate updated every 30s
  /* ------------------------------------------------------------------ */

  let rate = {
    current: 0,
  }

  const getRate = () => {
    fetch(apiUrl, { method: 'POST' })
      .then(response => response.json())
      .then(json => {
        rate.current = json.last
        displayRate(rate.current)
      })
      .catch(error => console.error(error))
  }

  getRate()
  document.body.classList.add('spinner')
  let overlayAlreadyRemoved = false

  setInterval(() => {
    getRate()
  }, updateFrequencyInMs)

  const displayRate = currentRate => {
    document.querySelector('.rate').textContent = currentRate
    removeOverlay()
    overlayAlreadyRemoved = true
  }

  const removeOverlay = () => {
    if (!overlayAlreadyRemoved) {
      document.querySelector('#overlay').remove()
      document.body.classList.remove('spinner')
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(() => console.log('Service Worker Registered'))
  }
})()
