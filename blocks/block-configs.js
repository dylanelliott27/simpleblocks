// Global variables. blockAttrLibrary is filled in by script injected afterwards.
let blockAttrLibrary = {};
let blockCompMap = {
    'wp.element.Fragment': wp.element.Fragment,
    'wp.editor.InspectorControls' : wp.editor.InspectorControls,
    'wp.components.TextareaControl' : wp.components.TextareaControl,
    'wp.editor.MediaUpload' : wp.editor.MediaUpload,
    'wp.components.ServerSideRender' : wp.components.ServerSideRender
};


/*let blockAttrLibrary = {};
let componentState = {};

let BlockCompMap = {
    'wp.element.Fragment': wp.element.Fragment,
    'wp.editor.InspectorControls' : wp.editor.InspectorControls,
    'wp.components.TextareaControl' : wp.components.TextareaControl,
    'wp.editor.MediaUpload' : wp.editor.MediaUpload,
    'wp.components.ServerSideRender' : wp.components.ServerSideRender
};

function buildState(config, blockName) {
    if(config.component === 'wp.components.TextareaControl') {
        blockAttrLibrary[blockName].state[config.attributes.label] = {type: 'string'};
    }

    if(config.hasOwnProperty('children')) {
        config.children.map(child => buildState(child, blockName));
    }

};

function renderer(config, props) {
    if(config.component === 'wp.editor.MediaUpload') {
        config.attributes.onSelect = imageSelectCb;
        config.attributes.render = gtbImageRender;
    }

    if(config.component === 'wp.components.TextareaControl') {
        //onchange and value attributes
        let label = config.attributes.label;
        config.attributes.onChange = function(value) {
            props.setAttributes({[label] : value});
        }

        config.attributes.value = props.attributes[label];
    }

    if(config.component === 'wp.components.ServerSideRender') {
        config.attributes.attributes = props.attributes;
    }

    return React.createElement(
        BlockCompMap[config.component],
        config.attributes,

        config.children &&
        (typeof config.children === "string"
            ? config.children
            : config.children.map(c => renderer(c, props)))
    );

}*/

function imageSelectCb(media) {
    // set react state with image in imageSelectCb
    console.log(media);
}

function gtbImageRender(obj) {
    return wp.element.createElement( wp.components.Button, {
            className: 'components-icon-button image-block-btn is-button is-default is-large',
            onClick: obj.open
        },
        wp.element.createElement( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
            wp.element.createElement( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
        ),
        wp.element.createElement( 'span', {},
            'Select image'
        ),
    );
}