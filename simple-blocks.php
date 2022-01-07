<?php
/*
Plugin Name: Simple Blocks

Description: Easy GB Blocks
*/

require WP_PLUGIN_DIR . '/simpleblocks/classes/simple-block.php';

class Simple_Blocks
{
	public function __construct()
	{

	}

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

			$simple_block_instance = new Simple_Block($block_attrs);
			$simple_block_instance->init();
		}
	}
}