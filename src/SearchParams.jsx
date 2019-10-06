import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import changeTheme from './actionCreators/changeTheme'
import changeLocation from './actionCreators/changeLocation'
import Results from './components/results'
import useDropdown from './components/useDropdown'
import pet, { ANIMALS } from '@frontendmasters/pet'

const SearchParams = (props) => {
    const [location,setLocation]=useState('');
    const [theme,setTheme]=useState('');
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown('Animal', "dog", ANIMALS)
    const [breed, BreedDropdown,setBreed] = useDropdown('Breed', "", breeds);
    const [pets,setPets]=useState([]);

    useEffect(() => {
        setBreeds([]);
        setBreed("");
        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
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
    // const {theme,location,changeLocation,setTheme}=props;
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
                    // onChange={e => changeLocation(e.target.value)}
                    onChange={e=>setLocation(e.target.value)}
                    placeholder="location" />
                <AnimalDropdown />
                <BreedDropdown />
                <label htmlFor="theme">theme</label>
                <select
                    id="theme"
                    value={theme}
                    onChange={e=>setTheme(e.target.value)}
                >
                    <option vlaue="darkblue">darkblue</option>
                    <option vlaue="orange">orange</option>
                </select>
                <button style={{backgroundColor:theme}}>Submit</button>
            </form>
            <Results pets={pets}/>
        </div>
    )
}

// const mapStateToProps=({location,theme})=>({
//     location,
//     theme
// });
// const mapDispatchToProps=dispatch=>({
//     setTheme:theme=>dispatch(changeTheme(theme)),
//     changeLocation:location=>dispatch(changeLocation(location))
// }) 
// export default connect(mapStateToProps,mapDispatchToProps)(SearchParams)
export default SearchParams;