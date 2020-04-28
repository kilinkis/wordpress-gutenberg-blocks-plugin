/**
 * this block modifies the default one, that's why the structure of this file is different than other blocks
 */

import './style.scss';
import './editor.scss';

const { addFilter } = wp.hooks;

/**
 * When this function gets run by the addfilter
 * hook below, the filter passes it the block settings
 * or config file. 
 */
const filterBlocks = (settings) => {

	if (settings.name !== 'core/table') {
		// we need to pass along the settings object
		// even if we haven't modified them!
		return settings
	}

	//removeStyles(settings, ['stripes']);

	const newSettings = {
		...settings,
		edit(props) {
				return (
					<div className='air-table'>
						{settings.edit(props)}
					</div>
				)

		},
		save(props) {
				return (
					<div className='air-table'>
						{settings.save(props)}
					</div>
				)
		}
	}

  return newSettings; 
}

addFilter(
    'blocks.registerBlockType', // hook name, very important!
    'example/filter-blocks', // your name, very arbitrary!
    filterBlocks // function to run
)
