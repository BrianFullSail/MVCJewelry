//Student name: Brian Alvarado

(function (){
    document.addEventListener("validated", createJewelry);

    function createJewelry(e){
        e.preventDefault();
        let type = document.querySelector("#type").value.toLowerCase();
        document.getElementById("stats").style.visibility = "visible";
        const evt = new Event("jewelry_validated");

        if(type === "ring"){
            evt.jewelryType = new Ring();
            document.dispatchEvent(evt);
        }
        else if(type === "necklace"){
            evt.jewelryType = new Necklace();
            document.dispatchEvent(evt);
        }
        else if(type === "bracelet"){
            evt.jewelryType = new Bracelet();
            document.dispatchEvent(evt);
        }
        else{
//             // check if the div stats is populated with an image
            if(document.getElementById("jImage")){
                const lastImage = document.getElementById("stats").lastChild;

                document.getElementById("owner").innerText = "";
                document.getElementById("color").innerText = "";
                document.getElementById("jType").innerText = "";
                document.getElementById("price").innerText = "";
                document.getElementById("stats").removeChild(lastImage);
                document.getElementById("inform").innerHTML = `Factory does not know how to create a ${type}`.bold().replace(`${type}`, `${type}`.fontcolor("#f80505"));
                setTimeout(()=>{document.getElementById("inform").innerText = "";}, 5000);

                return false;
            }

            else{
                document.getElementById("owner").innerText = "";
                document.getElementById("color").innerText = "";
                document.getElementById("jType").innerText = "";
                document.getElementById("price").innerText = "";
                document.getElementById("inform").innerHTML = `Factory does not know how to create a ${type}`.bold().replace(`${type}`, `${type}`.fontcolor("#f80505"));
                setTimeout(()=>{document.getElementById("inform").innerText = "";}, 5000);

                return false;
            }
        }
    }
})();
