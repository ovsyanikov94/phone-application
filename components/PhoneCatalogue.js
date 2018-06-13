"use strict";

class PhoneCatalogue{

    constructor( options ){

        this._element = options.element;
        this._render();


    }

    _render(){

        this._element.innerHTML = `<ul class="phones"> 
                                        ${document.querySelector('#template').innerHTML}
                                   </ul>
                                   `

    }

}
