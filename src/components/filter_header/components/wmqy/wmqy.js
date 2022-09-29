function WMQY(props) {
    function handleClick() {
        props.filterType(props.type);
        // console.log(props.type);
    }
    return (
        <div>
            <button onClick={handleClick}>{props.type}</button>
        </div>
    )
}

export default WMQY;

