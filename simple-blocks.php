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

	public static function create(array $args): void
	{
		$block = new Simple_Block($args);
		$block->init();
	}
}