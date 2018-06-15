"use strict";

<<<<<<< HEAD:frontend/components/phone-catalogue/PhoneCatalogue.js
import template from './template.hbs';
//var template = require('./template.hbs');

=======
>>>>>>> 33d80dc42f74d2b44b8987dc9b7cd3bfc1f0683c:frontend/components/phone-catalogue/PhoneCatalogue.js
export default class PhoneCatalogue{

    constructor( options ){

        this._element = options.element;

        this._phones = options.phones;

        this._render();

    }

    _render(){

        this._element.innerHTML = template({
            'phonesArray': this._phones
        });

    }//_render

}
