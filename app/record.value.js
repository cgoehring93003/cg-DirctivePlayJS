

(function () {
    'use strict';

    myApp.value('RecordModel', RecordModel);

    function RecordModel() {

        this.recno  = -1;

        this.firstName = '';
        this.lastname = '';
        this.address = '';      
        this.city = ''; 
        this.state = ''; 
        this.zip = '';        
   }


    RecordModel.prototype = {
        toJson: function () {
            var buffer = {};

            buffer.recno  = this.recno;
            buffer.firstName = this.firstName;
            buffer.lastname = this.lastname;
            buffer.address = this.address;   
            buffer.city = this.city;  
            buffer.state = this.state;
            buffer.zip = this.zip;

            return buffer;
        },
        toObject: function (data) {
            this.recno = data.recno;
            this.firstName = data.firstName;
            this.lastname = data.lastname;
            this.address = data.address;      
            this.city = data.city;        
            this.state = data.state;
            this.zip = data.zip;            

            return this;
        }
        
    }
})();