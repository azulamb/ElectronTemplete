'use strict';

var gulp = require( 'gulp' );
var typescript = require( 'gulp-typescript' );
var exec = require( 'child_process' ).execSync;
var fs = require( 'fs' );

var packageData = require( './package.json' );
var config = require( './config.js' )( packageData );

function createCommand( param, release )
{
	var cmd =
	[
		config.electron.packager,
		config.app,
		config.name,
		'--out=' + config.out[ release ? 'release' : 'debug' ],
		'--version=' + config.electron.version,
	];

	var keys = Object.keys( param );
	for ( var i = 0 ; i < keys.length ; ++i )
	{
		if ( param[ keys[ i ] ] === undefined )
		{
			cmd.push( '--' + keys[ i ] );
		} else
		{
			cmd.push( '--' + keys[ i ] + '=' + param[ keys[ i ] ] );
		}
	}

	if ( release )
	{
		cmd.push( '--asar' );
	}

	return cmd;
}

// Compile main. TypeScript => JavaScript.
gulp.task( 'main', function()
{
	return gulp
		.src( config.src.main )
		.pipe( typescript( config.typescript.main ) )
		.js
		.pipe( gulp.dest( config.app ) );
});

// Compile render. TypeScript => JavaScript.
gulp.task( 'render', function()
{
	return gulp
		.src( config.src.render )
		.pipe( typescript( config.typescript.render ) )
		.js
		.pipe( gulp.dest( config.app ) );
});

// Build app.
gulp.task( 'build', [ 'main', 'render' ], function()
{
	// Create package.json used by Elenctron.
	var data =
	{
		name: packageData.name,
		version: packageData.version,
		description: packageData.description,
		main: packageData.main,
		author: packageData.author,
		license: packageData.license,
		dependencies: packageData.dependencies,
	};
	fs.writeFileSync( config.app + '/package.json', JSON.stringify( data ) );
	return gulp
		.src( config.src.html + '/*'  )
		.pipe( gulp.dest( config.app + '/src/' ) );
});

// Debug Build app.
gulp.task( 'debug', [ 'build' ], function()
{
	var cmd;
	for ( var i = 0 ; i < config.electron.params.length ; ++i )
	{
		cmd = createCommand( config.electron.params[ i ] ).join( ' ' );
		console.log( cmd );
		exec( cmd );
	}
});

// Release Build app.
gulp.task( 'release', [ 'build' ], function()
{
	var cmd;
	for ( var i = 0 ; i < config.electron.params.length ; ++i )
	{
		cmd = createCommand( config.electron.params[ i ], true ).join( ' ' );
		console.log( cmd );
		exec( cmd );
	}
});

gulp.task( 'default', [ 'build' ] );
