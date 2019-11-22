document.querySelector('#wallets').addEventListener('change', function (event) {
    let out = document.querySelector('.out');
    if(event.target.value == 'RUB'){
        new Promise(resolve => {
            resolve(getData('RUB'));
        }).then(data => {
            out.innerHTML = `
            <p>1 RUB = ${data.rates.USD.toString().substr(0, data.rates.USD.toString().search(/[.]/g) + 4)} USD</p>
            <p>1 RUB = ${data.rates.EUR.toString().substr(0, data.rates.EUR.toString().search(/[.]/g) + 4)} EUR</p>
        `;
        });
    }
    if(event.target.value == 'USD'){
        new Promise(resolve => {
            resolve(getData('USD'));
        }).then(data => {
            out.innerHTML = `
            <p>1 USD = ${data.rates.EUR.toString().substr(0, data.rates.EUR.toString().search(/[.]/g) + 3)} EUR</p>
            <p>1 USD = ${data.rates.RUB.toString().substr(0, data.rates.RUB.toString().search(/[.]/g) + 3)} RUB</p>
        `;
        });
    }
    if(event.target.value == 'EUR'){
        new Promise(resolve => {
            resolve(getData('EUR'));
        }).then(data => {
            out.innerHTML = `
            <p>1 EUR = ${data.rates.RUB.toString().substr(0, data.rates.RUB.toString().search(/[.]/g) + 3)} RUB</p>
            <p>1 EUR = ${data.rates.USD.toString().substr(0, data.rates.USD.toString().search(/[.]/g) + 3)} USD</p>
        `;
        });
    }
});
 async function getData(wallet) {
    let response = await fetch(`https://api.exchangeratesapi.io/latest?base=${wallet}`);
    let data = await response.json();
    return data;
}