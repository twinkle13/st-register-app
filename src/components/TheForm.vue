<template>
<div class="st_form">
        <div class="st__title"> <h1 class="title">my.st.com account creation</h1>
         </div> 
         <div class="st-container">
         <h2 class="design-support-calculators margin-left-15">Your Profile</h2>
<div>{{ message }}</div>
  <form @submit.prevent="validateAllFeilds">
    <div class="row st-row">
      <div class="small-12 medium-2 large-2 columns">
      <label for="salutation" class="left inline">Salutation:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <select class="input columns" id="salutation" name="salutation" v-model="user.salutation" >
        <option value>Select one</option>
        <option value="Mr">Mr</option>
        <option value="Ms">Ms</option>
      </select>
      </div>
    </div>
    <div>
    <div class="row st-row" :class="{invalid: firstNameValidity === 'invalid'}">
      <div class="small-12 medium-2 large-2 columns">
      <label class="left inline" for="first-name">First name<span class="text-red">*</span></label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <input class="input columns" id="first-name" name="first-name" type="text" v-model.trim="user.firstName" @keyup="validateFirstName" />
      <small class="error" v-if="firstNameValidity === 'invalid'">{{errorMessage['firstName']}}</small>
      </div>
    </div>
    </div>
    <div class="row st-row" :class="{invalid: lastNameValidity === 'invalid'}">
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="last-name">Last name<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <input class="input columns" id="last-name" name="last-name" type="text"  v-model.trim="user.lastName" @keyup="validateLastName" />
      <small class="error" v-if="lastNameValidity === 'invalid'">{{errorMessage['lastName']}}</small>

      </div>
    
    </div>
    <div class="row st-row" :class="{invalid: emailValidity === 'invalid'}">
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="email">Email<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <input class="input columns" id="email" name="email" type="text"  v-model.trim="user.email" @blur="validateEmail" />
      <small class="error" v-if="emailValidity === 'invalid'">{{errorMessage['email']}}</small>

      </div>
      
    </div>
    <div class="row st-row" :class="{invalid: emailConfirmValidity === 'invalid'}">
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="email-confirm">Email Confirmation<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <input class="input columns" id="email-confirm" name="email-confirm" type="text"  v-model.trim="emailConfirm" @blur="validateEmailConfirm" />
      <small class="error" v-if="emailConfirmValidity === 'invalid'">{{errorMessage['emailConfirmation']}}</small>

      </div>
    </div>
    
    <div class="row st-row">
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="function">Function<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <select class="input columns" id="function" name="function"  @blur="validateFunction" v-model="user.functionName">
        <option value="Analyst">Analyst</option>
        <option value="Consultant">Consultant</option>
        <option value="Engineer">Engineer</option>
      </select>
      <small class="error" v-if="functionValidity === 'invalid'">{{errorMessage['function']}}</small>

      </div>
    </div>
  <div class="row st-row" :class="{invalid: companyUniversityValidity === 'invalid'}">
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="company-university">Company/University<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <input class="input columns" id="company-university" name="company-university" type="text"  v-model.trim="user.companyUniversity" @blur="validateCompany" />
      <small class="error" v-if="companyUniversityValidity === 'invalid'">{{errorMessage['company']}}</small>
      </div>
    </div>
    <div class="row st-row">
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="industry">Industry<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <select class="input columns" id="industry" name="industry"  @blur="validateIndustry" v-model="user.industry">
        <option value="ADAS">ADAS</option>
        <option value="Audio and Video">Audio and Video</option>
        <option value="Data Center">Data Center</option>
      </select>
      <small class="error" v-if="industryValidity === 'invalid'">{{errorMessage['industry']}}</small>
      </div>
    </div>

    <div class="row st-row">
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="country">Country/Region<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <select class="input columns" id="country" name="country"  v-model="country" @change="updatePhone" @blur="validateCountry">
        <option :value="null" disabled selected>Select Country</option>
         <option v-for="country in countries" :key="country.countryId" :value="{countryId: country.countryId,countryName:country.countryName, phoneISD: country.countryPhoneISD}">{{country.countryName}}</option>
      </select>
      <small class="error" v-if="countryValidity === 'invalid'">{{errorMessage['industry']}}</small>

      </div>
    </div>
    <div class="row st-row" v-if="country">
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="state">State/Province<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <select class="input columns" id="state" name="state" v-model="state" @change="updateState">
        <option :value="null" disabled selected>Select State</option>
         <option v-for="state in states[country.countryId]" :key="state.stateId" :value="{stateId:state.stateId,stateName:state.stateName}">{{state.stateName}}</option>
      </select>
      <small class="error" v-if="countryValidity === 'invalid'">{{errorMessage['country']}}</small>
      </div>
    </div>
    <div class="row st-row" >
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="zipcode">Zip/Postcode<span class="text-red">*</span>:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <input class="input columns" id="zipcode" name="zipcode" type="text"  v-model.trim="user.zipcode" @blur="validateZipcode"  />
      <small class="error" v-if="zipCodeValidity === 'invalid'">{{errorMessage['ZipCode']}}</small>
      </div>
    </div>
    <div class="row st-row" >
      <div class="small-12 medium-2 large-2 columns ">
      <label class="left inline" for="phoneNumber">Phone Number:</label>
      </div>
      <div class="small-12 medium-10 large-6 columns end">
      <input class="input columns" id="phoneNumber" name="phoneNumber" type="text" v-model.trim="user.phoneNumber" @blur="validatePhone"  />
      <small class="error" v-if="phoneValidity === 'invalid'">{{errorMessage['phone']}}</small>
      </div>
    </div>

    
    <div class="row st-row">
      <input type="checkbox" id="confirm-subscribe" name="confirm-subscribe" v-model="user.confirmSubscribe"  />
      <label for="confirm-subscribe">I want to stay informed about ST's latest news</label>
    </div>

    <p>
      I consent that ST (as data controller according to the Privacy Policy) will keep a record of my navigation history and use that information as well as the personal data that I have communicated to ST for marketing purposes relevant to my interests. My personal data will be provided to ST affiliates and distributors of ST in countries located in the European Union and outside of the European Union for the same marketing purposesREAD MORE

--------- 
I understand that I can withdraw my consent at any time through opt-out links embedded in communication I receive or by managing my account settings. I can also exercise other user’s rights at any time as described in the Privacy Policy.

    </p>
    <div class="row st-row">
      <input type="checkbox" id="confirm-terms" name="confirm-terms"  v-model="user.confirm" @change="validateTermsOfUse"/>
      <br v-if="termValidity === 'invalid'"/>
      <small class="error left" v-if="termValidity === 'invalid'" >{{errorMessage['TermsOfUse']}}</small>
      <br v-if="termValidity === 'invalid'"/>
      <label for="confirm-terms">I have read and understood the Terms of Use  and Privacy Policy <span class="text-red">*</span></label>
    </div>
    <div>
      <button :disabled='isDisabled'>Register</button>
    </div>
  </form>
</div>
</div>
</template>

<script>
import countries from '../data/countryData.js';
import states from '../data/stateData.js'
import errorMessages from '../data/errorMessages.js'
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
      
      fetch("/api/FirstFunction?name=twinkle",{"method":"GET"})
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
    
    },   
    updateState(){
      this.user.state = this.state.stateName;
    } ,
    updatePhone() {
            this.user.phoneNumber = this.country.phoneISD;
            this.user.country = this.country.countryName;
    },
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
        //return true;
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
</script>

<style >

</style>
