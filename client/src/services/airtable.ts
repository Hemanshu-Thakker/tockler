import { Logger } from '../logger';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyqAakV032CP1G9D'}).base('appRMFVtMJWPbbVVz');

export const exeCodingAppApi = async() => {
    var api_result:string[] = []
    const records = await base('Coding app').select().all();
    records.forEach(function(record) {
        api_result.push(record.get("Name"));
    });
    // Logger.debug(api_result);
    // Logger.debug(records);

    return api_result;
}

export function exeCodingBrowserApi() {
    return [];
}

export function exeBrowserApi() {
    return [];
}

export function exeMeetingApi() {
    return [];
}

export function exeColabApi() {
    return [];
}