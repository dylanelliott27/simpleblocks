# simpleblocks
**- Under development -**

Create Gutenberg Blocks with dynamic fields without touching any JS.

**How to use:**

1. Create a "blocks" directory within your theme's root directory.
2. Create a PHP file which will house all of the attributes and settings for your block, this can be named anything.
3. Within each PHP file, declare a class which extends Simple_Block_Template. You must implement get_attributes() and get_block_markup() in your class.
4. get_attributes() should return an array with the following key-value pairs:

**block_name** = Slug of the block

**block_title** = Name of the block

**fields** = array containing key-value pairs of $label => $type, view available types below

**render_callback** = reference to get_block_markup()


An example of a class extending Simple_Block_Template:

    class Good_Block extends Simple_Block_Template {

      public function get_attributes(): array {
        $attrs = [
          'block_name'      => 'good-block',
          'block_title'     => 'Good Block',
          'fields'          => [
            'good-label-1' => 'string',
            'good-label-2' => 'string'
          ],
          'render_callback' => [ $this, 'get_block_markup' ]
        ];

        return $attrs;
      }

      public function get_block_markup( $block_attributes, $content ): string {
        ob_start();

        ?>
            <section style="background-color: red; height: 200px; width: 100%;">
                <h2>Test field one: <?php echo $block_attributes['good-label-1'] ?> </h2>
                <h2>Test field one: <?php echo $block_attributes['good-label-2'] ?> </h2>

            </section>
        <?php

        return ob_get_clean();

      }

    }
