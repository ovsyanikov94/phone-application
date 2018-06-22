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

    on(eventName , callback , selector ){

        if(selector){

            let elements = this._element.querySelectorAll( selector );

            if(elements){
                elements.forEach( ( elem )=>{
                    elem.addEventListener( eventName , callback );
                } );
            }//if

        }//if
        else{
            this._element.addEventListener( eventName , callback );
        }//else

    }//on

}