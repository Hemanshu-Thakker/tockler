// tslint:disable-next-line: no-submodule-imports

import React, { useEffect, useMemo, useState } from 'react';
import { TrackItemType } from '../../enum/TrackItemType';
import { filterItems, filterCodingBucket, filterColabBucket, filterMeetingBucket, filterIdleBucket } from '../Timeline/timeline.utils';
import { checkIfOneDay } from '../../timeline.util';
import { useStoreState } from '../../store/easyPeasy';
import { useStoreActions } from '../../store/easyPeasyKey';
import { subStore } from '../../store/subStore';
import { mainStore } from '../../store/mainStore';
import { ItemsTable } from './ItemsTable';
import { Logger } from '../../logger';
import { getOnlineTime, getNewOnlineTime, getTasksTime } from '../PieCharts/MetricTiles.utils';
import { secondsToClock } from '../../time.util';
import { exeCodingAppApi } from '../../services/airtable';

import firstBucket from '../../assets/icons/bucket1.png';
import secondBucket from '../../assets/icons/bucket2.png';
import thirdBucket from '../../assets/icons/bucket3.png';
import fourthBucket from '../../assets/icons/bucket4.png';

export const TrackItemBucket = () => {

    const type = TrackItemType.AppTrackItem
    const timeItems = useStoreState(state => state.timeItems);
    const visibleTimerange = useStoreState(state => state.visibleTimerange);
    const timerange = useStoreState(state => state.timerange);

    useEffect(() => {
        exeCodingAppApi('Coding app').then(resp => {
            subStore.dispatch.setCodingKeys(resp)
        })
        exeCodingAppApi('coding browser').then(resp => {
            subStore.dispatch.setCodingBrowsers(resp)
        })
        exeCodingAppApi('browsers').then(resp => {
            subStore.dispatch.setBrowsers(resp)
        })
        exeCodingAppApi('colab/doc').then(resp => {
            subStore.dispatch.setColabs(resp)
        })
        exeCodingAppApi('meeting').then(resp => {
            subStore.dispatch.setMeetings(resp)
        })
    })

    const c_data = useMemo(
        () =>
            filterCodingBucket(timeItems.appItems, timerange),
        [type, timeItems.appItems, timeItems.logItems, timerange],
    );

    const b_data = useMemo(
        () =>
            filterColabBucket(timeItems.appItems, timerange),
        [type, timeItems.appItems, timeItems.logItems, timerange],
    );

    const e_data = useMemo(
        () =>
            filterMeetingBucket(timeItems.appItems, timerange),
        [type, timeItems.appItems, timeItems.logItems, timerange],
    );

    const i_data = useMemo(
        () =>
            filterIdleBucket(timeItems.statusItems, timerange),
        [type, timeItems.appItems, timeItems.logItems, timerange],
    );
    
    const onlineCodingTotal = getNewOnlineTime(c_data, timerange)
    const onlineBrowsingTotal = getNewOnlineTime(b_data, timerange)
    const onlineEntertainTotal = getNewOnlineTime(e_data, timerange)
    const onlineIdleTotal = getNewOnlineTime(i_data, timerange)

    const isOneDay = checkIfOneDay(timerange);

    const wrapVal:any = "wrap"

    const styles = {
        mainDiv: {
            display: "flex",
            flexWrap: wrapVal,
            marginTop: "50px",
            marginBottom: "50px"
        },
        bucketDiv: {
            width: "23%", 
            margin: "10px"
        },
        imageDiv: {
            display: "flex",
            flexWrap: wrapVal,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40"
        },
        imageStyles: {
            height: 100,
            width: 100
        },
        bucketHead: {
            fontSize: '20px',
            fontWeight: '800'
        },
        catHead: {
            fontSize: '18px',
            fontStyle: 'italic'
        },
    }

    return (
        <div style={styles.mainDiv}>
            <div style={styles.bucketDiv}>
                <div style={styles.imageDiv}>
                    <img src={firstBucket} style={styles.imageStyles} />
                    <div>
                        <div style={styles.bucketHead}>Bucket 1</div>
                        <div style={styles.catHead}>CODING</div>
                        <p>Time spent: {secondsToClock(onlineCodingTotal / 1000, 0, 2) || 'NA'}</p>
                    </div>
                </div>
                <div style={{display: 'none'}}>
                    <ul>
                        {c_data.map(element => {
                            return (<li key={element.id} value={element.id}>{element.app} - {element.title}</li>);
                        })}
                    </ul>
                </div>
            </div>
            <div style={styles.bucketDiv}>
                <div style={styles.imageDiv}>
                    <img src={secondBucket} style={styles.imageStyles} />
                    <div>
                        <div style={styles.bucketHead}>Bucket 2</div>
                        <div style={styles.catHead}>COLABORATION</div>
                        <p>Time spent: {secondsToClock(onlineBrowsingTotal / 1000, 0, 2) || 'NA'}</p>
                    </div>
                </div>
                <div style={{display: 'none'}}>
                    <ul>
                        {b_data.map(element => {
                            return (<li key={element.id} value={element.id}>{element.app} - {element.title}</li>);
                        })}
                    </ul>
                </div>
            </div>
            <div style={styles.bucketDiv}>
                <div style={styles.imageDiv}>
                    <img src={thirdBucket} style={styles.imageStyles} />
                    <div>
                        <div style={styles.bucketHead}>Bucket 3</div>
                        <div style={styles.catHead}>MEETING</div>
                        <p>Time spent: {secondsToClock(onlineEntertainTotal / 1000, 0, 2) || 'NA'}</p>
                    </div>
                </div>
                <div style={{display: 'none'}}>
                    <ul>
                        {e_data.map(element => {
                            return (<li key={element.id} value={element.id}>{element.app} - {element.title}</li>);
                        })}
                    </ul>
                </div>
            </div>
            <div style={styles.bucketDiv}>
                <div style={styles.imageDiv}>
                    <img src={fourthBucket} style={styles.imageStyles} />
                    <div>
                    <div style={styles.bucketHead}>Bucket 4</div>
                    <div style={styles.catHead}>IDLING</div>
                        <p>Time spent: {secondsToClock(onlineIdleTotal / 1000, 0, 2) || 'NA'}</p>
                    </div>
                </div>
                <div style={{display: 'none'}}>
                    <ul>
                        {i_data.map(element => {
                            return (<li key={element.id} value={element.id}>{element.app} - {element.title}</li>);
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
function ul(arg0: any) {
    throw new Error('Function not implemented.');
}