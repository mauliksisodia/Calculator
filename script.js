const result = document.getElementById("result");

function appendFunction(value){
    result.value += value;
    
}

function clearDisplay(){
    result.value = "";
}

function deleteLast(){
    result.value = result.value.slice(0,-1);
}

function calculate(){
    try{
        if(!/^[0-9+\-*/.\s]+$/.test(result.value)){
            result.value = "Error";
            return;
        }

        const evaluated = eval(result.value);

        if(!(isFinite(evaluated))){
            result.value = "Error";
            return;
        }
        result.value = evaluated;
    }
    catch(error){
        result.value = "Error";
    }

}