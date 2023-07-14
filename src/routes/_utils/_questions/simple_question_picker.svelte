
<script>
    // import { userInfo } from "os";
        import {onMount} from 'svelte';
        import {Token} from '../../_utils/dynamic_store.js';
        import {ApiUrl} from '../../_utils/static_store.js';
        import { get } from 'svelte/store';
        import Questions from '../../../components/lists/questions.svelte';
        var chapters = null;
        var topics = null;
        var subtopics = null;

        export let subjects=[];
        export let streams=[];
    
        export let selectedQuestions=[];
        export let picker=true;
        export let optional = false;
        export let eventFunction= () => {};
    
        export let limit=50;
        
        export let q_type='scq';
        export let subject='-';
    
        // async function handleChange(){
        //     eventFunction();
        // }
    
        let questions;
        let categories;
    
        let body = {};
        var loginPath=get(ApiUrl);
    
        function next(){
            body.skip+=body.limit;
            getQuestions(body);
        }
    
        function previous(){
            body.skip-=body.limit;
            if(body.skip<0)
                body.skip=0;
            getQuestions(body);
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
            
    
            body.chapter="-";
            body.topic="-";
            body.question_type=q_type;
            body.subtopic="-";
            body.subject=subject;
            body.class_num="-";
            body.category="-";
            body.stream="-";
            body.skip=0;
            body.limit=limit;
    
            getQuestions(body);
            
        });
    
        const forceUpdate = async (_) => {};
    
        async function getQuestions(body=null,fresh=false)
        {
            var res;
            var token = localStorage.getItem("token");
            
            if(body)
            {
                console.log("fresh: "+fresh);
                if(fresh)
                {
    
                    body.skip=0;
                }
                res = await fetch(loginPath+'/panel/questions?'+serialize(body),{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
            }
            else
            {
                res = await fetch(loginPath+'/panel/questions',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
            }
             
            if(res.status==200){
                try{
                        let response= await res.text();
                        console.log(response);
                        response= await JSON.parse(response);
                        if(response.status == "success")
                        {
                            console.log("successfully grabbed questions");
                            questions = response.data;
                            questions=questions;
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
            Picker
        {/if}
        <h4>Filters</h4>
       <form  on:submit|preventDefault={getQuestions(body,true)}>
        <div>
            <!-- <label for="question_correct"> Class </label>
            <select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={body.class_number}>
                <option value="-">Select Class</option>
                <option value="7">7th Class</option>
                <option  value="8">8th Class</option>
                <option value="9">9th Class</option>
                <option value="10">10th Class</option>
                <option  value="11">11th Class</option>
                <option value="12">12th Class</option>
                <option value="13">Passout</option>
            </select> -->

            <label for="question_difficulty">Question Type</label>
		<select id="question_difficulty" class="w3-input w3-border w3-round w3-margin" bind:value={body.question_type}>
			<option  value="-">Select Question Type</option>
			<option  value="scq">Single Choice Question</option>
            <option value="mcq">Multiple Choice Question</option>
			<option  value="integer">Integer</option>
			<option value="fill_in_blanks">Fill in the blanks</option>
		</select>
    
            {#if subjects}
            <p>Select Subjects</p><br>
            <select class="w3-input w3-border w3-round w3-margin" bind:value={body.subject}>
                <option value="-">Select Subject</option>
                {#each subjects as subject}
                <!-- <label>{}</label> -->
                    <option value={subject._id}>{subject.name.toUpperCase()}</option>
                    <!-- <input class="w3-checkbox w3-input" type="checkbox"  bind:group={body.streams} /> -->
                {/each}
            </select>
            {/if}


            <label for="question_correct"> Stream </label>
            <select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={body.stream}>
                <option value="-">Select a Stream</option>
                {#if streams}
                    {#each streams as stream}
                        <option  value="{stream._id}">{stream.name}</option>
                    {/each}
                {/if}
            </select>
    
            <!-- {#if chapters  && chapters.length>0}
                <label for="question_topic">Chapter</label>
                <select id="question_topic" class="w3-input w3-border w3-round w3-margin" bind:value={body.chapter} on:change={getTopics(body.chapter)}>
                    <option  value="-">Chapter(*)</option>
                    
                    {#each chapters as chapter}
                        <option  value="{chapter._id}">{chapter.name}</option>
                    {/each}
                </select>
                {#if topics && topics.length>0}
                <label for="question_topic">Topic</label>
                <select id="question_topic" class="w3-input w3-border w3-round w3-margin" bind:value={body.topic}>
                    <option  value="-">Topic(*)</option>
                    
                    {#each topics as topic}
                        <option  value="{topic._id}">{topic.name}</option>
                    {/each}
                </select>
                    {#if subtopics  && subtopics.length>0}
                    <label for="question_topic">SubTopic</label>
                    <select id="question_topic" class="w3-input w3-border w3-round w3-margin" bind:value={body.subtopic}>
                        <option  value="-">Subtopic(*)</option>
                        
                        {#each subtopics as subtopic}
                            <option  value="{subtopic._id}">{subtopic.name}</option>
                        {/each}
                    </select>
                    {/if}
                {/if}
            {/if} -->
    
            <label for="question_difficulty"> Difficulty</label>
            <select id="question_difficulty" class="w3-input w3-border w3-round w3-margin" bind:value={body.difficulty}>
                <option  value="-">Select Difficulty</option>
                <option  value="very-easy">Very Easy</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="vary-hard">Very-Hard</option>
            </select>

        </div>
    
        <input class="w3-button w3-round w3-border" type="submit" value="Apply filters" >
    
       </form>
       
      {#if questions}
        <h3>Questions({body.skip}-{body.skip+body.limit})</h3>
        <div class="flex">
            <p class="w3-button w3-border w3-round w3-margin" on:click={previous}>Previous</p>
            <p class="w3-button w3-border w3-round w3-margin" on:click={next}>Next</p>
        </div>
        <div class="w3-padding w3-margin">
            <!-- {console.log(selectedOptions)} -->
            {#await forceUpdate(questions) then _}
                <Questions {eventFunction} picker={true} bind:selectedQuestions={selectedQuestions} questions={questions} />
            {/await}
    
        </div>
        {:else}
            <p>No questions found!</p>
        {/if}
    </div>
    
    