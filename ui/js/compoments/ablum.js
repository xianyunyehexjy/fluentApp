import React from 'react';
import {Link} from 'react-router-dom';
import store from '../store';
import * as Actions from '../actions';
import * as constStr from "../lib/const";
import eventEmitter from "../lib/eventEmitter";

export default class Ablum  extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.getAlbum();
    }

    getAlbum() {
        eventEmitter.emit(constStr.RINGLOADING, true);
        fetch(`${__REQUESTHOST}/api/top/album`, {
            method: 'GET',
        }).then((res) => {
            return res.json();
        }).then(data => {
            if(data.code == 200) {
                store.dispatch(Actions.setAlbum(data.albums || []));
            }
            eventEmitter.emit(constStr.RINGLOADING, false);
        })
    }

    render() {
        let albumList = store.getState().main.albumList || [];
        return (
            <div className="album">
                <div className="item-list">
                    {
                        albumList.map((data, k) => {
                            return(
                                <Link to={`/albumDetail/${data.id}`} key={k}>
                                <div className="album-itembox clearfix">
                                    <div className="cover">
                                        <img src={data.picUrl}/>
                                    </div>
                                    <div className="info">
                                        <div className="name">{data.name}</div>
                                        <div className="singer">{data.artist.name}</div>
                                    </div>
                                </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}