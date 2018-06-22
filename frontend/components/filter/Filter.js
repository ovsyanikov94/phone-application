"use strict";

import template from './template.hbs';
import Component from '../component/component';

export default class Filter extends Component{

    constructor( options ){

        super( options );
        this._render();
        this._input = this._element.querySelector('#phoneName');
        this._input.addEventListener('input' , this._onKeyUp.bind(this));

    }//

    _onKeyUp(event){

        let filterEvent = new CustomEvent('filterEvent',{
            detail:  event.target.value
        });

        this._element.dispatchEvent(filterEvent);

    }

    _render(){
        this._element.innerHTML = template();
    }//

}