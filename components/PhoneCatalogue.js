"use strict";

class PhoneCatalogue{

    constructor( options ){

        this._element = options.element;

        this._phones = options.phones;

        this._render();

    }

    _render(){

        let compiled = _.template( document.querySelector('#template').innerHTML );

        this._element.innerHTML = compiled({
            'phones': this._phones
        });

    }//_render

}
