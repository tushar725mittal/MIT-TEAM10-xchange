

async function get_data_range({ currency_from, currency_to, date_begin, date_end }) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "currency_from": currency_from,
            "currency_to": currency_to,
            "date_begin": date_begin,
            "date_end": date_end,
        })
    };

    var response = await fetch('https://mit-team10-xchange.jxt1n.repl.co/get_data_inDateRange', requestOptions);
    var responseJson = await response.json();

    return responseJson;

}

export { get_data_range };