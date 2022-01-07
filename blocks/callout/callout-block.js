wp.blocks.registerBlockType( 'jsforwp/callout-block', {

    title: 'Callout Block',

    icon: 'megaphone',

    category: 'common',

    attributes: {
        content: {
            type: 'string'
        },
        secondtest: {
            type: 'string'
        }
    },

    edit: function( props ) {
        console.log(wp.components);
        return wp.element.createElement(
            wp.element.Fragment,
            null,
            wp.element.createElement(
                wp.editor.InspectorControls,
                null,
                wp.element.createElement(

                    wp.components.TextareaControl, {
                        label : "testinput",
                        onChange: (val) => {
                            props.setAttributes({content : val})
                        },
                        value: props.attributes.content
                    },

                ),
                wp.element.createElement(
                    wp.components.TextareaControl, {
                        label : "secondtest",
                        onChange: (val) => {
                            props.setAttributes({secondtest : val})
                        },
                        value: props.attributes.secondtest
                    }
                )
            ),
            wp.element.createElement(
                wp.components.ServerSideRender, {
                    block: "jsforwp/callout-block",
                    attributes: props.attributes
                }
            ),
        );
    },

    save: () => null/*function( props ) {
        return wp.element.createElement( wp.editor.RichText.Content, {
            tagName: 'h2',
            value: props.attributes.content,
            style: {
                backgroundColor: props.attributes.backgroundColor,
                color: props.attributes.textColor
            },
        } );
    } */
} );