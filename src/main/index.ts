/// <reference path="../common/Common.ts" />
const NAME = 'Template';

const electron: Electron.CommonElectron = Require( 'electron' );
const app: Electron.App = electron.app;

let MainWindow: Electron.BrowserWindow;

const ipc = electron.ipcMain;

//declare const electron: Electron.CommonElectron;

ipc.on( 'asynchronous-message', function( event, arg )
{
	event.sender.send( 'asynchronous-reply', arg );
});

ipc.on( 'synchronous-message', function( event, arg )
{
	event.returnValue = arg;
});

function IsOSX(){ return process.platform == 'darwin'; }

function CreateWindow ()
{
	MainWindow = new electron.BrowserWindow( { width: 800, height: 600 } );

	MainWindow.loadURL( 'file://' + __dirname + '/src/index.html' );

	InstallMenu();

	MainWindow.on( 'closed', function()
	{
		MainWindow = null;
		process.exit( 0 );
	});
}

app.on( 'ready', CreateWindow );

app.on( 'window-all-closed', function ()
{
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if ( IsOSX() ) {
		app.quit();
	}
});

app.on( 'activate', function ()
{
	if ( MainWindow === null )
	{
		CreateWindow();
	}
});

function Reload( item, focusedWindow )
{
	if ( focusedWindow )
	{
		focusedWindow.reload();
	}
}

function KeyFullScreen()
{
	if ( IsOSX() )
	{
		return 'Ctrl+Command+F';
	}
	return 'F11';
}

function ToggleFullScreen(item, focusedWindow)
{
	if( focusedWindow )
	{
		focusedWindow.setFullScreen( !focusedWindow.isFullScreen() );
	}
}

function KeyDevelop()
{
	if ( IsOSX() )
	{
		return 'Alt+Command+I';
	}
	return 'Ctrl+Shift+I';
}

function DevelopTools(item, focusedWindow)
{
	if ( focusedWindow )
	{
		focusedWindow.toggleDevTools();
	}
}

function Version()
{
	const ver: any = process;
	const options: Electron.ShowMessageBoxOptions =
	{
		type: 'info',
		buttons: [ 'OK' ],
		title: 'Version',
		message: NAME + ' ver:' + ver.env.npm_package_version,
		detail:
			NAME + ' ver:' + ver.env.npm_package_version + '\n' +
			'Electron ver:' + ver.versions.electron + '\n' +
			'Node.js ver:' + ver.versions.node + '\n' +
			'Chrome ver:' + ver.versions.chrome + '\n' +
			'V8 ver:' + ver.versions.v8
	};
	electron.dialog.showMessageBox( MainWindow, options, ( response ) =>
	{
	});
}

function About()
{
	require( 'electron' ).shell.openExternal( 'https://hirokimiyaoka.github.io/Pankt/' );
}

function InstallMenu()
{
	const template: Electron.MenuItemOptions[] = [];

	template.push( <Electron.MenuItemOptions>{
		label: 'System',
		submenu: [
			{ label: 'Reload', accelerator: 'CmdOrCtrl+R', click: Reload },
			{ label: 'Toggle Full Screen', accelerator: KeyFullScreen(), click: ToggleFullScreen},
			{ label: 'Toggle Developer Tools', accelerator: KeyDevelop(), click: DevelopTools },
		]
	});

	/*template.push( <Electron.MenuItemOptions>{
		label: 'Window',
		role: 'window',
		submenu: [
			{ label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
			{ label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
		]
	});*/

	template.push( <Electron.MenuItemOptions>{
		label: 'Help',
		role: 'help',
		submenu: [
			{ label: 'Version', click: Version },
			{ label: 'About', click: About },
		]
	});

	const menu = electron.Menu.buildFromTemplate( <Electron.MenuItemOptions[]>template );
	electron.Menu.setApplicationMenu( menu );
}
