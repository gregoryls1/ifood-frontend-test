import React from 'react'
import { Image } from 'react-bootstrap'
import './Playlist.scss'

function Playlist(props) {

    return (
        <div className="playlist-card m-3">
            <Image className="mb-2" src={props.image} thumbnail />
            <a target='_blank' href={props.link}>{props.title}</a>
            <p className="mt-1">{props.description}</p>
        </div>
    );
};

export default Playlist