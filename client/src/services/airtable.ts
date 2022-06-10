import { Logger } from '../logger';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyqAakV032CP1G9D'}).base('appRMFVtMJWPbbVVz');

export const exeCodingAppApi = async(table:string) => {
    var api_result:string[] = []
    const records = await base(table).select().all();
    records.forEach(function(record) {
        api_result.push(record.get("Name"));
    });
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