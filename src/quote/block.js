/**
 * Simple dynamic block sample
 *
 * Creates a block that doesn't render the save side, because it's rendered on PHP
 */

import './style.scss';
import './editor.scss';

// Required components
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const {
	ServerSideRender,
	TextControl,
	PanelBody,
} = wp.components;

/**
 * Registers and creates block
 *
 * Compatible with Gutenberg 2.8
 *
 * @param Name Name of the block with a required name space
 * @param ObjectArgs Block configuration {
 *      title - Title, displayed in the editor
 *      icon - Icon, from WP icons
 *      category - Block category, where the block will be added in the editor
 *      attributes - Object with all binding elements between the view HTML and the functions
 *      edit function - Returns the markup for the editor interface.
 *      save function - Returns the markup that will be rendered on the site page
 * }
 *
 */
registerBlockType(
	"cgb/block-blog-quote", // Name of the block with a required name space
	{
		title: __("Blog quote"), // Title, displayed in the editor
		icon: "format-quote", // Icon, from WP icons
		category: "my-blocks", // Block category, where the block will be added in the editor

		/**
		 * Object with all binding elements between the view HTML and the functions
		 * It lets you bind data from DOM elements and storage attributes
		 */
		attributes: {
			author: {
				type: "string",
				default: "Johannes Gutenberg",
			},
			cite: {
				type: "string",
				default: "It is a press, certainly, but a press from which shall flow in inexhaustible streams...Through it, God will spread His Word. A spring of truth shall flow from it: like a new star it shall scatter the darkness of ignorance, and cause a light heretofore unknown to shine amongst men",
			},
			bgUrl: {
				type: "string",
				default: "https://example.com/wp-content/uploads/2020/03/hero-min.jpg",
			},
		},

		/**
		 * edit function
		 *
		 * Makes the markup for the editor interface.
		 *
		 * @param object props Let's you bind markup and attributes as well as other controls
		 *
		 * @return JSX ECMAScript Markup for the editor
		 */
		edit: function ({ attributes, setAttributes, className, isSelected }) {
			const { bgUrl, cite, author } = attributes;


			console.log("atts edit");
			console.log(attributes);

			return (
				<React.Fragment>
					<InspectorControls>
						<PanelBody title={__("Archives Settings")}>
							<TextControl
								label="Author"
								value={author}
								onChange={(author) => setAttributes({ author })}
							/>
							<TextControl
								label="Cite"
								value={cite}
								onChange={(cite) => setAttributes({ cite })}
							/>
							<TextControl
								label="Background url"
								value={bgUrl}
								onChange={(bgUrl) => setAttributes({ bgUrl })}
							/>
						</PanelBody>
					</InspectorControls>
					<div>
						<ServerSideRender
							block="cgb/block-blog-quote"
							attributes={attributes}
						/>
					</div>
				</React.Fragment>
			);
		},

		save(props) {
			return null; // See PHP side. This block is rendered on PHP.
		},
	}
);
