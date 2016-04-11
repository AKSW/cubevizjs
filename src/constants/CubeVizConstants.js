import keyMirror from 'keyMirror';

export default {
    ActionTypes: keyMirror({
        INIT_FACETS: null,
        CLICK_FACETS_SELECTION: null,
        SELECT_FACETS: null
    }),

    ChannelTypes: keyMirror({
        FACETS_SETTINGS: null
    })
};
