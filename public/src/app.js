// more info: https://www.youtube.com/watch?v=Qo-iQNXDf1c&t=615s
// containing outer block so we don't pollute the global namespace
{
    // update the table when we press the refresh button
    /**
     * Populates a data table with some data
     *
     * @param {HTMLDivElement} root
     */
    async function updateTable(root) {
        // console.log('hi')

        // have the refresh button rotating while this function is getting the data
        root.querySelector('.table-refresh__button').classList.add('table-refresh__button--refreshing')

        const table = root.querySelector('.table-refresh__table')
        const response = await fetch(root.dataset.url)
        const data = await response.json()

        // console.log(data)

        // Clear table
        table.querySelector('thead tr').innerHTML = ''
        table.querySelector('tbody').innerHTML = ''

        // Populate headers
        for (const header of data.headers) {
            table.querySelector('thead tr').insertAdjacentHTML('beforeend', `<th>${header}</th>`)
        }

        // Populate rows
        for (const row of data.rows) {
            table.querySelector('tbody').insertAdjacentHTML(
                'beforeend',
                `
                <tr>
                    ${row.map((col) => `<td> ${col}</td>`).join('')}
                </tr>
            `
            )
        }

        // Update last updated text
        root.querySelector('.table-refresh__label').textContent = `Last Update: ${new Date(data.lastUpdated).toLocaleString()}`

        // Stop the refresh icon from spinning
        root.querySelector('.table-refresh__button').classList.remove('table-refresh__button--refreshing')
    }

    // get all matches of table-refresh class with an attribute of data-url
    // create the table for those item(s) and a div for the options
    // add classes to the table and div
    // add the innnerhtml for the new elements
    // add the new elements to the DOM
    for (const root of document.querySelectorAll('.table-refresh[data-url]')) {
        // console.log(root)
        const table = document.createElement('table')
        const options = document.createElement('div')

        table.classList.add('table-refresh__table')
        options.classList.add('table-refresh__options')

        table.innerHTML = `
        <thead>
            <tr></tr>
        </thead>
        <tbody>
            <tr>
                <td>Loading</td>
            </tr>
        </tbody>
        `

        options.innerHTML = `
        <span class='table-refresh__label'>Last Update: never</span>
        <button type='button' class='table-refresh__button'>
            <i class='material-icons'>refresh</i>
        </button>
        `

        root.append(table, options)

        options.querySelector('.table-refresh__button').addEventListener('click', () => {
            updateTable(root)
        })

        updateTable(root)
    }
}
