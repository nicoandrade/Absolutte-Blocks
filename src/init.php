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
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function absolutte_blocks_cgb_block_assets() {
    // Styles.
    wp_enqueue_style(
        'absolutte_blocks-cgb-style-css', // Handle.
        plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
        array( 'wp-editor' ) // Dependency to include the CSS after it.
        // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: filemtime — Gets file modification time.
    );
} // End function absolutte_blocks_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'absolutte_blocks_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function absolutte_blocks_cgb_editor_assets() {
    // Scripts.
    wp_enqueue_script(
        'absolutte_blocks-cgb-block-js', // Handle.
        plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
        // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
        true// Enqueue the script in the footer.
    );
    $absolutte_blocks_custom_js = array(
        'admin_ajax'             => admin_url( 'admin-ajax.php' ),
        'template_directory_uri' => get_template_directory_uri(),
        'plugin_url'             => ABSOLUTE_BLOCKS_URL,
        'rest_api_url'           => esc_url_raw( get_rest_url() ),
    );
    wp_localize_script( 'absolutte_blocks-cgb-block-js', 'absolutte_blocks', $absolutte_blocks_custom_js );

    // Styles.
    wp_enqueue_style(
        'absolutte_blocks-cgb-block-editor-css', // Handle.
        plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
        array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
        // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
    );
} // End function absolutte_blocks_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'absolutte_blocks_cgb_editor_assets' );

/**
 * Regsitering Dynamics Blocks
 *
 *
 */
function absolutte_blocks_register_dynamic_blocks() {

    if ( function_exists( 'register_block_type' ) ) {

        register_block_type( 'absolutte-blocks/blog', array(
            'attributes'      => array(
                'title'  => array(
                    'type'     => 'array',
                    'source'   => 'children',
                    'selector' => 'h3',
                    'items'    => [
                        'type' => 'string',
                    ],
                ),
                'idAttr' => array(
                    'type' => 'string',
                ),
            ),
            'render_callback' => 'absolutte_blocks_dynamic_blog',
        ) );

    }

}

add_action( 'init', 'absolutte_blocks_register_dynamic_blocks' );

/**
 * Dynamic Blog
 *
 */

function absolutte_blocks_dynamic_blog( $attributes, $content ) {

    $title = '';
    if ( isset( $attributes['title'] ) ) {
        $title = $attributes['title'][0];
    }
    $idAttr = '';
    if ( isset( $attributes['idAttr'] ) ) {
        $idAttr = esc_attr( $attributes['idAttr'] );
    }

    $second_post_html = '';

    $args = array(
        'posts_per_page' => 4,
    );
    $the_query = new WP_Query( $args );
    if ( $the_query->have_posts() ) {
        while ( $the_query->have_posts() ) {$the_query->the_post();
            if ( $the_query->current_post == 0 ) {
                $main_post_html = sprintf(
                    '<div class="absolutte-blog-post absolutte-blog-post-big absolutte-track" data-animation="fadeInUp">
						<div class="absolutte-blog-post-image" style="background-image: url(%4$s);"><a href="%1$s"></a></div>
						<div class="absolutte-blog-post-content">
							<h4 class="absolutte-blog-post-title"><a href="%1$s">%2$s</a></h4>
							<div class="absolutte-blog-post-date"><a href="%1$s">%3$s</a></div>
						</div>
					</div>',
                    esc_url( get_the_permalink() ),
                    esc_html( get_the_title() ),
                    esc_html( get_the_date() ),
                    "'" . esc_url( get_the_post_thumbnail_url( get_the_ID(), 'large' ) ) . "'"
                );
            } else {
                $second_post_html .= sprintf(
                    '<div class="absolutte-blog-post absolutte-track" data-animation="fadeInUp">
						<div class="absolutte-blog-post-image" style="background-image: url(%4$s);"><a href="%1$s"></a></div>
						<div class="absolutte-blog-post-content">
							<h4 class="absolutte-blog-post-title"><a href="%1$s">%2$s</a></h4>
							<div class="absolutte-blog-post-date"><a href="%1$s">%3$s</a></div>
						</div>
					</div>',
                    esc_url( get_the_permalink() ),
                    esc_html( get_the_title() ),
                    esc_html( get_the_date() ),
                    "'" . esc_url( get_the_post_thumbnail_url( get_the_ID(), 'large' ) ) . "'"
                );
            }

        } //while

    } else { // if have posts
        $testimonials_html = '<div class="absolutte-no-testimonials"><p>' . esc_html__( 'There are no testimonials to show', 'absolutte-blocks' ) . '</p><p><small>' . esc_html__( 'This block uses testimonials from Jetpack Plugin. You can enable testimonials on Jetpack > Settings > Custom content types', 'absolutte-blocks' ) . '<small></p></div>';
    }
    wp_reset_postdata();

    $response = '<div class="absolutte-section-blog absolutte-section" id="' . $idAttr . '">
	<div class="container">
		<div class="row">
            <div class="col-12">
                <h3 class="absolutte-blog-title absolutte-section-title-small"><a href="%1$s">%2$s</a></h3>
            </div>
		</div>

		<div class="row">
			<div class="col-12 col-sm-6">
				%3$s
			</div>
			<div class="col-12 col-sm-6">
				%4$s
			</div>
		</div>
	</div>
	</div>';

    return sprintf(
        $response,
        esc_url( get_permalink( get_option( 'page_for_posts' ) ) ),
        wp_kses_post( $title ),
        $main_post_html,
        $second_post_html
    );

}
