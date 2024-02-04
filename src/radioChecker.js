export default function radioChecker(){
    const radios = document.querySelectorAll("input[name]")
    let valueChecked;
    let radio;
    for (radio of radios){
        if(radio.checked){
            valueChecked = radio.value;
        }
    }
    return valueChecked;
}