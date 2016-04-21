/// <reference path="../../typings/main.d.ts" />

const Require = typeof require !== 'undefined' ? require : function( package: string ): any{ return undefined; }

enum MessageType{
	other,
}

class ProcessMessage
{
	public type: MessageType;
	public value: any;
	public static create( type: MessageType, value: any ): ProcessMessage
	{
		const msg = new ProcessMessage();
		msg.type = type;
		msg.value = value;
		return msg;
	}
}
