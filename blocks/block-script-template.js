
Object.keys(blockAttrLibrary).forEach(key => {
    buildState(blockAttrLibrary[key], key);
})


Object.keys(blockAttrLibrary).forEach(key => {
    console.log(blockAttrLibrary[key].state);

    wp.blocks.registerBlockType(key, {

        title: key,

        icon: 'megaphone',

        category: 'common',

        attributes: blockAttrLibrary[key].state,

        edit: function(props) {
            return renderer(blockAttrLibrary[key], props)
        },

        save: () => null
    });
});