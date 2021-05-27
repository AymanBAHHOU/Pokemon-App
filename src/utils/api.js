import {
  API_CHAIN_URL,
  API_SPECIES_URL,
  API_TYPES_URL,
  API_URL
} from "./constants";

export const fetchAllPokemons = async (url) => {
  try {
    const requested_url = url ? url : API_URL;
    const response = await fetch(requested_url);
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error('Oops something went wrong ❌');
  }

}


export const fetchPokemon = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Oops something went wrong ❌');
  }
}

export const fetchEvolutions = async (id) => {
  try {
    const response = await fetch(`${API_CHAIN_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Oops something went wrong ❌');
  }
}

export const fetchSpecies = async (id) => {
  try {
    const response = await fetch(`${API_SPECIES_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Oops something went wrong ❌');
  }

}


export const fetchTypes = async () => {
  try {
    const response = await fetch(`${API_TYPES_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Oops something went wrong ❌');
  }
}


export const fetchPokemonsByType = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Oops something went wrong ❌');
  }
}


