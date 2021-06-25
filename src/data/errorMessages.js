const errorMessages= {
    "firstName": 
      {
        RequiredMessage: "First Name is required",
        lengthMessage: "Please enter less than 60 characters"
      },
      "lastName": 
      {
        RequiredMessage: "Last Name is required",
        lengthMessage: "Please enter less than 60 characters"
      },
      "email": 
      {
        RequiredMessage: "Email is required",
        lengthMessage: "The e-mail format is not correct",
        formatMessage:"The e-mail format is not correct"
      },
      "emailConfirmation": 
      {
        confirmMessage: "The e-mail is different from the one above. Please check again",
        formatMessage:"The e-mail format is not correct"
      },
      "function": 
      {
        RequiredMessage: "Function is required"
      },
      "company": 
      {
        RequiredMessage: "Please enter a value",
        lengthMessage:"Please enter less than 100 characters"
      },
      "industry": 
      {
        RequiredMessage: "Industry is required"
      },
      "country": 
      {
        RequiredMessage: "Country/Region is required"
      },
      "TermsOfUse": 
      {
        RequiredMessage: "Please enter a value"
      },
      "ZipCode": 
      {
        RequiredMessage: "Zip Code is required",
        lengthMessage: "Please provide the correct Zip Code",
        formatMessage:"Please provide the correct Zip Code"
      },
      "phone": 
      {
        formatMessage:"Please enter a valid phone number. Allowed:\n- max length 25 characters\n- only the following characters 0-9 ()-./+"
      },
    
  };
  
  export default errorMessages;