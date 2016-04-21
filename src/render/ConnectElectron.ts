/// <reference path="../common/Common.ts" />

const electron: Electron.CommonElectron = Require( 'electron' );
const ipc = Require('ipc');

class ConnectElectron
{
	constructor()
	{
		this.init();
	}

	private init(): boolean
	{
		if ( !ipc ){ return false; }

		ipc.on( 'asynchronous-reply', ( response ) =>
		{
			console.log("asynchronousMessage response : " + response);
		});
	}

	public send( val: ProcessMessage, sync: boolean = true ): any
	{
		if ( !ipc ){ return undefined; }
		if ( !sync ){
			return ipc.sendSync( 'synchronous-message', val );
		}
		return ipc.send( 'asynchronous-message', val );
	}
}
