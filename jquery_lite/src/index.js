const DOMNodeCollection = require('./dom_node_collection.js');



window.$1 = (arg) => {

    if (typeof arg === 'string') {
        const nodes = document.querySelectorAll(arg);
        const arrayNodes = Array.from(nodes);
        const domCollection = new DOMNodeCollection(arrayNodes);
        return domCollection;
    } else if (arg instanceof HTMLElement){
        const array = [];
        array.push(arg);
        const domCollection = new DOMNodeCollection(array);
        return domCollection;
    } else if (arg instanceof Function){
        window.$1.queue.push(arg);
    }



}

window.$1.queue = [];

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < window.$1.queue.length; i++) {
        window.$1.queue[i]();
    }
})

window.$1.extend = (...args) => {
    const superObj = args[0];
    for(let i = 1; i < args.length; i++) {
        let obj = args[i];
        for(key in obj) { superObj[key] = obj[key]};
    }
    return superObj;
}

window.$1.ajax = (options) => {
    let defaults = {
        method: 'GET',
        url: '/',
        success: () => {},
        errors: () => {},//(errors) => {console.log(errors)},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        data: '',
    }
    window.$1.extend(defaults, options);
    

    const xhr = new XMLHttpRequest();
    xhr.open(defaults.method, defaults.url);
    xhr.onload = function () {
        defaults.success(JSON.parse(xhr.response));
        console.log("success")
    }

    xhr.onerror = function () {   
        console.log("error")
        defaults.errors(JSON.parse(xhr.status));
    }

    xhr.setRequestHeader("Content-Type", defaults.contentType);

    xhr.send(defaults.data);
}


// request skel
// const xhr = new XMLHttpRequest();

// // step 2 - specify path and verb
// xhr.open('POST', 'api/path/to/resource');

// // step 3 - register a callback
// xhr.onload = function () {
//     console.log(xhr.status) // for status info
//     console.log(xhr.responseType) //the type of data that was returned
//     console.log(xhr.response) //the actual response. For JSON api calls, this will be a JSON string
// }

// // step 4 - send off the request with optional data
// const optionalData = { name: "User1", password: "123456" };
// xhr.send(optionalData);



// $1(() => alert("the document is ready"));
// $1(() => alert("ANOTHER ALERT"));
// $1(() => alert("IS IT WORKING?"));