'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 640,
    width: 960,
    fullscreen: false
  })
  mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
