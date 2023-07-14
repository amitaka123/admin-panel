import {writable} from 'svelte/store';
import {Auth} from '$lib/utils/classes';
// import { browser } from '$app/env';

let initialState=new Auth(false,"-");
// if(browser)
// {
    if(localStorage && localStorage.getItem("authentication"))
    {
        let authObject = JSON.parse(localStorage.getItem("authentication"));
         initialState= new Auth(authObject.authenticated,authObject.token,authObject.role);
         
    }
// }
// let initialState = JSON.parse( && localStorage.getItem("authentication"))==null?new Auth(false,"-"):new Auth(JSON.parse(localStorage.getItem("authentication")).authenticated,JSON.parse(localStorage.getItem("authentication")).token);
export const authStore = writable(initialState);

authStore.subscribe(val => {
    // if(browser)
    localStorage.setItem("authentication",JSON.stringify(val));
});