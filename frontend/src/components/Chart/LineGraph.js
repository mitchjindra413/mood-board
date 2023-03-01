import {
    AnimatedAxis, 
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
    AnimatedGlyphSeries
} from '@visx/xychart';
import moment from 'moment';
import { useSelector } from "react-redux"
import { useEffect, useState } from 'react';

export const LineGraph = () => {
    const posts = useSelector(state => state.entities.posts)
    const [values, setValues] = useState([])

    useEffect(() => {
        
        let start = moment().startOf('week')
        const end = moment().endOf('week').add(1, 'day')
        const valueArr = []

        console.log(start, end)

        while (start.isBefore(end, 'day')) {
            let format = start.clone().format('l')
            if (posts[format]) {
                let temp = {}
                temp.date = posts[format].createdAt
                temp.rating = posts[format].rating
                valueArr.push(temp)
            } else {
                valueArr.push({date: start})
            }

            let temp = start.clone().add(1, 'day')
            
            start = temp
        }
        console.log('exited')
        console.log(valueArr)
        setValues(valueArr)
    }, [])

    // console.log(values)

    const accessors = {
        xAccessor: (d) => moment(d.date).format('l'),
        yAccessor: (d) => d.rating,
        colorAccessor: (d) => key[d.rating]
    };

    const key = {
        0: '#ebebeb',
        1: '#FFC906',
        2: '#F99E4C',
        3: '#F05F24',
        4: '#40BCC9',
        5: '#0A6E8F'
    }
    
    return (
        <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear', domain: [0, 5] }}>
            <AnimatedAxis orientation="bottom" />
            <AnimatedAxis orientation='left' numTicks={5} hideZero={true} stroke={'black'} tickValues={[1,2,3,4,5]}/>
            <AnimatedLineSeries dataKey="Date" data={values} {...accessors} 
                stroke={"black"}
                // curve={curveCatmullRom}
                />
            <AnimatedGlyphSeries dataKey="point" data={values} {...accessors} 
                size={15}
                />
            <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                // showSeriesGlyphs
                renderTooltip={({ tooltipData }) => (
                    <div>
                        <h3>Date: {accessors.xAccessor(tooltipData.nearestDatum.datum)}</h3>
                        <h3>Rating: {accessors.yAccessor(tooltipData.nearestDatum.datum)}</h3>
                    </div>
                )}
            />
        </XYChart>

    )
}