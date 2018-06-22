"use strict";

import template from './template.hbs';

import Component from '../component/component';

export default class PhoneViewer extends Component{

    constructor( options ){
        super(options);
    }//constructor

    setPhone( phone ){

        this._phone = phone;
        this._render();

    }//setPhone

    _render(){

        this._element.innerHTML = template({
            'phone': this._phone
        });

        this.on('click' , this._goBack.bind(this) , '[data-element="button-back"]' );
        this.on('click' , this._addPhoneToBasket.bind(this) , '[data-element="button-add-basket"]' );
        this.on('click' , this._changeThumbnail.bind(this) , '[data-element="phone-photo"]' );

    }//_render

    _goBack( ){

        this._phone = null;

        let backEvent = new CustomEvent('moveBack');
        this._element.dispatchEvent(backEvent);

    }//_goBack

    _addPhoneToBasket(  ){

        let addPhoneEvent = new CustomEvent('addPhoneToBasket',{
            detail: this._phone,
            bubbles: true
        });

        this._element.dispatchEvent(addPhoneEvent);

    }

    _changeThumbnail( event ){

        let src = event.target.getAttribute('src');
        let thumbnail = this._element.querySelector('[data-element="phone-thumbnail"]');
        thumbnail.setAttribute('src' , src);

    }

}