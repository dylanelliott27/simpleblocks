<?php
/*
Plugin Name: Simple Blocks

Description: Easy GB Blocks
*/

require WP_PLUGIN_DIR . '/simpleblocks/classes/simple-block.php';
require WP_PLUGIN_DIR . '/simpleblocks/classes/simple-block-template-abstract.php';

class Simple_Blocks
{

	public static function load_blocks(): void
	{
		$block_dir = get_template_directory() . '/blocks';

		foreach( scandir($block_dir) as $block_file_name ) {
			if( $block_file_name === '.' || $block_file_name === '..' ) {
				continue;
			}

			include $block_dir . '/' . $block_file_name;
			$class_list = get_declared_classes();
			$block_class_name = end($class_list);

			$block = new $block_class_name;

			$block_attrs = $block->get_attributes();

			if( !empty($block->missing_attributes()) ) {
				error_log($block_file_name . ' is missing one or more attributes: ' . print_r($block->missing_attributes, true));
				continue;
			}

			$simple_block_instance = new Simple_Block($block_attrs);
			$simple_block_instance->init();
		}
	}
}