<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function blocks_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'blog_image-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'blog_image-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'blog_image-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'blog_image-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-blog-image', array(
			'attributes' => array(
				'content' => array(
						'type' => 'string',
				),
				'className' => array(
						'type' => 'string',
				),
			),
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'blog_image-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'blog_image-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'blog_image-cgb-block-editor-css',
			//'render_callback' => 'cgb_api_block_posts',
		)
	);

	register_block_type(
		'cgb/block-blog-quote', array(
			'attributes' => array(
				'author'    => array(
					'type'    => 'string',
					'default' => 'Johannes Gutenberg',
				),
				'cite'    => array(
					'type'    => 'string',
					'default' => 'It is a press, certainly, but a press from which shall flow in inexhaustible streams...Through it, God will spread His Word. A spring of truth shall flow from it: like a new star it shall scatter the darkness of ignorance, and cause a light heretofore unknown to shine amongst men',
				),
				'bgUrl'    => array(
					'type'    => 'string',
					'default' => '',
				),
			),
			'render_callback' => 'block_render_callback'
		)
	);
	
	function block_render_callback($attributes, $content) {
		return do_shortcode('[quote image="'.$attributes['bgUrl'].'" cite="'.$attributes['author'].'" ]'.$attributes['cite'].'[/quote] ');

	}

}

// Hook: Block assets.
add_action( 'init', 'blocks_assets' );

function block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'my-blocks',
				'title' => __( 'My Blocks', 'my-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'block_category', 10, 2);

function myguten_enqueue() {
  wp_enqueue_script(
      'myguten-script',
      plugins_url( 'myguten.js', __FILE__ ),
      array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ),
      filemtime( plugin_dir_path( __FILE__ ) . '/myguten.js' )
  );
}
add_action( 'enqueue_block_editor_assets', 'myguten_enqueue' );