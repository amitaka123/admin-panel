let host="http://localhost:12000";
// let api_target = "https://206.189.139.76:16001";
let api_target = "http://localhost:8000";
// let api_target = "https://ts.grcls.in";


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  //console.log("done1",event.request.url);
  if (event.request.url.startsWith(host+'/api/user/authentication/')) {
    console.log("done");
    const myHeaders = new Headers();
    myHeaders.append("host", 'ts.grcls.in');
    const myInit = {
      method: 'GET',
      headers:myHeaders,
      mode:'cors'
    }
    
    event.headers.append("Host", 'ts.grcls.in');
    event.headers.append("host", 'ts.grcls.in');
    event.setHeaders({"asd": 'ts.grcls.in'});
    event.setHeaders({"hoffgasst": 'ts.grcls.in'});
    event.headers.asdasd = "asdasd";
    // console.log(event.headers);
    let r = {...event.request};
    r.headers.host = "ASdasd";
    let req=new Request(event.request.url.replace(host,api_target),r);
    req.setHeaders({"asd": 'ts.grcls.in'});
    req.setHeaders({"Host": 'ts.grcls.in'});
    // console.log("req.headers.host");

    // console.log(req.headers.host);

    // let response = await fetch(new Request(event.request.url.replace(host,api_target),myInit));
    // let response = await fetch(new Request(event.request.url.replace(host,api_target),event.request));
    let response = await fetch(req);

    let data = await response.json();
    // console.log(data);

    var tokbodyObj=data;
// 				// console.log(tokbodyObj);
    if(tokbodyObj.status=="success" && tokbodyObj.user && tokbodyObj.user.token)
    {
      console.log("PROXY: res> setting up xtoken"+tokbodyObj.user.token)

      return new Response(JSON.stringify(data),{status:200,headers:{'xtoken':tokbodyObj.user.token}});
    }

    return new Response(JSON.stringify(data));
    // event.request = await new Request(event.request.url.replace(host,"http://localhost:16009"),event.request);
  }

  if (event.request.url.startsWith(host+'/api') || event.request.url.startsWith(host+'/content/')) {
    console.log("relegating api to other server");
    
    let response = await fetch(new Request(event.request.url.replace(host,api_target),event.request));
    // console.log(response.headers.get("Content-Type"));
    if(response.headers.get("Content-Type") &&  response.headers.get("Content-Type").includes("image/"))
    {
      let data = await response.blob();
      return new Response(data,{status:200});

    }
    else{
      let data = await response.text();
    // console.log(data);

    // return new Response(response);
    return new Response(data,{status:200});
    }
    // event.request = await new Request(event.request.url.replace(host,"http://localhost:16009"),event.request);
  }
 
  const response = await resolve(event);
  console.log("yahan se");
  // console.log(response);
  return response;

}

