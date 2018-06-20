"use strict";

import PhoneCatalogue from '../phone-catalogue/PhoneCatalogue';
import HttpService from '../services/http.service';
import PhoneViewer from '../phone-viewer/PhoneViewer';
import Component from "../component/component";


export default class PhonePage extends Component{

    constructor( options ){

        super( options );

        this._phoneViewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]'),
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

    async _load(){


        try{

            let phones = await  HttpService.send( 'public/phones/phones.json');
            this._catalogue = new PhoneCatalogue({
                element: document.querySelector('[data-component="phone-catalogue"]'),
                phones: phones,
            });

            this.on('phoneSelected' , this.onPhoneSelected.bind(this) , '[data-component="phone-catalogue"]');
            this.on('moveBack' , this.onButtonBack.bind(this) , '[data-component="phone-viewer"]');

        }//try
        catch(ex){
            console.log('HTTP SERVICE ERROR: ' , ex);
        }//catch

    }

}