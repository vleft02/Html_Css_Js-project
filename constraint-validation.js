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

        // let fullname = document.getElementById('name');
        // fullname.oninvalid = function(event)
        // {
        //     event.target.setCustomValidity();
        // }

        document.getElementById('signUpForm').addEventListener('submit', function(event)
        {
            event.preventDefault();
        
            
            let phone = document.getElementById('tel');
            let mobilePhone = document.getElementById('mobile-tel'); 

            if (phone.checkValidity() && mobilePhone.checkValidity())
            {
                phone.setCustomValidity('');
                mobilePhone.setCustomValidity('');
                if (phone.value == mobilePhone.value)
                {
                    phone.setCustomValidity('Παραχωρήσατε διπλότυπο αριθμό επικοινωνίας');
                    phone.setCustomValidity('Παραχωρήσατε διπλότυπο αριθμό επικοινωνίας');
                }
            }

            let password = document.getElementById('password');
            let passwordConfirmation = document.getElementById('password-confirmation');

            if (password.checkValidity() && passwordConfirmation.checkValidity())
            {
                password.setCustomValidity('');
                passwordConfirmation.setCustomValidity('');
                if (password.value != passwordConfirmation.value)
                {
                    password.setCustomValidity('Οι κωδικοί δεν ταιριάζουν');
                    passwordConfirmation.setCustomValidity('Οι κωδικοί δεν ταιριάζουν');
                }
            }



            // let fieldValues = new Map();

            // for (let input of inputs)
            // {
            //     fieldValues.set(input.name, input.value);
            //     console.log(input.name + ": "+ input.value)
            // }
            
            // for (let textarea of textareas)
            // {
            //     fieldValues.set(textarea.name, textarea.value);
            // }

            // for (let select of selects )
            // {
            //     fieldValues.set(select.name, select.value);
            // }
            // fieldValues.delete('search');
            

            // if (fieldValues.get('name').checkValidity()){
            //     fieldValues.get('name').
            // }
            // else
            // {

            // }

            // let fullname = document.getElementById('name');
            // if (!fullname.checkValidity())
            // {
            //     fullname.setCustomValidity('Πληκτρλογήστε ένα έγκυρο όνοματεπώνυμο με όχι λιγοτερους απο 4 λατινικούς ή ελληνικούς χαρακτήρες.');
            // }
        })
    })





function checkMaxInput(maxInputAllowed, input,event)
{

    if (input>=maxInputAllowed) {
        event.preventDefault();
        alert('Το Μέγιστο πλήθος των χαρατήρων που επιτρέπετε είναι '+maxInputAllowed);
    }
}

function stringValidityCheck(inputValue, regex)
{
    return inputValue.match(regex);

}