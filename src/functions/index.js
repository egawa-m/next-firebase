const path = require('path')
const functions = require('firebase-functions')
const next = require('next')
const express = require('express')

var dev = process.env.NODE_ENV !== 'production'
var app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` }
})
var handle = app.getRequestHandler()

const server = express()

server.get('/favicon.ico', (req, res) => (
  res.status(200).sendFile('favicon.ico', {root: __dirname + '/static/'})
))

server.get('/p/:id', (req, res) => {
  const actualPage = '/post'
  const queryParams = { id: req.params.id }
  app.render(req, res, actualPage, queryParams)
})

server.get('*', (req, res) => {
  return handle(req, res)
})

exports.next = functions.https.onRequest(async (req, res) => {
  await app.prepare()
  return server(req, res)
})
