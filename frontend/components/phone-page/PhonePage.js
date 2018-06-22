"use strict";

import PhoneCatalogue from '../phone-catalogue/PhoneCatalogue';
import HttpService from '../services/http.service';
import PhoneViewer from '../phone-viewer/PhoneViewer';
import Component from "../component/component";
import ShoppingCart from "../shopping-cart/ShoppingCart";
import Filter from '../filter/Filter';
import Sorter from '../sorter/Sorter';

export default class PhonePage extends Component{

    constructor( options ){


        super( options );

        this._phoneViewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]'),
        });

        this._shoppingCart = new ShoppingCart({
            element: document.querySelector('[data-component="shopping-cart"]'),
        });


        this._filter = new Filter({
            element: document.querySelector('[data-component="phone-filter"]'),
        });

        this._sorter = new Sorter({
            element: document.querySelector('[data-component="phone-sorter"]'),
        });

        this._load();


    }//constructor

    async onPhoneSelected( event ){


        let phoneID = event.detail.phoneID;

        let phone = await HttpService.send(`public/phones/${phoneID}.json`);

        this._phoneViewer.setPhone(phone);
        this._phoneViewer.show();
        this._catalogue.hide();


    }//onPhoneSelected

    onButtonBack(){

        this._phoneViewer.hide();
        this._catalogue.show();

    }//onButtonBack

    onPhoneAdded( event ){

        this._shoppingCart.addPhone( event.detail );

    }

    onPhoneRemoveFromBasket( event ){
        this._shoppingCart.removePhone( event.detail );
    }

    async onPhoneFilter( event ){


        let phones = await HttpService.send('public/phones/phones.json');

        let userInput = event.detail.toLowerCase();

        let result = phones.filter( ( phone )=>{

            return phone.name.toLowerCase().indexOf( userInput ) !== -1;

        } );

        this._catalogue.setPhones(  result );

    }

    async onSortValueChanged( event ){

        let value = event.detail;
        let phones = this._catalogue.getPhones();

        switch( value ){

            case 'alpha': {

                let alphaSortResult = phones.sort( ( left , right )=>{

                    if( left.name > right.name ){
                        return 1;
                    }//if
                    else if( left.name === right.name ){
                        return 0;
                    }//else if

                    return -1;

                } );

                this._catalogue.setPhones( alphaSortResult );

            } break;
            case 'newest': {

                let newestSortResult = phones.sort( ( left , right )=>{

                    if( +left.age > +right.age ){
                        return 1;
                    }//if
                    else if( +left.age === +right.age ){
                        return 0;
                    }//else if

                    return -1;

                } );

                this._catalogue.setPhones( newestSortResult );

            } break;
            case '-1': {

                let phones = await HttpService.send('public/phones/phones.json');
                this._catalogue.setPhones( phones );

            } break;

        }//switch

    }//onSortValueChanged

    async _load(){


        try{

            let phones = await  HttpService.send( 'public/phones/phones.json');
            this._catalogue = new PhoneCatalogue({
                element: document.querySelector('[data-component="phone-catalogue"]'),
                phones: phones,
            });

            this.on('phoneSelected' , this.onPhoneSelected.bind(this) , '[data-component="phone-catalogue"]');
            this.on('moveBack' , this.onButtonBack.bind(this) , '[data-component="phone-viewer"]');
            this.on('addPhoneToBasket' , this.onPhoneAdded.bind(this) , '[data-component="phone-viewer"]');
            this.on('removePhoneFromBasket' , this.onPhoneRemoveFromBasket.bind(this) , '[data-component="shopping-cart"]');
            this.on('filterEvent' , this.onPhoneFilter.bind(this) , '[data-component="phone-filter"]');
            this.on('sortValueChanged' , this.onSortValueChanged.bind(this) , '[data-component="phone-sorter"]');

        }//try
        catch(ex){
            console.log('HTTP SERVICE ERROR: ' , ex);
        }//catch

    }

}