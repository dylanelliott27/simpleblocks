<?php
class Simple_Block
{

	private string $block_name = '';
	private string $block_title = '';
	private ?string $block_styles_path = '';
	private string $block_editor_js = '';
	private string $block_prefixed_name = '';
	private array $fields = [];
	private $render_callback;

	public function __construct(array $args)
	{
		$this->block_name = $args['block_name'];
		$this->block_title = $args['block_title'];
		$this->fields = $args['fields'];
		//$this->block_styles_path = array_key_exists('block_styles_path', $args) ? $args['block_styles_path'] : null;
		$this->block_prefixed_name = 'simpleblock/' . $this->block_name;
		$this->render_callback = $args['render_callback'];
	}

	public function init()
	{

		$this->build_component_tree();
		$this->register_simple_block();

		add_action('enqueue_block_editor_assets', [$this, 'load_all']);

		add_action('init', [$this, 'maybe_enqueue_block_stylesheet']);
	}

	public function load_all() {
		wp_enqueue_script(
			'block-configs.js',
			plugin_dir_url( dirname(__FILE__) ) . '/blocks/block-configs.js',
			['wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor'],
			filemtime(WP_PLUGIN_DIR . '/simpleblocks/blocks/block-configs.js')
		);

		wp_add_inline_script('block-configs.js', "blockAttrLibrary['{$this->block_prefixed_name}'] = " . $this->block_editor_js);

		wp_register_script(
			'simple_blocks_js_template',
			plugin_dir_url( dirname(__FILE__) ) . '/blocks/block-script-template.js',
			[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ],
			filemtime(WP_PLUGIN_DIR . '/simpleblocks/blocks/block-script-template.js')
		);
	}

	public function build_component_tree()
	{
		$base_tree = [
			'state' => (object)[],
			'component' => 'wp.element.Fragment',
			'attributes' => null,
			'children' => [
				(object)[
					'component' => 'wp.components.ServerSideRender',
					'attributes' => [
						'block' => $this->block_prefixed_name,
						'attributes' => null
					]
				],
				(object)[
					'component' => 'wp.editor.InspectorControls',
					'attributes' => null,
					'children' => []
				]
			]
		];

		$component_map = [
			'string' => 'wp.components.TextareaControl',
			'image' => 'wp.editor.MediaUpload'
		];

		$injection_location = &$base_tree['children'][1]->children;

		foreach( $this->fields as $label => $field_type ) {
			array_push($injection_location, (object)[
				'component' => $component_map[$field_type],
				'attributes' => [
					'label' => $label
				]
			]);
		}

		/*$r = [
			'component' => 'wp.element.Fragment',
			'attributes' => null,
			'children' => [
				(object)[
					'component' => 'wp.components.ServerSideRender',
					'attributes' => [
						'block' => "simpleblock/better-block",
						'attributes' => 'props.attributes'
					]
				],
				(object)[
					'component' => 'wp.editor.InspectorControls',
					'attributes' => null,
					'children' => [
						(object)[
							'component' => 'wp.components.TextareaControl',
							'attributes' => [
								'label' => 'test1',
							]
						],
						(object)[
							'component' => 'wp.components.TextareaControl',
							'attributes' => [
								'label' => 'test2',
							]
						],
						(object)[
							'component' => 'wp.editor.MediaUpload',
							'attributes' => [
								'onSelect' => null,
								'type' => 'image',
								'render' => null
							]
						]
					]
				]
			]
		]; */

		$this->block_editor_js = json_encode($base_tree);
	}

	public function maybe_enqueue_block_stylesheet()
	{
		if (!$this->block_styles_path) {
			return;
		}

		wp_register_style(
			$this->block_name . '-styles',
			$this->block_styles_path,
			[],
			filemtime($this->block_styles_path)
		);
	}

	public function register_simple_block()
	{
		$attrs = [];
		foreach($this->fields as $slug => $field) {
			$attrs[$slug] = [
				'type' => $field
			];
		}


		register_block_type($this->block_prefixed_name, array(
			'editor_script' => 'simple_blocks_js_template',
			'style' => null,
			'render_callback' => $this->render_callback,
			'attributes' => $attrs
		));

	}

}