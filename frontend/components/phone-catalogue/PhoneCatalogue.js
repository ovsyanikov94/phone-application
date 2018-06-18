"use strict";

import template from './template.hbs';

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
