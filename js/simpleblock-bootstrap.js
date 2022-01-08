// Build the React State, which is injected into the attributes property of the registerBlockType call
Object.keys(blockAttrLibrary).forEach(key => {
    simpleBlockTools.buildState(blockAttrLibrary[key], key);
})

// Loop over all of the blocks sent from PHP and register them.
Object.keys(blockAttrLibrary).forEach(key => {

    wp.blocks.registerBlockType(key, {

        title: key,

        icon: 'megaphone', // TODO: make dynamic

        category: 'common', // TODO: make dynamic

        attributes: blockAttrLibrary[key].state,

        edit: function(props) {
            return simpleBlockTools.buildComponentTree(blockAttrLibrary[key], props)
        },

        save: () => null // Our blocks use server side rendering
    });
});