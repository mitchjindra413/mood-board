import {
    AnimatedAxis, 
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';
import moment from 'moment';
import { useSelector } from "react-redux"

export const LineGraph = () => {
    const posts = useSelector(state => Object.values(state.entities.posts))

    const accessors = {
        xAccessor: (d) => moment(d.createdAt).format('l'),
        yAccessor: (d) => d.rating,
    };
    
    return (
        <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
            <AnimatedAxis orientation="bottom" />
            {/* <AnimatedAxis orientation='left' numTicks={5} hideZero={true} /> */}
            <AnimatedGrid columns={false} numTicks={5}/>
            <AnimatedLineSeries dataKey="Date:" data={posts} {...accessors} />
            <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                
                showSeriesGlyphs
                renderTooltip={({ tooltipData, colorScale }) => (
                    <div>
                        <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                            {tooltipData.nearestDatum.key}
                        </div>
                        {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                        {', '}
                        {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                    </div>
                )}
            />
        </XYChart>
    )
}