'use strict';

module.exports = function( packageData )
{
	var data =
	{
		name: 'Template',
		src:
		{
			html: './src/html',
			main: [ './src/main/*.ts' ],
			render: [ './src/render/*.ts' ],
		},
		app: './app',
		out:
		{
			debug: './debug',
			release: './release',
		},
		typescript:
		{
			main:
			{
				target: 'ES6',
				sortOutput: true,
				removeComments: true,
				out: 'index.js',
				module: 'commonjs',
				moduleResolution: 'node',
			},
			render:
			{
				target: 'ES6',
				sortOutput: true,
				removeComments: true,
				out: 'src/app.js',
				module: 'commonjs',
				moduleResolution: 'node',
			},
		},
		electron:
		{
			version: "0.37.3",
			packager: 'electron-packager',
			params:
			[
				{ platform: 'win32', arch: 'x64', overwrite: undefined, }, // Win64 build
			],
			/*platforms:
			[
				'win32-ia32',
				//'win32-x64',
				//'linux',
				//'darwin'
			],
			platformResources:
			{
				win:
				{
					'version-string': packageData.version,
					'file-version': packageData.version,
					'product-version': packageData.version,
					'icon': 'icon.ico',
				},
				darwin:
				{
					CFBundleDisplayName: packageData.name,
					CFBundleIdentifier: packageData.name,
					CFBundleName: packageData.name,
					CFBundleVersion: packageData.version,
					icon: 'icon.icns',
				},
			},*/
		},
	};
	return data;
}
