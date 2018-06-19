"use strict";


export default class Component{

    constructor( options ){

        this._element = options.element;

    }

    show(){
        this._element.classList.remove('js-hidden');
    }

    hide(){
        this._element.classList.add('js-hidden');
    }

}