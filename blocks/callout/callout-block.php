<?php
add_action('init', 'jsforwp_register_block_assets');

function jsforwp_register_block_assets() {

    wp_register_script(
        'jsforwp-callout-block',
        get_template_directory_uri() . '/blocks/callout/callout-block.js',
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
        filemtime( get_template_directory() . '/blocks/callout/callout-block.js' )
    );

    wp_register_style(
        'jsforwp-callout-block-styles',
        get_template_directory_uri() . '/blocks/callout/callout-block.css',
        [],
        filemtime( get_template_directory() . '/blocks/callout/callout-block.css' )
    );

    register_block_type( 'jsforwp/callout-block', array(
        'editor_script' => 'jsforwp-callout-block',
        'style' => 'jsforwp-callout-block-styles',
        'render_callback' => 'custom_block_render_cb',
        'attributes' => array(
            'content' => array(
                'type' => 'string',
            ),
            'secondtest' => array(
                'type' => 'string'
            )
        )
    ) );

}

function custom_block_render_cb($block_attributes, $content) {
    ob_start(); ?>
        <div style="background-color: red;">
            <?php echo $block_attributes['content'] ?>
            <?php echo $block_attributes['secondtest'] ?>
        </div>
    <?php
    return ob_get_clean();
}