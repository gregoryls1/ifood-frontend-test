import React, { useState, useEffect } from 'react'
import Filters from './components/Filters'
import Playlist from './components/Playlist'
import './App.scss'

function App() {

    const params = getHashParams()
    const [playlist, setplaylist] = useState([]);
    const [message, setmessage] = useState('');
    const [locale, setlocale] = useState('pt_BR');
    const [country, setcountry] = useState('BR');
    const [timestamp, settimestamp] = useState('2019-10-23T09:00:00');
    const [limit, setlimit] = useState('5');
    const [offset, setoffset] = useState('1');

    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    function updateLocale(value) {
        setlocale(value)
        findPlaylists(value, country, timestamp, limit, offset).then(data => {
            const playlists = data.playlists.items
            setmessage(data.message)
            setplaylist(playlists)
        })
    }

    function updateCountry(value) {
        setcountry(value)
        findPlaylists(locale, value, timestamp, limit, offset).then(data => {
            const playlists = data.playlists.items
            setmessage(data.message)
            setplaylist(playlists)
        })
    }

    function updateTimeStamp(value) {
        settimestamp(value)
        findPlaylists(locale, country, value, limit, offset).then(data => {
            const playlists = data.playlists.items
            setmessage(data.message)
            setplaylist(playlists)
        })
    }

    function updateLimit(value) {
        setlimit(value)
        findPlaylists(locale, country, timestamp, value, offset).then(data => {
            const playlists = data.playlists.items
            setmessage(data.message)
            setplaylist(playlists)
        })
    }

    function updateOffset(value) {
        setoffset(value)
        findPlaylists(locale, country, timestamp, limit, value).then(data => {
            const playlists = data.playlists.items
            setmessage(data.message)
            setplaylist(playlists)
        })
    }

    function findPlaylists(locale, country, timestamp, limit, offset) {
        if (localStorage.getItem('key') == null) {
            localStorage.setItem('key', params.access_token)
        }
        let date = timestamp.split(":").join("%3A")
        const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&locale=${locale}&timestamp=${date}&offset=${offset}&limit=${limit}`
        return fetch(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('key')}`,
            }
        }).then(response => {
            if (response.status == '401') {
                localStorage.clear('key')
                window.location.replace("http://localhost:8888")
            }
            return response.json()
        })
    }

    useEffect(() => {
        if (params.access_token == undefined && localStorage.getItem('key') == null) {
            setTimeout(() => {
                window.location.replace("http://localhost:8888")
            }, 2000);
            return
        }
        findPlaylists(locale, country, timestamp, limit, offset).then(data => {
            const playlists = data.playlists.items
            setmessage(data.message)
            setplaylist(playlists)
        })
    }, []);

    useEffect(() => {
        setInterval(() => {
            findPlaylists(locale, country, timestamp, limit, offset).then(data => {
                const playlists = data.playlists.items
                setmessage(data.message)
                setplaylist(playlists)
            })
        }, 30000);
    }, []);

    return (
        <div className="d-flex spotifood">
            <Filters locale={locale} country={country}
                timestamp={timestamp} limit={limit} offset={offset}
                updateLocale={updateLocale} updateCountry={updateCountry}
                updateTimeStamp={updateTimeStamp} updateLimit={updateLimit}
                updateOffset={updateOffset} />

            <div className="d-flex flex-column list-playlists">
                <h3 className="title p-5">{message}</h3>
                <div className="px-4 d-flex flex-wrap container-playlist">
                    {playlist.map(item => {
                        return <Playlist key={item.id} image={item.images[0].url} link={item.external_urls.spotify}
                            title={item.name} description={item.description} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;
