// tslint:disable-next-line: no-submodule-imports

import React, { useEffect, useMemo, useState } from 'react';
import { TrackItemType } from '../../enum/TrackItemType';
import { filterItems, filterCodingBucket, filterColabBucket, filterMeetingBucket, filterIdleBucket } from '../Timeline/timeline.utils';
import { checkIfOneDay } from '../../timeline.util';
import { useStoreState } from '../../store/easyPeasy';
import { updateCodingArr,updateCodingBrowserArr,updateBrowserArr,updateColabArr,updateMeetingArr } from '../../store/subStore';
import { ItemsTable } from './ItemsTable';
import { Logger } from '../../logger';
import { getOnlineTime, getNewOnlineTime, getTasksTime } from '../PieCharts/MetricTiles.utils';
import { secondsToClock } from '../../time.util';
import { exeCodingAppApi } from '../../services/airtable';

export const TrackItemBucket = () => {

    const type = TrackItemType.AppTrackItem
    const timeItems = useStoreState(state => state.timeItems);
    const visibleTimerange = useStoreState(state => state.visibleTimerange);
    const timerange = useStoreState(state => state.timerange);

    useEffect(() => {
        exeCodingAppApi('Coding app').then(resp => {
            updateCodingArr(resp)
        })
        exeCodingAppApi('coding browser').then(resp => {
            updateCodingBrowserArr(resp)
        })
        exeCodingAppApi('browsers').then(resp => {
            updateBrowserArr(resp)
        })
        exeCodingAppApi('colab/doc').then(resp => {
            updateColabArr(resp)
        })
        exeCodingAppApi('meeting').then(resp => {
            updateMeetingArr(resp)
        })
    })

    const c_data = useMemo(
        () =>
            filterCodingBucket(timeItems.appItems, visibleTimerange),
        [type, timeItems.appItems, timeItems.logItems, visibleTimerange],
    );

    const b_data = useMemo(
        () =>
            filterColabBucket(timeItems.appItems, visibleTimerange),
        [type, timeItems.appItems, timeItems.logItems, visibleTimerange],
    );

    const e_data = useMemo(
        () =>
            filterMeetingBucket(timeItems.appItems, visibleTimerange),
        [type, timeItems.appItems, timeItems.logItems, visibleTimerange],
    );

    const i_data = useMemo(
        () =>
            filterIdleBucket(timeItems.statusItems, visibleTimerange),
        [type, timeItems.appItems, timeItems.logItems, visibleTimerange],
    );
    
    const onlineCodingTotal = getNewOnlineTime(c_data, timerange)
    const onlineBrowsingTotal = getNewOnlineTime(b_data, timerange)
    const onlineEntertainTotal = getNewOnlineTime(e_data, timerange)
    const onlineIdleTotal = getNewOnlineTime(i_data, timerange)

    const isOneDay = checkIfOneDay(visibleTimerange);

    return (
        <div style={{display: "flex",flexWrap: "wrap"}}>
            <div style={{width: "23%", backgroundColor: "#dcdcdc", margin: "10px"}}>
                <p>Bucket 1 - CODING</p>
                <p>Time spent: {secondsToClock(onlineCodingTotal / 1000, 0, 2)}</p>
                <ul>
                    {c_data.map(element => {
                        return (<li key={element.id} value={element.id}>{element.app} - {element.title}</li>);
                    })}
                </ul>
            </div>
            <div style={{width: "23%", backgroundColor: "#dcdcdc", margin: "10px"}}>
                <p>Bucket 2 - COLABORATION / DOCUMENTATION</p>
                <p>Time spent: {secondsToClock(onlineBrowsingTotal / 1000, 0, 2)}</p>
                <ul>
                    {b_data.map(element => {
                        return (<li key={element.id} value={element.id}>{element.app} - {element.title}</li>);
                    })}
                </ul>
            </div>
            <div style={{width: "23%", backgroundColor: "#dcdcdc", margin: "10px"}}>
                <p>Bucket 3 - MEETING</p>
                <p>Time spent: {secondsToClock(onlineEntertainTotal / 1000, 0, 2)}</p>
                <ul>
                    {e_data.map(element => {
                        return (<li key={element.id} value={element.id}>{element.app} - {element.title}</li>);
                    })}
                </ul>
            </div>
            <div style={{width: "23%",backgroundColor: "#dcdcdc", margin: "10px"}}>
                <p>Bucket 4 - IDLE</p>
                <p>Time spent: {secondsToClock(onlineIdleTotal / 1000, 0, 2)}</p>
                <ul>
                    {i_data.map(element => {
                        return (<li key={element.id} value={element.id}>{element.app} - {element.title}</li>);
                    })}
                </ul>
            </div>
        </div>
    );
};
function ul(arg0: any) {
    throw new Error('Function not implemented.');
}

