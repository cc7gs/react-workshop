import {readFileSync} from 'fs'
import path from 'path';
import {act} from '@testing-library/react'

const breeds = [
    { name: "Bichon Frise" },
    { name: "Bolognese" },
    { name: "Bolonka" },
    { name: "Coton de Tulear" },
    { name: "Havanese" },
    { name: "Lowchen" },
    { name: "Maltese" }
  ];

const dogs=JSON.parse(
    readFileSync(path.join(__dirname,'res.json'))
);

export const ANIMALS=['dog','cat','bird'];
export const _breeds = breeds;
export const _dogs = dogs.animals;

const mock={
    breeds:jest.fn(()=>{
        return{
            then:callback=>(act(()=>{
                callback({breeds})
            }))
        }
    }),
    animals:jest.fn(()=>{
        return{
            then:callback=>(
                act(()=>{
                    callback(dogs)
                })
            )
        }
    })
}
export default mock;