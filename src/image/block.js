/**
 * BLOCK: blog-image
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { 
	InspectorControls,
	RichText,
	MediaUpload,
} = wp.blockEditor;

const {
	TextControl,
	SelectControl,
} = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-blog-image", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Blog image"), // Block title.
	icon: "format-image", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "my-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("create-guten-block")],

	attributes: {
    bodyContent: {
        source: 'html',
        selector: '.copy-bd'
		},
		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/500'
		},
		textField: {
			type: 'string',
			default: 'kilinkis'
		},
		size: {
			type: 'string',
			default: 'original'
		},
	},

	// supports: { // Hey WP, I want to use your alignment toolbar!
	// 	align: true,
	// },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: props => {
		//console.log(props);

		const { className, setAttributes } = props;
		const { attributes } = props;
		let size = props.attributes.size;

		function selectImage(value) {
			setAttributes({
					imgUrl: value.sizes.full.url,
			})
		}

		return [
			<InspectorControls>
				<div>
					<SelectControl
						label="Size"
						value={size}
						options={ [
								{ label: 'Inline', value: 'inline' },
								{ label: 'Smallest', value: 'smallest' },
								{ label: 'Smaller', value: 'smaller' },
								{ label: 'Large', value: 'large' },
								{ label: 'Wide', value: 'wide' },
								{ label: 'Full', value: 'full' },
								{ label: 'Original', value: 'original' },
						] }
						onChange={ ( size ) => {  setAttributes({ size }); } }
					/>
				</div>
			</InspectorControls>,
			<div className={`air-image air-image--${size}`}>
				<MediaUpload 
						onSelect={selectImage}
						render={ ({open}) => {
							return (
								<button onClick={open}>
									<img 
										src={attributes.imgUrl}
										/>
								</button>
							);
						}}
					/>
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: props => {
		const { attributes } = props;
		const size = props.attributes.size;

		return (
				<div className={`air-image air-image--${size}`}>
						<img src={attributes.imgUrl} />
				</div>
		);
	}
});
