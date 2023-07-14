/** @type {import('./$types.js').PageLoad} */
export function load({ params }) {
    // if (params.slug === 'hello-world') {
    //     return {
    //         title: 'Hello world!',
    //         content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
    //     };
    // }
    console.log(params);
    return {
      moduleId:params.slug
    };

    // throw error(404, 'Not found');
}