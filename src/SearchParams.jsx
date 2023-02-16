import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Results from './Results'
import useBreedList from './useBreedList'
import fetchSearch from './fetchSearch'

const ANIMALS = ['dog', 'cat', 'rabbit', 'reptile']
//const breeds = []

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  })
  const [animal, setAnimal] = useState('')
  const [breeds] = useBreedList(animal)

  const results = useQuery(['search', requestParams], fetchSearch)
  const pets = results?.data?.pets ?? []
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target)
          const obj = {
            location: formData.get('location') ?? '',
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
          }
          setRequestParams(obj)
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            placeholder="location"
          />
        </label>

        <label htmlFor="animal">
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value)
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          <select name="breed" id="breed" disabled={breeds.length === 0}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}
export default SearchParams
