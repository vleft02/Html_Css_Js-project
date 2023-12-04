window.addEventListener('load', function validateForm()
{ 

        let inputs = document.getElementsByTagName('input')
        document.getElementById('postal-code').addEventListener('keypress', function(event) 
        {
            checkMaxInput(5, this.value.length,event)
        });
        for (let input of inputs) {

            if (input.type == "text" || input.type == "email")
            {
                input.addEventListener('keypress', function(event) {
                    checkMaxInput(40, this.value.length,event)
                });
            }
            else if (input.type == "tel")
            {
                input.addEventListener('keypress', function(event) {

                    checkMaxInput(10, this.value.length,event)
                });
            }
        }

        document.getElementById('customer-info').addEventListener('keypress', function(event)
        {
            checkMaxInput(120, this.value.length,event)
        });



        
        // We get the two phone inputs and assign an input event to the second one 
        // so when it is given we can check if the are the same numbner and show the appropriate message
        let phone = document.getElementById('tel');
        let mobilePhone = document.getElementById('mobile-tel'); 
        mobilePhone.addEventListener('input', function(event) {
            
            if (phone.value === event.target.value)
            {
                phone.setCustomValidity('Παραχωρήσατε διπλότυπο αριθμό επικοινωνίας');
                mobilePhone.setCustomValidity('Παραχωρήσατε διπλότυπο αριθμό επικοινωνίας');
                phone.classList.add('invalid');
                mobilePhone.classList.add('invalid');  
            }
            else
            {
                phone.setCustomValidity('');
                mobilePhone.setCustomValidity('');
                if (phone.classList.contains('invalid')) {
                    phone.classList.remove('invalid');
                }
                if (mobilePhone.classList.contains('invalid')) {
                    mobilePhone.classList.remove('invalid');
                }
      
            }
        });

        let password = document.getElementById('password');
        let passwordConfirmation = document.getElementById('password-confirmation');
        
        // We get the two password inputs and assign an input event to the second one 
        // so when it is given a value we can check if the passwords match and show the appropriate message
        passwordConfirmation.addEventListener('input',function(event)
        {
                console.log(event.target.value);
                if (checkMatchingPassword(password.value,event.target.value))
                {
                    passwordConfirmation.setCustomValidity('');
                    if (passwordConfirmation.classList.contains('invalid')) {
                        passwordConfirmation.classList.remove('invalid');
                    }
                    if (password.classList.contains('invalid')) {
                        password.classList.remove('invalid');
                    }
                }
                else
                {
                    passwordConfirmation.setCustomValidity('Οι κωδικοι δεν ταιριάζουν');
                    password.classList.add('invalid');
                    passwordConfirmation.classList.add('invalid');
                }
        })


        let birthday = document.getElementById('birthday')
        
        //we get the dat input and add an event listener so when its valeu is changed we check wether th date
        // is acceptable or not
        birthday.addEventListener('input',function(event)
        {
            console.log(event.target.value);
                
            let minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 18);
            let birthdate = new Date(event.target.value)
            if (birthdate.getFullYear()> minDate.getFullYear() || birthdate.getFullYear()< 1900 )
            {
                birthday.setCustomValidity('Η εγγραφή επιτρέπεται μόνο για χρήστες άνω των 18');
                birthday.classList.add('invalid');

            }
            else
            {
                birthday.setCustomValidity('');
                if (birthday.classList.contains('invalid')) {
                    birthday.classList.remove('invalid');
                }

            }

        })

        // prevents POST in order to debug the form
        let form = document.getElementById('signUpForm');
        form.addEventListener('submit', function(event)
        {
            event.preventDefault();
            
        })              

})




// We check wether a maximum input is allowed and prevet typing if so
function checkMaxInput(maxInputAllowed, input,keyStorkeEvent)
{

    if (input>=maxInputAllowed) {
        keyStorkeEvent.preventDefault();
        alert('Το Μέγιστο πλήθος των χαρατήρων που επιτρέπετε είναι '+maxInputAllowed);
    }
}


// We check wether the 2 password given are mathcing and return true if that is the case
function checkMatchingPassword(password1, password2)
{
    if (password1 === password2)
    {
        return true;
    }
    else
    {
        return false;
    }
}




// function validateAtLeastOneCheckBox(checkboxes)
// {
//     let counter=0;
//     for (let checkbox of checkboxes)
//     {
//         if(checkbox.checked)
//         {
//             counter++;
//         }
//     }
//     if (counter===0)
//     {
//         checkboxes[0].setCustomValidity('Επιλέξτε τουλάχιστον ένα πεδιο');
//     } 
//     else{
//         checkboxes[0].setCustomValidity('');
//     }

// }
