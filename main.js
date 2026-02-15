const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 700,
        title: 'Truhlářský Editor',
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('index.html');

    // Custom menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'Soubor',
            submenu: [
                {
                    label: 'Nové okno',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => createWindow()
                },
                { type: 'separator' },
                {
                    label: 'Zavřít',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                },
                {
                    label: 'Ukončit',
                    accelerator: 'CmdOrCtrl+Q',
                    role: 'quit'
                }
            ]
        },
        {
            label: 'Zobrazení',
            submenu: [
                { label: 'Přiblížit', role: 'zoomIn' },
                { label: 'Oddálit', role: 'zoomOut' },
                { label: 'Skutečná velikost', role: 'resetZoom' },
                { type: 'separator' },
                { label: 'Celá obrazovka', role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Nápověda',
            submenu: [
                {
                    label: 'Vývojářské nástroje',
                    accelerator: 'F12',
                    click: (_, window) => {
                        if (window) window.webContents.toggleDevTools();
                    }
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
