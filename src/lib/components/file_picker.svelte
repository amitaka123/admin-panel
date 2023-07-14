
<script>
    // import { userInfo } from "os";
        import {onMount} from 'svelte';
        import {Token} from '../_utils/dynamic_store.js';
        import {ApiUrl} from '../_utils/static_store.js';
        import { get } from 'svelte/store';
        import Files from './lists/files.svelte';
        var files = null;

    
        export let selectedFiles=[];
        export let picker=true;

    
        let body = {};
        var loginPath=get(ApiUrl);
    
        function next(){
            body.skip+=body.limit;
            getFiles(body);
        }
    
        function previous(){
            body.skip-=body.limit;
            if(body.skip<0)
                body.skip=0;
                getFiles(body);
        }
        
        onMount(async ()=>{
            console.log("mounted");
            // localStorage.setItem("token","some value");
            
            var token = localStorage.getItem("token");
            if(!token)
            {
                console.log("yes");
                location.href="/login";
            }
            Token.set(token);
            
    
            
            body.skip=0;
            body.limit=10;
    
            getFiles(body);
            
        });
    
        const forceUpdate = async (_) => {};
    
        async function getFiles(body=null,fresh=false)
        {
            var res;
            var token = localStorage.getItem("token");
            
            if(body)
            {
                if(fresh)
                {
    
                    body.skip=0;
                }
                res = await fetch(loginPath+'/files/?'+serialize(body),{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
            }
            else
            {
                res = await fetch(loginPath+'/files/',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
            }
             
            if(res.status==200){
                try{
                        let response= await res.text();
                        console.log(response);
                        response= await JSON.parse(response);
                        if(response.status == "success")
                        {
                            console.log("successfully grabbed files");
                            files = response.data;
                            files=files;
                        }
                        
                        
                }
                catch(e){
                    console.log("caught");
                    
                    console.log(e);
                }
                finally{
                    
                }
            }
            else
            {
                console.log(await res.text());	
            }
        }
    
        function serialize(obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    if(obj[p]!="-"){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                }
            return str.join("&");
            }
    
        
    </script>
    
    <style>
        *{
            color:rgb(51, 51, 51);
        }
        /*
            By default, CSS is locally scoped to the component,
            and any unused styles are dead-code-eliminated.
            In this page, Svelte can't know which elements are
            going to appear inside the {{{post.html}}} block,
            so we have to use the :global(...) modifier to target
            all elements inside .content
        */
        .content :global(h2) {
            font-size: 1.4em;
            font-weight: 500;
        }
    
        .content :global(pre) {
            background-color: #dfc502;
            box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
            padding: 0.5em;
            border-radius: 2px;
            overflow-x: auto;
        }
    
        .content :global(pre) :global(code) {
            background-color: transparent;
            padding: 0;
        }
    
        .content :global(ul) {
            line-height: 1.5;
        }
    
        .content :global(li) {
            margin: 0 0 0.5em 0;
        }
    
        .container{
            
            width:100%;
            /* border:1px solid rgb(140, 140, 140); */
            border-radius: 5px;
            margin:10px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: left;
    
            /* background: linear-gradient(45deg,rgb(134, 60, 253),var(--template-color)); */
    
        }
        img{
            display:block;
            width:150px;
        }
        .certificate{
            font-size: 120px;
            font-family: 'MonteCarlo', cursive;
        }
        .organization{
            color:black;
            font-size: 80px;
            font-family: 'MonteCarlo', cursive;
        }
        .cont{
            font-family: 'MonteCarlo', cursive;
            font-size: 30px;
        }
        .straight{
            font-family: 'Merriweather', serif;
    
            /* font-family: 'MonteCarlo', cursive; */
        }
        .flex{
            margin-top: 30px;
            display:flex;
            align-items: stretch;
        }
        .flexit{
            flex:1;
            padding:20px;
        }
        p{
            /* width:100%; */
            margin:0;
            text-align: left;
        }
        h1{
            margin:00px;
        }
        div{
            align-self: left;
            justify-self: left;
        }
        .abs{
            position:absolute;
            top:120px;
            right:130px;
        }
        a{
            text-decoration: none;;
        }
    
        h2,h3{
            font-size:250%;
        }
    
        button{
            display:inline;
            width:200px;
        }
    </style>
    
    <svelte:head>
        <title>Chapter</title>
    </svelte:head>
    
    
    <div class="container w3-border w3-padding  " style="--template-color:red">
        {#if picker}
            <h3>Picker</h3>
        {/if}
        
       
       
      {#if files}
        <h3>Files({body.skip}-{body.skip+body.limit})</h3>
        <div class="flex">
            <p class="w3-button w3-border w3-round w3-margin" on:click={previous}>Previous</p>
            <p class="w3-button w3-border w3-round w3-margin" on:click={next}>Next</p>
            
           </div>
        
            <div class="w3-padding w3-margin">
            <!-- {console.log(selectedOptions)} -->
            {#await forceUpdate(files) then _}
                <Files picker={true} bind:selectedFiles={selectedFiles} files={files} />
            {/await}
    
            </div>
        {:else}
        <p>No Files found!</p>
        {/if}
    </div>
    
    