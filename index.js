const { load } = require('cheerio')
const fetch = require('node-fetch')

exports.last = async (time = 'hour') => {
  switch (time) {
    case 'hour': time = '1h'; break
    case 'day': time = '1d'; break
    case 'week': time = '1w'; break
    case 'month': time = '1m'; break
    default: throw new TypeError(
      'Expected a string, like `hour, day, week, month`'
    )
  }

  const url = `http://www.nic.cl/registry/Ultimos.do?t=${time}`
  const request = await fetch(url)
  const $ = load(await request.text())

  return $('.tablabusqueda td div a').map((i, a) => $(a).text()).get()
}

exports.search = async ({ q, filter = 'exacta', buscar = 'Buscar Dominio' }) => {
  const url = 'http://www.nic.cl/registry/BuscarDominio.do'
  const payload = { buscar, filtro: filter, patron: q }

  const body = Object.keys(payload).map(key => (
    `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
  )).join('&')
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  })
  const $ = load(await request.text())

  return $('.tablabusqueda td div a').map((i, a) => $(a).text()).get()
}

exports.whois = async domain => {
  const url = `http://www.nic.cl/registry/Whois.do?d=${domain}`
  const request = await fetch(url)
  const $ = load(await request.text())

  return $('.tablabusqueda td').map((i, e) => (
    $('div', e).eq(1).text().trim()
  )).get().filter(Boolean)
}
