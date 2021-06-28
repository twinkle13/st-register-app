<template>
<div class="st_form">
        <div class="st__title"> <h1 class="title">my.st.com account creation</h1>
         </div> 
         <div class="st-container">
         <h2 class="design-support-calculators margin-left-15">Your Profile</h2>
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
        
        <option :value="null" disabled selected>Select One</option>
         <option v-for="func in functions" :key="func.code" :value="func.descr">{{func.descr}}</option>
      
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

<script src="./the-form.js"></script>
<style >

</style>
