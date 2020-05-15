class DOMNodeCollection {
    constructor(arrayHtml) {
        this.arrayHtml = arrayHtml;

    }

    html(str){
        if (str !== undefined){
            for (let i = 0; i < this.arrayHtml.length; i++){
                this.arrayHtml[i].innerHTML = str;
            }
        } else {
            return this.arrayHtml[0].innerHTML;
        }
    }
    
    empty(){
        for (let i = 0; i < this.arrayHtml.length; i++){
            this.arrayHtml[i].innerHTML = "";
        }
    }

    append(child){
        let string = "";

        if (child instanceof DOMNodeCollection) {
            for (let i = 0; i < child.length; i++){
                string += child[i].outerHTML;
            }
        } else if (child instanceof HTMLElement) {
            string += child.outerHTML;
        } else { //string
            string = child;
        }

        for (let i = 0; i < this.arrayHtml.length; i++){
            this.arrayHtml[i].innerHTML += string; 
        }

    };


    attr(key,val) {
        if (val !== undefined){
            for (let i = 0; i < this.arrayHtml.length; i++) {
                this.arrayHtml[i].setAttribute(key, val);
            }
        } else {
            return this.arrayHtml[0].getAttribute(key);
        }
    }


    addClass(str) {
        for (let i = 0; i < this.arrayHtml.length; i++) {
            this.arrayHtml[i].className += (" " + str);
        }
    }

    removeClass(str) {
        for (let i = 0; i < this.arrayHtml.length; i++) {
            this.arrayHtml[i].classList.remove(str);
        }
    }

    children() {
        let childArray = [];
        for (let i = 0; i < this.arrayHtml.length; i++){
            let childNodes = this.arrayHtml[i].children;
            childArray = childArray.concat(Array.from(childNodes));
            // debugger
        }
        const domNodes = new DOMNodeCollection(childArray);
        return domNodes;
    }

    parent() {
        let parentArray = [];
        for (let i = 0; i < this.arrayHtml.length; i++){
            let parentnodes = this.arrayHtml[i].parentNode;
            if (!parentArray.includes(parentnodes)) {
                parentArray.push(parentnodes);
            }
        }
        const domNodes = new DOMNodeCollection(parentArray);
        return domNodes;
    }

    find(selector) {
        let found = [];
        for (let i = 0; i < this.arrayHtml.length; i++) {
            found = found.concat(Array.from(this.arrayHtml[i].querySelectorAll(selector)));
        }

        const domNodes = new DOMNodeCollection(found);
        return domNodes;
    }

    remove() {
        for (let i = 0; i < this.arrayHtml.length; i++) {
            this.arrayHtml[i].remove();
        }
    }

    on(action, cb){        
        for (let i = 0; i < this.arrayHtml.length; i++){
            let node = this.arrayHtml[i];
            node.callbacks = node.callbacks || {};
            node.callbacks[action] = cb;
            node.addEventListener(action, cb);
        }
    }


    off(action){
        for (let i = 0; i < this.arrayHtml.length; i++){
            let node = this.arrayHtml[i];
            node.removeEventListener(action, node.callbacks[action]);
            delete node.callbacks[action];
        }
    }


}


// node.callbacks = node.callbacks || {}

// node.callbacks[action].push(cb)

// node.callbacks[action].forEach( (cb) => node.removeEventListener(action, cb))



module.exports = DOMNodeCollection;