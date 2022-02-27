//Student name: Brian Alvarado

window.addEventListener("load", function (){
    const myAssignment = MVC_Assignment.getInstance();
});

class MVC_Assignment {
    constructor() {
        const controller = new Controller();
    }

    static getInstance(){
        if(!MVC_Assignment._instance){
            MVC_Assignment._instance = new MVC_Assignment();
            return MVC_Assignment._instance;
        }
        else{
            throw "Cannot create a second Singleton!";
        }
    }
}

class Controller{
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.displayInfo();
        this.jewelryMade = [];
        document.addEventListener("jewelry_validated", e => this.addOwner(e));
    }

    displayInfo = ()=>{
        document.querySelector("#displayButton").addEventListener("click", e => this.submit(e));
    }

    addOwner = (e)=>{
        e.preventDefault();
        document.getElementById("statusOutput").innerHTML = "jewelry added ".bold() + "information".replace("information", "information".fontcolor("#f80505"));
        const jewelry = e.jewelryType;
        const name = document.querySelector("#name").value;
        const color = this.getColor();

        jewelry.owner = name;
        jewelry.color = color;

        this.jewelryMade.push(jewelry);

        //enable the submit button after the array is populated
        document.getElementById("displayButton").disabled = false;

        //create new event
        const evt = new Event("jewelry_created");
        evt.jewelryInfo = jewelry;
        document.dispatchEvent(evt);

    }

    submit = (e)=>{
        const evt = new Event("array_created");

        evt.jewelryArray = this.jewelryMade;
        document.dispatchEvent(evt);
    }

    getColor = ()=>{
        const colors = document.getElementsByName("color");

        for(let c in colors) {
            if(colors[c].checked){
                return colors[c].value;
            }
        }
    }
}

class Model{
    constructor() {
        document.addEventListener("array_created", e => this.process(e));
    }

    process = (e)=>{
        e.preventDefault();
        const total = Utility.totalCost(e.jewelryArray);
        const evt = new Event("model_completed");

        evt.jewelryTotal = [e.jewelryArray, total];
        document.dispatchEvent(evt);
    }
}

class View{
    constructor() {
        document.addEventListener("jewelry_created", e => this.display(e));
        document.addEventListener("model_completed", e=> this.displayArray(e));
    }

    display= (e)=>{
        e.preventDefault();
        const jewelry = e.jewelryInfo;

        document.getElementById("stats").style.visibility = "visible";
        document.getElementById("owner").innerHTML = `name:&nbsp`.bold() + jewelry.owner;
        document.getElementById("color").innerHTML = `color:&nbsp`.bold() + jewelry.color;
        document.getElementById("jType").innerHTML = `type:&nbsp`.bold() + jewelry.type;
        document.getElementById("price").innerHTML = `price:&nbsp`.bold() + "$" + jewelry.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("inform").innerHTML = `a new ${jewelry.type} has been added!`;
        document.getElementById("inform").innerHTML = `a new ${jewelry.type} has been added!`.replace(`${jewelry.type}`, `${jewelry.type}`.fontcolor("#f80505"));
        this.getImage(jewelry);

        // if table rows less than or equal to 1 then return, else continue
        if (document.getElementById("outputTable").rows.length <= 1) {
            return;
        }
        let rowCount = document.getElementById("outputTable").rows.length;
        for (let i = rowCount - 1; i > 0; i--) {
            document.getElementById("outputTable").deleteRow(i);
        }

        // hide the table
        document.getElementById("outputTable").style.visibility = "hidden";
        document.getElementById("lastOut").style.visibility = "hidden";

    }

    displayArray = (e)=>{
        e.preventDefault();
        const total = e.jewelryTotal[1];
        const jArray = e.jewelryTotal[0];

        jArray.forEach(function (e){

            const imageName = e.color === "white" ? "white" : "yellow";
            const image = new Image();

            image.src = e.type === "ring" ? `images/ring/${imageName}.png` : e.type === "necklace" ? `images/necklace/${imageName}.png` : `images/bracelet/${imageName}.png`;
            image.style.borderRadius = ".5rem";
            image.style.display = "block";
            image.style.margin = "0 auto";
            image.style.height = "50px";

            //Get the reference of the Table's TBODY element.
            const tBody = document.getElementById("outputTable").getElementsByTagName("tbody")[0];

            //Add Row.
            let row = tBody.insertRow(-1);

            //Add Name cell.
            let cell = row.insertCell(-1);
            cell.appendChild(image);

            //Add Number cell.
            cell = row.insertCell(-1);

            cell.innerHTML = e.owner;//Add Number cell.
            cell = row.insertCell(-1);

            cell.innerHTML = e.color;//Add Number cell.
            cell = row.insertCell(-1);

            cell.innerHTML = e.type;//Add Number cell.
            cell = row.insertCell(-1);

            cell.innerHTML = "$" + e.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

            document.getElementById("outputTable").style.visibility = "visible";
            document.getElementById("lastOut").style.visibility = "visible";
            document.getElementById("displayButton").disabled = true;
        })

        const array = this.countJewelry(jArray);

        document.getElementById("statusOutput").innerHTML = "factory output".bold() + " information".replace("information", "information".fontcolor("#f80505"));
        document.getElementById("owner").innerHTML = `rings:&nbsp`.bold() + array[0];
        document.getElementById("color").innerHTML = `bracelets:&nbsp`.bold() + array[1];
        document.getElementById("jType").innerHTML = `necklaces:&nbsp`.bold() + array[2];
        document.getElementById("price").innerHTML = `total cost:&nbsp`.bold() + "$" + total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("inform").innerHTML = "all factory work completed".replace("completed", "completed".fontcolor("#f80505"));

        if(document.getElementById("jImage")){
            const lastImage = document.getElementById("stats").lastChild;

            document.getElementById("stats").removeChild(lastImage);
        }

        const sum = document.createElement("p");
        sum.id = "sumTotal";
        sum.style.display = "block";
        sum.style.textAlign = "center";
        document.getElementById("lastOut").appendChild(sum);

        document.getElementById("sumTotal").innerHTML = `total $${total}`.bold();
    }

    getImage = (j)=>{
        //set the image by color & later we set it by type
        const imageName = j.color === "white" ? "white" : "yellow";
        const image = new Image();

        image.id = "jImage";
        image.src = j.type === "ring" ? `images/ring/${imageName}.png` : j.type === "necklace" ? `images/necklace/${imageName}.png` : `images/bracelet/${imageName}.png`;
        image.style.borderRadius = "1rem";
        image.style.boxShadow = "0 0 10px 10px #fff";
        image.style.display = "block";
        image.style.margin = "0 auto";
        image.style.height = "230px";

        if(document.getElementById("jImage")){
            const lastImage = document.getElementById("stats").lastChild;

            document.getElementById("stats").removeChild(lastImage);
            document.getElementById("stats").appendChild(image);
        }
        else{
            document.getElementById("stats").appendChild(image);
        }
    }

    countJewelry = (array)=>{
        let rings= 0;
        let bracelets = 0;
        let necklaces = 0;
        let newArray = [];

        for(let j in array){
            if(array[j].type === "ring"){
                rings++;
            }
            else if(array[j].type === "bracelet"){
                bracelets++;
            }
            else if(array[j].type === "necklace"){
                necklaces++;
            }
        }
        newArray.push(rings, bracelets, necklaces);
        return newArray;
    }
}
