import React, { Component } from 'react'
import { Photo } from '@frontendmasters/pet';

interface IProps {
    media: Photo[];
}

interface IState {
    active: number;
    photos: string[];
}

export default class Carousel extends Component<IProps, IState> {
    public state = {
        photos: [],
        active: 0
    }

    public static getDerivedStateFromProps({ media }: IProps) {
        let photos = ["http://placecorgi.com/600/600"];
        if (media && media.length) {
            photos = media.map(({ large }) => large);
        }
        return { photos };
    }

    public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }
        if (event.target.dataset.index) {
            this.setState({
                active: +event.target.dataset.index
            })
        }
    }

    public render() {
        const { photos, active } = this.state
        return (
            <div className="carousel">
                <img src={photos[active]} alt="animal" />
                <div className="carousel-smaller">
                    {
                        photos.map((photo, index) => (
                            <img
                                key={photo}
                                src={photo}
                                data-index={index}
                                onClick={this.handleIndexClick}
                                className={index === active ? 'active' : ''}
                                alt="animal thumbnail"
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}