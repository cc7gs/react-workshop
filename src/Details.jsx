import React, { Component,lazy } from 'react'
import pet from "@frontendmasters/pet";
import {navigate} from '@reach/router'
import ErrorBoundary from './ErrorBoundary'
import Carousel from './components/Carousel'
const Modal=lazy(()=>import('./modal'))

export default function DetailsErrorBoundary(props) {
    return (<ErrorBoundary>
        <Details {...props} />
    </ErrorBoundary>)
}
class Details extends Component {
    state = {
        loading: false,
        showModal:false,
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
                    url:animal.url,
                    loading: false
                })
            })
            .catch(err => this.setState({ error: err }))
    }
     adopt=()=>navigate(this.state.url)
     toggleModal=()=>{
         this.setState({
             showModal:!this.state.showModal
         })
     }
    render() {
        if (this.state.loading) {
            return <h1>loading … </h1>;
        }
        const { animal, breed, location, name, description, media,showModal } = this.state
        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} — ${breed} — ${location}`}</h2>
                    <button onClick={this.toggleModal}>Adopt {name}</button>
                    <p>{description}</p>
                    {
                        showModal?(
                            <Modal>
                                <h1>Would you like to adopt</h1>
                                <div className="buttons">
                                    <button onClick={this.adopt}>Yes</button>
                                    <button onClick={this.toggleModal}>No,I am a monster</button>
                                </div>
                            </Modal>
                        ):null
                    }
                </div>
            </div>
        )
    }
}



