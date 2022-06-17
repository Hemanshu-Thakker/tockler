import { Action, action, useStoreState } from 'easy-peasy';
import { createStore } from 'easy-peasy';

let codingKey = []
let codingbrowser = []
let browser = []
let meeting = []
let colab = []

export interface KeywordStore{
    codingKeys: String[];
    setCodingKeys: Action<KeywordStore,any>;

    codingbrowsers: String[];
    setCodingBrowsers: Action<KeywordStore,String[]>;

    browsers: String[];
    setBrowsers: Action<KeywordStore,String[]>;

    meetings: String[];
    setMeetings: Action<KeywordStore,String[]>;

    colabs: String[];
    setColabs: Action<KeywordStore,String[]>;
}

const subStore = createStore<KeywordStore>({
    codingKeys: [],
    setCodingKeys: action((state,payload) => {
        state.codingKeys = payload
    }),

    codingbrowsers: [],
    setCodingBrowsers: action((state,payload) => {
        state.codingbrowsers = payload
    }),

    browsers: [],
    setBrowsers: action((state,payload) => {
        state.browsers = payload
    }),

    meetings: [],
    setMeetings: action((state,payload) => {
        state.meetings = payload
    }),

    colabs: [],
    setColabs: action((state,payload) => {
        state.colabs = payload
    })
})

export { subStore };