<?php
/**
 * Plugin Name: Gutember Custom Blocks
 * Description: Custom Gutember Blocks
 * Author: Juan Incaurgarat
 * Author URI: https://kilinkis.me/
 * Version: 1.0.0
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
