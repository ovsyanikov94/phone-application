"use strict";

import Component from '../component/component';
import template from './template.hbs';


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

                let currentPhone = this._phones[i];

                if(phone.name === currentPhone.name){
                    currentPhone.amount++;
                    break;
                }//if

            }//for i

        }//else

        this._render();

    }//addPhone

    removePhone( id ){

        for ( let i = 0 ; i <  this._phones.length ; i++){

            let phone = this._phones[i];

            if(phone.id === id){

                this._phones.splice(i , 1);
                this._render();
                break;

            }//if

        }//for i



    }//removePhone

    _onRemovePhoneFromBasket( event ){

        let removeEvent = new CustomEvent( 'removePhoneFromBasket' , {
            detail: event.target.dataset.phoneId
        });

        this._element.dispatchEvent(removeEvent);

    }

    getPhones(){
        return this._phones;
    }//getPhones

    _render(){

        this._element.innerHTML = template({
            'title': this._title,
            'phones': this._phones
        });

        this.on('click' , this._onRemovePhoneFromBasket.bind(this) , '[data-element="delete-phone"]');

    }//_render

}