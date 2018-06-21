"use strict";

import PhoneCatalogue from '../phone-catalogue/PhoneCatalogue';
import HttpService from '../services/http.service';
import PhoneViewer from '../phone-viewer/PhoneViewer';
import Component from "../component/component";
import ShoppingCart from "../shopping-cart/ShoppingCart";


export default class PhonePage extends Component{

    constructor( options ){


        super( options );

        this._phoneViewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]'),
        });

        this._shoppingCart = new ShoppingCart({
            element: document.querySelector('[data-component="shopping-cart"]'),
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

    async _load(){


        try{

            let phones = await  HttpService.send( 'public/phones/phones.json');
            this._catalogue = new PhoneCatalogue({
                element: document.querySelector('[data-component="phone-catalogue"]'),
                phones: phones,
            });

            let phonesFromCookies = JSON.parse(document.cookie.split('=')[1]);
            console.log(phonesFromCookies);

            phones.forEach( p=> {

                phonesFromCookies.forEach( sub => {

                    if( sub.id === p.id ){

                        this._shoppingCart.addPhone({
                            'name': p.name,
                            'amount': sub.amount
                        });

                    }//if

                } );

            } );

            this.on('phoneSelected' , this.onPhoneSelected.bind(this) , '[data-component="phone-catalogue"]');
            this.on('moveBack' , this.onButtonBack.bind(this) , '[data-component="phone-viewer"]');
            this.on('addPhoneToBasket' , this.onPhoneAdded.bind(this) , '[data-component="phone-viewer"]');
            this.on('removePhoneFromBasket' , this.onPhoneRemoveFromBasket.bind(this) , '[data-component="shopping-cart"]');

        }//try
        catch(ex){
            console.log('HTTP SERVICE ERROR: ' , ex);
        }//catch

    }

}