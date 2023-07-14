

function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            if(obj[p]!="-"){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        let prefix = "";
    if(str.length>0)
    {
        prefix="?";
    }
    return prefix+(str.join("&"));
    }


export default {serialize};