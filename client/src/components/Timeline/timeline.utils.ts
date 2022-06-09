import _ from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { convertDate } from '../../constants';
import { TrackItemType } from '../../enum/TrackItemType';
import { Logger } from '../../logger';
import { exeCodingAppApi } from '../../services/airtable';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyqAakV032CP1G9D'}).base('appRMFVtMJWPbbVVz');

export const filterItems = (timeItems, visibleTimerange) =>
    timeItems.filter((item) => {
        const itemBegin = convertDate(item.beginDate);
        const itemEnd = convertDate(item.endDate);
        const [visBegin, visEnd] = visibleTimerange;

        return itemBegin.isBetween(visBegin, visEnd) || itemEnd.isBetween(visBegin, visEnd);
    });

export const filterCodingBucket = (timeItems, visibleTimerange) => {
    // coding_app_arr returns a promise 
    let coding_app_arr = exeCodingAppApi();
    console.log('Exe1')
    Logger.debug("Test Log Prom")
    Logger.debug(coding_app_arr)
    console.log('Exe2')
    let coder_arr:any = []
    coding_app_arr.then(resp => {
        console.log('Exe3')
        coder_arr = resp
    })
    
    return timeItems.filter((item: { beginDate: Date; endDate: Date; app: string; }) => {
        const itemBegin = convertDate(item.beginDate);
        const itemEnd = convertDate(item.endDate);
        const [visBegin, visEnd] = visibleTimerange;

        console.log('Exe4')

        return ((itemBegin.isBetween(visBegin, visEnd) || itemEnd.isBetween(visBegin, visEnd)) && codingBucketBoolValue(item, coder_arr));
    });
}

const codingBucketBoolValue = (item,coding_app_keywords) => {
    console.log("eeeeexxxxxeeeee");
    console.log(coding_app_keywords);
    let coding_bool = false
    const app_name = item.app.toLowerCase()
    const title = item.title.toLowerCase()
    
    let browser_coding_keywords = ["stack overflow","github","cloud9","codeanywhere","codenvy","Repl","Koding","Orion","codetasty","sourcelair","coder","codesandbox","codepen","shiftedit","gitpod","visual studio online","stackhive","browxy","codetogether","codeincloud"]
    let browsers = ["google chrome", "microsoft edge", "brave", "firefox", "safari"]
    coding_app_keywords.forEach(element => {
        coding_bool = coding_bool || app_name.includes(element);
    })
    browser_coding_keywords.forEach(element => {
        if(browsers.includes(app_name)){
            coding_bool = coding_bool || title.includes(element);
        }
    })
    return coding_bool && !(meetingBucketBoolValue(item)) ;
}

export const filterColabBucket = (timeItems, visibleTimerange) =>
    timeItems.filter((item: { beginDate: Date; endDate: Date; app: string; }) => {
        const itemBegin = convertDate(item.beginDate);
        const itemEnd = convertDate(item.endDate);
        const [visBegin, visEnd] = visibleTimerange;

        return ((itemBegin.isBetween(visBegin, visEnd) || itemEnd.isBetween(visBegin, visEnd)) && colabBucketBoolValue(item));
    });

const colabBucketBoolValue = (item) => {
    
    let coding_app_arr = exeCodingAppApi();
    console.log('Exe1')
    Logger.debug("Test Log Prom")
    Logger.debug(coding_app_arr)
    console.log('Exe2')
    let coder_arr:any = []
    coding_app_arr.then(resp => {
        console.log('Exe3')
        coder_arr = resp
    })

    const colab_doc_tools = ["confluence","quip","sharepoint","zoho wiki","base camp","book stack","gitbook","papyrs", "slack"]
    let app_condition = false
    colab_doc_tools.forEach(element => {
        app_condition = app_condition || item.title.toLowerCase().includes(element) || item.app.toLowerCase().includes(element)
    })
    return (app_condition && !(codingBucketBoolValue(item,coder_arr)));
}

export const filterMeetingBucket = (timeItems, visibleTimerange) =>
    timeItems.filter((item: { beginDate: Date; endDate: Date; app: string; }) => {
        const itemBegin = convertDate(item.beginDate);
        const itemEnd = convertDate(item.endDate);
        const [visBegin, visEnd] = visibleTimerange;

        return ((itemBegin.isBetween(visBegin, visEnd) || itemEnd.isBetween(visBegin, visEnd)) && meetingBucketBoolValue(item));
    });

const meetingBucketBoolValue = (item) => {
    const meeting_keyword = ["google meet","meet -","zoom"]
    let app_condition = false
    meeting_keyword.forEach(element => {
        app_condition = app_condition || item.title.toLowerCase().includes(element) || item.app.toLowerCase().includes(element)
    })
    return(!(colabBucketBoolValue(item)) && app_condition);
}

export const filterIdleBucket = (timeItems, visibleTimerange) =>
    timeItems.filter((item: { beginDate: Date; endDate: Date; app: string; }) => {
        const itemBegin = convertDate(item.beginDate);
        const itemEnd = convertDate(item.endDate);
        const [visBegin, visEnd] = visibleTimerange;

        return ((itemBegin.isBetween(visBegin, visEnd) || itemEnd.isBetween(visBegin, visEnd)) && idleBucketBoolValue(item));
    });

const idleBucketBoolValue = (item) => {
    let app_condition = item.app.toLowerCase().includes("idle")
    return app_condition;
}

export const aggregateappItems = (items) => {
    _.reduce(
        items,
        (result) => {
            const currVal = result; // result[value.id](result[value.id] || (result[value.id] = [])).push(key);
            return currVal;
        },
        {},
    );
};

export const copyTime = (from, to) =>
    moment(from).set({
        hour: to.hour(),
        minute: to.minute(),
    });

export const setDayFromTimerange = (visibleTimerange, timerange) => [
    copyTime(timerange[0], visibleTimerange[0]),
    copyTime(timerange[1], visibleTimerange[1]),
];

export const getTodayTimerange = () => [moment().startOf('day'), moment().endOf('day')];

export const getCenteredTimerange = (timerange, visibleTimerange, middleTime) => {
    const timeBetweenMs = moment(visibleTimerange[1]).diff(visibleTimerange[0]);
    const middlePoint = timeBetweenMs / 5;

    let beginDate = moment(middleTime).subtract(timeBetweenMs - middlePoint, 'milliseconds');
    let endDate = moment(middleTime).add(middlePoint, 'milliseconds');

    // if new beginDate is smaller than actual timerange, then cap it with timeranges beginDate
    const underTime = moment(timerange[0]).diff(beginDate);
    if (underTime > 0) {
        beginDate = moment(timerange[0]);
        endDate = moment(endDate).add(underTime, 'milliseconds');
    }

    // if new endDate is bigger than actual timeranges endDate, then cap it with timeranges endDate
    const overTime = moment(endDate).diff(timerange[1]);
    if (overTime > 0) {
        endDate = moment(timerange[1]);
        beginDate = moment(beginDate).subtract(overTime, 'milliseconds');

        //edge case, if we have 23h visible timerange, then cap it with timeranges beginDate
        if (moment(timerange[0]).diff(beginDate) > 0) {
            beginDate = moment(timerange[0]);
        }
    }

    return [beginDate, endDate];
};

export const getUniqueAppNames = (appItems) =>
    _(appItems)
        .map('app')
        .uniq()
        .orderBy([(app) => app.toLowerCase()])
        .map((app) => ({
            text: app,
            value: app,
        }))
        .value();

export const getTrackItemOrder = (type: string) => {
    if (type === TrackItemType.AppTrackItem) {
        return 1;
    }
    if (type === TrackItemType.StatusTrackItem) {
        return 2;
    }
    if (type === TrackItemType.LogTrackItem) {
        return 3;
    }
    return 0;
};

export const getTrackItemOrderFn = (d) => getTrackItemOrder(d.taskName);
export const convertDateForY = (d) => convertDate(d.beginDate);
export const convertDateForY0 = (d) => convertDate(d.endDate);
