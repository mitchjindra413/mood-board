
export const Highlights = () => {
    const posts = useSelector(state => state.entities.posts)
    const [days, setDays] = useState([])

    useEffect(() => {

        let start = moment().startOf('week')
        const end = moment().endOf('week').add(1, 'day')
        const valueArr = []

        while (start.isBefore(end, 'day')) {
            let format = start.clone().format('l')
            if (posts[format]) {
                let temp = {}
                temp.date = posts[format].createdAt
                temp.rating = posts[format].rating
                valueArr.push(temp)
            } else {
                valueArr.push({ date: start })
            }

            let temp = start.clone().add(1, 'day')

            start = temp
        }
        setValues(valueArr)
    }, [])

    return (
        <div>

        </div>
    )
}