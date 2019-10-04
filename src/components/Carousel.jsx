import React, { Component } from 'react'

export default class Carousel extends Component {
    state = {
        photos: [],
        active: 0
    }

    static getDerivedStateFromProps({ media }) {
        let photos = ["http://placecorgi.com/600/600"];
        if (media&&media.length) {
            photos = media.map(({ large }) => large);
        }
        return { photos };
    }

    handleIndexClick=(event)=>{
        this.setState({
            active:+event.target.dataset.index
        })
    }

    render() {
        const { photos, active } = this.state
        return (
            <div className="carousel">
                <img src={photos[active]} alt="animal" />
                <div className="carousel-smaller">
                    {
                        photos.map((photo,index) => (
                            <img
                                key={photo}
                                src={photo}
                                data-index={index}
                                onClick={this.handleIndexClick}
                                className={index===active?'active':''}
                                alt="animal thumbnail"
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}