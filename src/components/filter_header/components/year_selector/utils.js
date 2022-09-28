function YearPopulation() {
    var option = [];
    for (let index = 2022; index >= 2012; index--) {
        option.push(<option key={index}>{index}</option>);

    }
    return (
        option
    )
}

export default YearPopulation;