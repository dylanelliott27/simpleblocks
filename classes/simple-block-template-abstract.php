<?php

abstract class Simple_Block_Template {

	abstract function get_block_markup($block_attributes, $content) : string;

	abstract function get_attributes() : array;

	public function missing_attributes() : array {
		$required_keys = ['block_name', 'block_title', 'render_callback'];
		$invalid_keys = [];
		$attributes = $this->get_attributes();

		foreach( $required_keys as $required_key ) {
			if( ! array_key_exists($required_key, $attributes) ) {
				array_push($invalid_keys, $required_key);
			}
		}

		return $invalid_keys;
	}


}