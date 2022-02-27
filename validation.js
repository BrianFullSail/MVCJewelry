//Student name: Brian Alvarado

(function (){
    document.querySelector("#addButton").addEventListener("click", validate);

    function validate(e){
        e.preventDefault();
        document.querySelector('input[type="radio"]').setCustomValidity("");
        document.getElementById("name").setCustomValidity("");
        document.getElementById("type").setCustomValidity("");

        if(!document.getElementById("name").reportValidity()){
            document.getElementById("name").setCustomValidity("Please enter owners first name.");
        }

        else if(!document.querySelector('input[type="radio"]').reportValidity()){
            document.querySelector('input[type="radio"]').setCustomValidity("Please select a color for the Jewelry.");
        }

        else if(!document.getElementById("type").reportValidity()){
            document.getElementById("type").setCustomValidity("Please enter Ring, Necklace Or Bracelet.");
        }

        else {
            //if no errors proceed
            document.dispatchEvent(new Event("validated"));
        }
    }
})();