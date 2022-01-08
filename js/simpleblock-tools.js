let simpleBlockTools = {};


// Static methods on simpleBlockTools

simpleBlockTools.buildState = function(config, blockName) {
    if(config.component === 'wp.components.TextareaControl') {
        blockAttrLibrary[blockName].state[config.attributes.label] = {type: 'string'};
    }

    if(config.hasOwnProperty('children')) {
        config.children.map(child => simpleBlockTools.buildState(child, blockName));
    }
}

simpleBlockTools.buildComponentTree = function(config, props) {
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
        blockCompMap[config.component],
        config.attributes,

        config.children &&
        (typeof config.children === "string"
            ? config.children
            : config.children.map(c => simpleBlockTools.buildComponentTree(c, props)))
    );
}