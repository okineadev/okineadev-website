/**
 * @typedef {import('svgo').Config} SVGOConfig
 * @typedef {import('svgo').PluginConfig} PluginConfig
 */

/**
 * SVGO configuration object.
 *
 * @type {SVGOConfig}
 */
module.exports = {
	multipass: true,
	precision: 2,
	plugins: /** @type {PluginConfig[]} */ ([
		{
			name: 'preset-default',
		},
		// {
    //   name: 'removeAttrs',
    //   params: { attrs: '(fill|stroke)' }
    // },
		'removeViewBox',
		'removeDimensions',
		'convertStyleToAttrs',
		'removeDimensions',
		'removeOffCanvasPaths',
		'removeScriptElement',
		'removeStyleElement',
		'reusePaths',
		'sortAttrs',
	]),
}
