import React, { useState, useEffect } from 'react'
import Results from './components/results'
import useDropdown from './components/useDropdown'
import pet, { ANIMALS,Animal } from '@frontendmasters/pet'
import { RouteComponentProps } from '@reach/router'

const SearchParams:React.FC<RouteComponentProps> = () => {
    const [location, setLocation] = useState('shangHai');
    const [breeds, setBreeds] = useState([] as string[]);
    const [animal, AnimalDropdown] = useDropdown('Animal', "dog", ANIMALS)
    const [breed, BreedDropdown,setBreed] = useDropdown('Breed', "", breeds);
    const [pets,setPets]=useState([] as Animal[]);

    useEffect(() => {
        setBreeds([]);
        setBreed("");
        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings:string[] = breeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal]);

    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });
        setPets(animals||[]);
    }
    
    return (
        <div className="search-params">
            <form
                onSubmit={e => {
                    e.preventDefault();
                     requestPets();
                }}
            >
                <label htmlFor="location">
                    location
                </label>
                <input
                    id="location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="location" />
                <AnimalDropdown />
                <BreedDropdown />
                <button>Submit</button>
            </form>
            <Results pets={pets}/>
        </div>
    )
}
export default SearchParams