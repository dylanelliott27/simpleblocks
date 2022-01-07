
Object.keys(blockAttrLibrary).forEach(key => {
    buildState(blockAttrLibrary[key], key);
})


Object.keys(blockAttrLibrary).forEach(key => {
    console.log(key);
    console.log(blockAttrLibrary[key].state);

    wp.blocks.registerBlockType(key, {

        title: key,

        icon: 'megaphone',

        category: 'common',

        attributes: blockAttrLibrary[key].state
            /*test1 : {
                type: 'string'
            },
            test2 : {
                type: 'string'
            }*/
        ,

        edit: function(props) {
            return renderer(blockAttrLibrary[key])
        } ,

        save: () => null
    });
});