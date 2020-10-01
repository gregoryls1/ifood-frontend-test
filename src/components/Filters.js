import React, { useState, useEffect } from 'react'
import { Form, Navbar } from 'react-bootstrap'
import { FunnelFill } from 'react-bootstrap-icons';

import './Filters.scss'

function Filters(props) {

    const [filters, setFilters] = useState([]);

    function formatDate(value) {
        let date = new Date(value)
        let year = date.getUTCFullYear()
        let month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : date.getUTCMonth()
        let day = date.getUTCDay() < 10 ? `0${date.getUTCDay()}` : date.getUTCDay()
        let hour = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()
        let minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()
        return `${year}-${month}-${day}T${hour}:${minutes}`
    }


    function convertISOSDate(value) {
        let date = new Date(value)
        let year = date.getUTCFullYear()
        let month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : date.getUTCMonth()
        let day = date.getUTCDay() < 10 ? `0${date.getUTCDay()}` : date.getUTCDay()
        let hour = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()
        let minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()
        return `${year}-${month}-${day}T${hour}:${minutes}:00`
    }

    function filterMobile() {
        let sidebar = document.getElementById('sidebar')
        return sidebar.classList.contains('show') ? sidebar.classList.remove('show') :
            sidebar.classList.add('show')
    }


    useEffect(() => {
        async function findFilters() {
            let response = await fetch(`http://www.mocky.io/v2/5a25fade2e0000213aa90776`)
            response = await response.json()
            setFilters(response.filters)
        }
        findFilters()
    }, [])

    return (
        <div className='sidebar d-flex align-items-center flex-column' id="sidebar">
            <Navbar.Brand href="#home">Spotifood</Navbar.Brand>
            <Form className="px-3">
                {Object.keys(filters).map((obj, i) => {
                    return <Form.Group key={filters[obj].id} controlId={filters[obj].id}>
                        <Form.Label>{filters[obj].name}</Form.Label>
                        {(() => {
                            if (filters[obj].id == 'locale') {
                                return <Form.Control as="select" htmlSize={1}
                                    defaultValue={props.locale} custom name="locale"
                                    onChange={e => props.updateLocale(e.target.value)}>
                                    {filters[obj].values != undefined ?
                                        filters[obj].values.map(value =>
                                            <option key={value.value} value={value.value}>
                                                {value.name}
                                            </option>) :
                                        ''}
                                </Form.Control>

                            } else if (filters[obj].id == 'country') {
                                return <Form.Control as="select" htmlSize={1}
                                    defaultValue={props.country} custom
                                    onChange={e => props.updateCountry(e.target.value)}>
                                    {filters[obj].values != undefined ?
                                        filters[obj].values.map(value =>
                                            <option key={value.value}
                                                value={value.value == 'en_US' ? 'US' : value.value}>
                                                {value.name}
                                            </option>) :
                                        ''}
                                </Form.Control>

                            } else if (filters[obj].id == 'timestamp') {
                                return <Form.Control type="text" type="datetime-local"
                                    placeholder={filters[obj].validation.pattern}
                                    defaultValue={formatDate(props.timestamp)}
                                    onChange={e => props.updateTimeStamp(convertISOSDate(e.target.value))} />

                            } else if (filters[obj].id == 'limit') {
                                return <Form.Control type="number" placeholder="1"
                                    defaultValue={props.limit}
                                    min={filters[obj].validation.min} max={filters[obj].validation.max}
                                    onChange={e => props.updateLimit(e.target.value)} />

                            } else {
                                return <Form.Control type="number" min="1" placeholder="1"
                                    defaultValue={props.offset}
                                    onChange={e => props.updateOffset(e.target.value)} />
                            }
                        })()}

                    </Form.Group>
                })}
            </Form>
            <div className="mobile-filter" onClick={() => filterMobile()}>
                <FunnelFill className="icon-filter" color="white" size={40} />
            </div>

        </div>
    );
};

export default Filters