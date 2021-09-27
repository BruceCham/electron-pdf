const { app, BrowserWindow, Menu } = require("electron");
const Update = require("./main/update");
const { template, findReopenMenuItem } = require('./main/menu');
global.Win = null;
function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    acceptFirstMouse: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    show: false,
    icon: './build/icons/pdf.ico',
    backgroundColor: "#f5f7fa",
  });
  // win.maximize()
  win.once("ready-to-show", function () {
    win.show();
    Update.check();
  });

  win.webContents.session.on('will-download', (event, item, webContents) => {
    item.once('done', (event, state) => {
      win.webContents.send('download-message', state);
    })
  })
  // 加载index.html文件
  win.loadFile("renderer/index.html");
  global.Win = win;
}

app.on("ready", createWindow);

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
  const menu = Menu.getApplicationMenu()
  let reopenMenuItem = findReopenMenuItem(menu)
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  const menu = Menu.getApplicationMenu()
  let reopenMenuItem = findReopenMenuItem(menu)
  if (reopenMenuItem) reopenMenuItem.enabled = true
})
