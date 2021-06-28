import countries from '../data/countryData.js';
import states from '../data/stateData.js'
import errorMessages from '../data/errorMessages.js'
import functions from '../data/functionData.js'
export default {
  data() {
    return {
      user: {
        salutation: null,
        firstName: '',
        lastName: '',
        email: null,
        companyUniversity: '',
        functionName: null,
        industry: null,
        country: null,
        state: null,
        phoneNumber:null,
        zipcode:null,
        confirm: false,
        confirmSubscribe: false
      },
      emailConfirm: null,
      companyUniversityValidity: 'pending',
      firstNameValidity: 'pending',
      lastNameValidity: 'pending',
      emailValidity: 'pending',
      emailConfirmValidity: 'pending',
      countryValidity:'pending',
      zipCodeValidity: 'pending',
      TermsValidity: 'pending',
      industryValidity:'pending',
      functionValidity:'pending',
      phoneValidity:'pending',
      termValidity:'pending',
      countries : countries,
      country: null,
      states: states,
      state: null,
      functions:functions,
      emailReg:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      zipCodeReg:/(^[0-9A-Za-z\s-]+$)/,
      phoneReg:/(^[0-9\s()-./+]{0,25}$)/,
      message: "",
      errorMessages:errorMessages,
      errorMessage:[]
    };
  },
  computed:{
    isDisabled:function(){
      if(this.companyUniversityValidity == 'invalid' || this.firstNameValidity == 'invalid'||this.lastNameValidity == 'invalid'|| this.emailValidity == 'invalid' || this.emailConfirmValidity == 'invalid' ||  this.countryValidity == 'invalid'|| this.countryValidity == 'invalid'||   this.zipCodeValidity == 'invalid'|| this.TermsValidity== 'invalid' || this.industryValidity == 'invalid'|| this.functionValidity == 'invalid'|| this.phoneValidity== 'invalid' || this.termValidity== 'invalid'){
        return true;
      }else {
        return false;
      }
    }

  },
  watch: {
    // 'user.confirm'(value){
    //   console.log(value);
    //    if (value == null||!value)
    //   {
    //     this.errorMessage['TermsOfUse'] = 'Please enter a value';
    //     this.termValidity = 'invalid';
    //     console.log("termValidity"+this.termValidity+this.errorMessage['TermsOfUse'] + errorMessages['TermsOfUse'].formatMessage);
    //   } 
    //   else{
    //     this.termValidity = 'valid';
    //     this.errorMessage['TermsOfUse'] ='';
    //   }
    //    },
    
  },
  methods: {
    submitForm() {
      console.log('Registered!!!');      
      console.log('JSON:' + JSON.stringify(this.user));
      //const { text } = fetch("/api/FirstFunction/twinkle").json();
      //this.message = text;
      // ----- GET API -----
     /*
      fetch("/api/FirstFunction?name=twinkle",
      {"method":"GET",
      "headers": {
        "Access-Control-Allow-Origin": "no-cors"
      }
    })
    .then(response => {
      if(response.ok){
      return response.json()
      }else{
        alert("Server returned " + response.status + " : " + response.statusText);
      }
    })
    .then(response => {
      console.log(response);
      this.message = response.body; 
    })
    .catch(err => {
      console.log(err);
    });
    */
    // ---- POST API
    fetch(
      "/api/RegisterUser/",
      {
        "method": "POST",
        "body": JSON.stringify(this.user)
      }
    )
    .then(response => {
      if(response.ok){
      return response.json()
      }else{
        alert("Server returned " + response.status + " : " + response.statusText);
      }
    })
    .then(response => {
      console.log("POST RESPONSE"+JSON.stringify(response));
      console.log("POST RESPONSE"+response.body);
    })
    .catch(err => {
      console.log(err);
    });

    
    },   
    updateState(){
      this.user.state = this.state.stateName;
    } ,
    updatePhone() {
            this.user.phoneNumber = this.country.phoneISD;
            this.user.country = this.country.countryName;
    },

    // ---------------------------- VALIDATIONS -----------------------------
    validateAllFeilds(){
      this.validateFirstName();
      this.validateLastName();
      this.validateEmail();
      this.validateEmailConfirm();
      this.validateCompany();
      this.validateCountry();
      this.validateZipcode();
      this.validateFunction();
      this.validateIndustry();
      this.validatePhone();
      this.validateTermsOfUse();
      if(this.companyUniversityValidity == 'invalid' || this.firstNameValidity == 'invalid'||this.lastNameValidity == 'invalid'|| this.emailValidity == 'invalid' || this.emailConfirmValidity == 'invalid' ||  this.countryValidity == 'invalid'|| this.countryValidity == 'invalid'||   this.zipCodeValidity == 'invalid'|| this.TermsValidity== 'invalid' || this.industryValidity == 'invalid'|| this.functionValidity == 'invalid'|| this.phoneValidity== 'invalid' || this.termValidity== 'invalid'){
        //return false;
      }else {
        this.submitForm();
      }

    },
    validateFirstName() { 
      //console.log(this.user.firstName.length);     
      if(this.user.firstName == null || this.user.firstName == ''){
       this.errorMessage['firstName'] = errorMessages['firstName'].RequiredMessage;
       this.firstNameValidity = 'invalid';
     }
      else if(this.user.firstName.length>60){        
        this.firstNameValidity = 'invalid';
        this.errorMessage['firstName'] = errorMessages['firstName'].lengthMessage;
      }
      else {        
        this.firstNameValidity = 'valid';
        this.errorMessage['firstName']='';
      }
    },
    validateLastName() { 
      //console.log(this.user.lastName.length);  
      if(this.user.lastName == null || this.user.lastName == ''){
       this.errorMessage['lastName'] = errorMessages['lastName'].RequiredMessage;
       this.lastNameValidity = 'invalid';
     }   
      else if(this.user.lastName.length>60){        
        this.lastNameValidity = 'invalid';
        this.errorMessage['lastName'] = errorMessages['lastName'].lengthMessage;
      }
      else{        
        this.lastNameValidity = 'valid';
        this.errorMessage['lastName']='';
      }
    },
    validateEmail(){
     if(this.user.email == null || this.user.email == ''){
       this.errorMessage['email'] = errorMessages['email'].RequiredMessage;
       this.emailValidity = 'invalid';
     }
     else if (!this.emailReg.test(this.user.email))
      {
        this.errorMessage['email'] = errorMessages['email'].formatMessage;
        this.emailValidity = 'invalid';
      } else if(this.user.email.length>100){
        this.errorMessage['email'] = errorMessages['email'].lengthMessage;
        this.emailValidity = 'invalid';
      } 
      else{
        this.emailValidity = 'valid';
        this.errorMessage['email'] = '';
      }
    },
    validateEmailConfirm(){

     if (!this.emailReg.test(this.emailConfirm))
      {
        this.errorMessage['emailConfirmation'] = errorMessages['emailConfirmation'].formatMessage;
        this.emailConfirmValidity = 'invalid';
      } else if(this.user.email != this.emailConfirm){
        this.errorMessage['emailConfirmation'] = errorMessages['emailConfirmation'].confirmMessage;
        this.emailConfirmValidity = 'invalid';
      } 
      else{
        this.emailConfirmValidity = 'valid';
        this.errorMessage['emailConfirmation'] ='';
      }
    },
    validateCompany(){
     if(this.user.companyUniversity == null || this.user.companyUniversity == ''){
       this.errorMessage['company'] = errorMessages['company'].RequiredMessage;
       this.companyUniversityValidity = 'invalid';
     }else if(this.user.companyUniversity.length>100){
        this.errorMessage['company'] = errorMessages['company'].lengthMessage;
        this.companyUniversityValidity = 'invalid';
      } 
      else{
        this.companyUniversityValidity = 'valid';
        this.errorMessage['company'] ='';
      }
    },
    validateCountry(){
     if(this.user.country == null || this.user.country == ''){
       this.errorMessage['country'] = errorMessages['country'].RequiredMessage;
       this.countryValidity = 'invalid';
     }
      else{
        this.countryValidity = 'valid';
        this.errorMessage['country'] ='';
      }
    },
    validateZipcode(){
     if(this.user.zipcode == null || this.user.zipcode == ''){
       this.errorMessage['ZipCode'] = errorMessages['ZipCode'].RequiredMessage;
       this.zipCodeValidity = 'invalid';
     }
     else if (!this.zipCodeReg.test(this.user.zipcode))
      {
        this.errorMessage['ZipCode'] = errorMessages['ZipCode'].formatMessage;
        this.zipCodeValidity = 'invalid';
      } else if(this.user.zipcode.length>40){
        this.errorMessage['ZipCode'] = errorMessages['ZipCode'].lengthMessage;
        this.zipCodeValidity = 'invalid';
      } 
      else{
        this.zipCodeValidity = 'valid';
        this.errorMessage['ZipCode'] = '';
      }
    },
    validateFunction(){
      console.log(this.user.functionName)
     if(this.user.functionName == null || this.user.functionName == ''){
       this.errorMessage['function'] = errorMessages['function'].RequiredMessage;
       this.functionValidity = 'invalid';
     } 
      else{
        this.functionValidity = 'valid';
        this.errorMessage['function'] ='';
      }
    },
    validateIndustry(){
     if(this.user.industry == null || this.user.industry == ''){
       this.errorMessage['industry'] = errorMessages['industry'].RequiredMessage;
       this.industryValidity = 'invalid';
     } 
      else{
        this.industryValidity = 'valid';
        this.errorMessage['function'] ='';
      }
    },
    validatePhone(){
     if (this.user.phoneNumber != null && !this.phoneReg.test(this.user.phoneNumber))
      {
        this.errorMessage['phone'] = errorMessages['phone'].formatMessage;
        this.phoneValidity = 'invalid';
      } 
      else{
        this.phoneValidity = 'valid';
        this.errorMessage['phone'] ='';
      }
    },
    validateTermsOfUse(){
      console.log(this.user.confirm);
     if (this.user.confirm == null||!this.user.confirm)
      {
        this.errorMessage['TermsOfUse'] = errorMessages['TermsOfUse'].RequiredMessage;
        this.termValidity = 'invalid';
      } 
      else{
        this.termValidity = 'valid';
        this.errorMessage['TermsOfUse'] ='';
      }
    }
  },
};