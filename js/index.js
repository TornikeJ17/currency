const select = document.querySelectorAll('select')
const input  = document.querySelectorAll('input')
const API_URL = 'https://api.exchangerate.host/latest?base=GEL'

let result = ''


async function currency(){
    const rest = await fetch(API_URL)
    const data = await rest.json()
    const rates = data.rates
    console.log(data.rates)
    const arrKeys = Object.keys(data.rates)

    arrKeys.map(item =>{
        return result += `<option value=${item}>${item}</option>`
    })
    for(var i = 0; i < select.length; i++){
        select[i].innerHTML = result
    }
    function convert(i,j){
        input[i].value = input[j].value * rates[select[i].value] / rates[select[j].value]
    }
    
    input[0].addEventListener('keyup', ()=> convert(1,0))
    input[1].addEventListener('keyup', ()=> convert(0,1))
    select[0].addEventListener('change', ()=> convert(1,0))
    select[1].addEventListener('change', ()=> convert(0,1))
    $('#changeBtn').click(function(){
        $('#money').val()
    })
    //მთავარი ვალუტა
    $('#USD').append(Math.min(data.rates.GEL / data.rates.USD).toFixed(4))
    $('#EUR').append(Math.min(data.rates.GEL / data.rates.EUR).toFixed(4))
    $('#GBP').append(Math.min(data.rates.GEL / data.rates.GBP).toFixed(4))
     //მთავარი ვალუტის გაყიდვის კურსი
     $('#sellUSD').append(Math.min(data.rates.GEL * data.rates.USD).toFixed(4))
     $('#sellEUR').append(Math.min(data.rates.GEL * data.rates.EUR).toFixed(4))
     $('#sellGBP').append(Math.min(data.rates.GEL * data.rates.GBP).toFixed(4))
    //მთავარი ვალუტის ყიდვის კურსი
    $('#buyUSD').append(Math.min(data.rates.GEL / data.rates.USD).toFixed(4))
    $('#buyEUR').append(Math.min(data.rates.GEL / data.rates.EUR).toFixed(4))
    $('#buyGBP').append(Math.min(data.rates.GEL / data.rates.GBP).toFixed(4))

    console.log(result)
}

currency()