<?php
/**
 * Plugin Name: Absolutte Blocks
 * Plugin URI: https://www.quemalabs.com/plugin/absolutte-blocks/
 * Description: Free Gutenberg blocks for Absolutte WordPress theme
 * Author: Quema Labs
 * Author URI: https://www.quemalabs.com/
 * Version: 1.0.0
 * Text Domain: absolutte-blocks
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /languages
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'ABSOLUTE_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Add plugin action links.
 *
 * Add a link to the settings page on the plugins.php page.
 *
 * @since 1.0.0
 *
 * @param  array  $links List of existing plugin action links.
 * @return array         List of modified plugin action links.
 */
function absolutte_blocks_action_links( $links ) {
    $links = array_merge( array(
        '<a href="' . esc_url( 'https://www.quemalabs.com/plugin/absolutte-blocks/' ) . '" target="_blank">' . esc_html__( 'About', 'absolutte-blocks' ) . '</a>',
        '<a href="' . esc_url( 'https://www.quemalabs.com/plugin/absolutte-blocks-pro/' ) . '" target="_blank" style="color: #39b54a; font-weight: bold">' . esc_html__( 'PRO Version', 'absolutte-blocks' ) . '</a>',
    ), $links );
    return $links;
}
add_action( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'absolutte_blocks_action_links' );
