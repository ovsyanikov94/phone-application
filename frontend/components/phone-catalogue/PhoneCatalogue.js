"use strict";
import template from './template.hbs';
import Component from '../component/component';

export default class PhoneCatalogue extends Component{

    constructor( options ){

        super( options );
        this._phones = options.phones;

        this._render();

    }//constructor

    _render(){

        this._element.innerHTML = template({
            'phonesArray': this._phones
        });

    }//_render

}
