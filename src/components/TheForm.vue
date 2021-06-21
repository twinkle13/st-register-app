<template>
<div class="st_form">
        <div class="st__title"> <h1 class="title">my.st.com account creation</h1>
         </div> 
         <h2 class="design-support-calculators margin-left-15">Your Profile</h2>
<div>{{ message }}</div>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <div class="form-group ">
      <label for="salutation" class="lable columns">Salutation:</label>
      <select class="input columns" id="salutation" name="salutation" v-model="salutation" >
        <option value>Select one</option>
        <option value="Mr">Mr.</option>
        <option value="Ms">Ms</option>
      </select>
      </div>
    </div>
    <div class="form-control" :class="{invalid: firstNameValidity === 'invalid'}">
      <div class="form-group ">
      <label class="lable columns" for="first-name">First name<span class="text-red">*</span></label>
      <input class="input columns" id="first-name" name="first-name" type="text" v-model.trim="firstName" @blur="validateInput" />
      <p v-if="firstNameValidity === 'invalid'">Please enter a valid name!</p>
    </div>
    </div>
    <div class="form-control" :class="{invalid: lastNameValidity === 'invalid'}">
      <div class="form-group ">
      <label class="lable columns" for="last-name">Last name<span class="text-red">*</span>:</label>
      <input class="input columns" id="last-name" name="last-name" type="text" v-model.trim="lastName" @blur="validateInput" />
      <p v-if="lastNameValidity === 'invalid'">Please enter a valid name!</p>
    </div>
    </div>
    <div class="form-control" :class="{invalid: emailValidity === 'invalid'}">
      <div class="form-group ">
      <label class="lable columns" for="email">Email<span class="text-red">*</span>:</label>
      <input class="input columns" id="email" name="email" type="text" v-model.trim="email" @blur="validateInput" />
      <p v-if="emailValidity === 'invalid'">Please enter a valid email!</p>
    </div>
    </div>
    <div class="form-control" :class="{invalid: emailConfirmValidity === 'invalid'}">
      <div class="form-group ">
      <label class="lable columns" for="email-confirm">Email Confirmation<span class="text-red">*</span>:</label>
      <input class="input columns" id="email-confirm" name="email-confirm" type="text" v-model.trim="emailConfirm" @blur="validateInput" />
      <p v-if="emailConfirmValidity === 'invalid'">Please enter a valid email!</p>
    </div>
    </div>
    
    <div class="form-control">
      <div class="form-group ">
      <label class="lable columns" for="function">Function<span class="text-red">*</span>:</label>
      <select class="input columns" id="function" name="function" v-model="functionName">
        <option value="Analyst">Analyst</option>
        <option value="Consultant">Consultant</option>
        <option value="Engineer">Engineer</option>
      </select>
    </div>
    </div>
  <div class="form-control" :class="{invalid: companyUniversityValidity === 'invalid'}">
      <div class="form-group ">
      <label class="lable columns" for="company-university">Company/University<span class="text-red">*</span>:</label>
      <input class="input columns" id="company-university" name="company-university" type="text" v-model.trim="companyUniversity" @blur="validateInput" />
      <p v-if="companyUniversityValidity === 'invalid'">Please enter a valid email!</p>
    </div>
    </div>
    <div class="form-control">
      <div class="form-group ">
      <label class="lable columns" for="industry">Industry<span class="text-red">*</span>:</label>
      <select class="input columns" id="industry" name="industry" v-model="industry">
        <option value="ADAS">ADAS</option>
        <option value="Audio and Video">Audio and Video</option>
        <option value="Data Center">Data Center</option>
      </select>
    </div>
    </div>

    <div class="form-control">
      <div class="form-group ">
      <label class="lable columns" for="country">Country/Region<span class="text-red">*</span>:</label>
      <select class="input columns" id="country" name="country" v-model="country" @change="updatePhone">
        <option :value="null" disabled selected>Select Country</option>
         <option v-for="country in countries" :key="country.countryId" :value="{countryId: country.countryId, phoneISD: country.countryPhoneISD}">{{country.countryName}}</option>
      </select>
    </div>
    </div>
    <div class="form-control" v-if="country">
      <div class="form-group ">
      <label class="lable columns" for="state">State/Province<span class="text-red">*</span>:</label>
      <select class="input columns" id="state" name="state" v-model="state">
        <option :value="null" disabled selected>Select State</option>
         <option v-for="state in states[country.countryId]" :key="state.stateId" :value="state.stateId">{{state.stateName}}</option>
      </select>
    </div>
    </div>
    <div class="form-control" >
      <div class="form-group ">
      <label class="lable columns" for="zipcode">Zip/Postcode<span class="text-red">*</span>:</label>
      <input class="input columns" id="zipcode" name="zipcode" type="text" v-model.trim="zipcode"  />
    </div>
    </div>
    <div class="form-control" >
      <div class="form-group ">
      <label class="lable columns" for="phoneNumber">Phone Number:</label>
      <input class="input columns" id="phoneNumber" name="phoneNumber" type="text" v-model.trim="phoneNumber" />
    </div>
    </div>

    
    <div class="form-control">
      <input type="checkbox" id="confirm-subscribe" name="confirm-subscribe" v-model="confirmSubscribe" />
      <label for="confirm-subscribe">I want to stay informed about ST's latest news</label>
    </div>

    <p>
      I consent that ST (as data controller according to the Privacy Policy) will keep a record of my navigation history and use that information as well as the personal data that I have communicated to ST for marketing purposes relevant to my interests. My personal data will be provided to ST affiliates and distributors of ST in countries located in the European Union and outside of the European Union for the same marketing purposesREAD MORE

--------- 
I understand that I can withdraw my consent at any time through opt-out links embedded in communication I receive or by managing my account settings. I can also exercise other user’s rights at any time as described in the Privacy Policy.

    </p>
    <div class="form-control">
      <input type="checkbox" id="confirm-terms" name="confirm-terms" v-model="confirm" />
      <label for="confirm-terms">I have read and understood the Terms of Use  and Privacy Policy <span class="text-red">*</span></label>
    </div>
    <div>
      <button >Register</button>
    </div>
  </form>
</div>
</template>

<script>
import countries from '../data/countryData.js';
import states from '../data/stateData.js'
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      emial: null,
      emialConfirm: null,
      companyUniversity: '',
      salutation: null,
      functionName: null,
      industry: null,
      confirm: false,
      confirmSubscribe: false,
      companyUniversityValidity: 'pending',
      firstNameValidity: 'pending',
      lastNameValidity: 'pending',
      emailValidity: 'pending',
      emailConfirmValidity: 'pending',
      countries : countries,
      country: null,
      states: states,
      state: null,
      phoneNumber:null,
      zipcode:null,
      message: ""
    };
  },
  methods: {
    submitForm() {
      console.log('Registered!!!');
      const { text } = await (await fetch("/api/firstfunction/twinkle")).json();
      this.message = text;
    },
    validateInput() {
      console.log('validation!!!')
    },
    updatePhone() {
            //this.phoneNumber = event.target.value.phoneISD;
            //var val = JSON.parse(event.target.phoneISD);
            console.log(this.country.phoneISD);
            this.phoneNumber = this.country.phoneISD;
        }
  },
};
</script>

<style scoped>
*{
    
    box-sizing: border-box;
}
form {
  padding: 2rem;
  background-color: #ffffff;
      color: #74757c;
    font-size: 16px;
    line-height: 1.5;
    margin: 0 0 25px 0;
    display: block;
    font-family: Arial,Helvetica,sans-serif;
}

.form-control {
  margin: 0.5rem 0;
  display: block;
}
.form-group {
  display: table;
  width: 100%;
}
.st_form{
  max-width: 1083px;
  width: 100%;
  padding: 2rem;
  background-color: #ffffff;
  margin: 0 auto;
}

.form-control.invalid input {
  border-color: red;
}

.form-control.invalid label {
  color: red;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}
h1 {
  background-color: #ffffff;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}

.title{
  color: #03234b;
    font-weight: 700;
    margin-right: 0;
    text-align: left;
    line-height: 1.1;
    margin-bottom: 0;
    font-size: 24px;
    margin: 0 0 25px 0;
    font-family: Arial,Helvetica,sans-serif;
    font-style: normal;

}

.st__title {
   border-bottom: 1px solid #ccc; 
    min-height: 0;
    padding-top: 25px;
}
.lable{
      width: 16.66667%;
      float:left;
      padding:15;
      color: #74757c;
      font-size: 13px;
      font-weight: 700;
}
.input{
  width: 50%;
  float:left;
  padding:15;
  
}
.columns {
    position: relative;
    padding-left: .9375rem;
    padding-right: .9375rem;
    float: left;
}
select {
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    color: #74757c;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: 400;
    height: 38px;
}
input[type='text'], input[type='password'], input[type='number'], input[type='email'], textarea,  input {
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    box-shadow: none;
    color: #74757c;
    font-weight: 400;
    height: 38px;
    margin: 0;
}
.text-red {
    color: #e6007e;
}

</style>
