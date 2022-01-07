wp.blocks.registerBlockType('simpleblock/better-block', {

    title: 'better block',

    icon: 'megaphone',

    category: 'common',

    attributes: {
        test1 : {
            type: 'string'
        },
        test2 : {
            type: 'string'
        }
    },

    edit: function(props) {
        return renderer(testData)
    } /*function (props) {
        return wp.element.createElement(
            wp.element.Fragment,
            null,
            wp.element.createElement(
                wp.editor.InspectorControls,
                null,

                wp.element.createElement(
                    wp.components.TextareaControl, {
                        label: 'test1',
                        onChange: (val) => {
                            props.setAttributes({test1: val})
                        },
                        value: props.attributes.test1
                    },
                ),

                wp.element.createElement(
                    wp.components.TextareaControl, {
                        label: 'test2',
                        onChange: (val) => {
                            props.setAttributes({test2: val})
                        },
                        value: props.attributes.test2
                    },
                )


            ),

            wp.element.createElement(
                wp.components.ServerSideRender, {
                    block: "simpleblock/second-test-block",
                    attributes: props.attributes
                }
            ),
        );
    }*/,
    save: () => null
});