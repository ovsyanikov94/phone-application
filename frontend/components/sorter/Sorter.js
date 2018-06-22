"use strict";
import template from './template.hbs';
import Component from '../component/component';

export default class Sorter extends Component{

    constructor( options ){

        super( options );
        this._render();

        this.on('change' , this._onSortSelectChange.bind(this) , '#sortSelect');

    }


    _onSortSelectChange( event ){


        let sortValueChanged = new CustomEvent('sortValueChanged', {
           detail:  event.target.value
        });

        this._element.dispatchEvent(sortValueChanged);

    }//_onSortSelectChange

    _render(){
        this._element.innerHTML = template();
    }//_render

}