import React, { Component } from 'react'
import pet from "@frontendmasters/pet";

export default class Details extends Component {
    state={
        loading:false
    }
    
    componentDidMount() {
        pet.animal(+this.props.id)
            .then(({ animal }) => {
                this.setState({
                    name: animal.name,
                    animal: animal.type,
                    location: `${animal.contact.address.city}, ${
                        animal.contact.address.state
                        }`,
                    description: animal.description,
                    media: animal.photos,
                    breed: animal.breeds.primary,
                    loading: false
                })
            })
            .catch(err => this.setState({ error: err }))
    }
    render() {
        if (this.state.loading) {
            return <h1>loading … </h1>;
        }
        const {animal,breed,location,name,description}=this.state
        return (
            <div className="details">
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} — ${breed} — ${location}`}</h2>
                    <button>Adopt {name}</button>
                    <p>{description}</p>
                </div>
            </div>
        )
    }
}

