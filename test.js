import test from 'ava'
import cl from './index'

test('last domains', async t => {
  t.true(Array.isArray(await cl.last()))
  t.true(Array.isArray(await cl.last('hour')))
  t.true(Array.isArray(await cl.last('day')))
})

test('throws last domains', async t => {
  const error = await t.throws(cl.last('error'))
  t.is(error.message, 'Expected a string, like `hour, day, week, month`')
})

test('search', async t => {
  const domains = await cl.search({ q: 'nic.cl', filter: 'exacta' })
  t.deepEqual(domains, ['nic.cl'])
})

test('whois', async t => {
  const whois = await cl.whois('nic.cl')
  t.deepEqual(whois, [
    'UNIVERSIDAD DE CHILE',
    'NIC Chile',
    'Anterior a 1997-09-09',
    '2020-02-10 21:00:00 CLST',
    'a.nic.cl',
    'slave.sth.netnod.se',
    'b.nic.cl',
    'sns-pb.isc.org',
    'c.nic.cl'
  ])
})

test('deleted', async t => {
  t.true(Array.isArray(await cl.deleted()))
  t.true(Array.isArray(await cl.deleted('day')))
  t.true(Array.isArray(await cl.deleted('week')))
})

test('throws deleted', async t => {
  const error = await t.throws(cl.deleted('error'))
  t.is(error.message, 'Expected a string, like `day or week`')
})
