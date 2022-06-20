require('dotenv').config()
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_API_KEY}).base(process.env.REACT_APP_BASE);

export const exeCodingAppApi = async(table:string) => {
    var api_result:string[] = []
    const records = await base(table).select().all();
    records.forEach(function(record) {
        api_result.push(record.get("Name"));
    });
    return api_result;
}