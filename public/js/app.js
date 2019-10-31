// console.log('Javascript of client side');
// fetch('http://localhost:3000/weather?address=georgia').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             return(console.log(data[0].error));
//         }
//         console.log(data[0].place);
//         console.log(data[0].forecast);
//     })
// })

const weatherForm = document.querySelector('form');
const searchBoxElement = document.querySelector('input');
let resultPara = document.querySelector('#result');
let errorPara = document.querySelector('#error');

errorPara.textContent = '';
resultPara.textContent ='Loading :)';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchBoxElement.value;
    // console.log(location);
    // console.log('Javascript of client side');
    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
            errorPara.textContent = data.error;
        }
        else{
            console.log(data[0].place);
            console.log(data[0].forecast);
            resultPara.textContent = data[0].place + data[0].forecast;
        }
    })
})
})