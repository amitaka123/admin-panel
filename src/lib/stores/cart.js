import {writable} from 'svelte/store';


let initialState = {cart:[],error:false};
export let cartStore = writable(initialState);
