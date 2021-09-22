const { app, BrowserWindow } = require("electron");
const Update = require("./main/update");
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
    icon: './build/icons/win32.ico',
    backgroundColor: "#f5f7fa",
  });
  // win.maximize()
  win.once("ready-to-show", function () {
    win.show();
    Update.check();
  });
  // 加载index.html文件
  win.loadFile("renderer/index.html");
  global.Win = win;
}

app.on("ready", createWindow);
