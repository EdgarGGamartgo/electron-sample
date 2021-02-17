console.log('main process working')
console.log('From main.js')
const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win 

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600, webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }, icon: __dirname + '/shops.png' })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))

    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
}

// For Windows
app.on('ready', createWindow)

// For MACOS

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(win === null) {
        createWindow()
    }
})
