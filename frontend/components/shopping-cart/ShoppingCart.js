"use strict";

import Component from '../component/component';
import template from './template.hbs';

Array.prototype.myForeach = function (callback){

    for ( let index = 0 ; index < this.length ; index++  ){

        callback(this[index] , index , this);

    }//for i

};

export default class ShoppingCart extends Component{

    constructor( options ){

        super(options);
        this._title = options.title || 'Shopping cart';
        this._phones = [];

        this._render();

    }//constructor

    addPhone( phone ){

        let isHavePhone = this._phones.some( p => p.name === phone.name );

        if( !isHavePhone ){

            phone.amount = 1;
            this._phones.push(phone);

        }//if
        else{

            for ( let i = 0 ; i <  this._phones.length ; i++){

                let phone = this._phones[i];

                if(phone.name === name){
                    p.amount++;
                    break;
                }//if

            }//for i

        }//else

        this._render();

    }//addPhone

    removePhone( name ){

        for ( let i = 0 ; i <  this._phones.length ; i++){

            let phone = this._phones[i];

            if(phone.name === name){
                this._phones.splice(index , 1);
                break;
            }//if

        }//for i

        this._render();

    }//removePhone

    getPhones(){
        return this._phones;
    }//getPhones

    _render(){

        this._element.innerHTML = template({
            'title': this._title,
            'phones': this._phones
        });

    }//_render

}