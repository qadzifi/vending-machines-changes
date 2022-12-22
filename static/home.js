const denominationList = [100, 50, 20, 10, 5, 1];
const changesTable = document.querySelector('table#changes-table tbody')
document.querySelector('select#money-selection').onchange = () => {
    const itemPrices = parseInt(document.querySelector('input[name=item]:checked').value);
    let moneyAmount = parseInt(document.querySelector('select[name=amount]').value) - itemPrices;
    let resultHTML = '<tr><td style="text-align: center;">Uang Pas</td></tr><tr><td>0 Lembar Pecahan Digunakan</td></tr>';
    if (moneyAmount < 0) {
        resultHTML = '<tr><td>Uang Tidak Cukup</td></tr>'
    }
    if (moneyAmount > 0) {
        resultHTML = '';
        const changesList = {};
        denominationList.forEach(changes => {
            let count = 0;
            while (moneyAmount >= changes) {
                count += 1;
                moneyAmount -= changes;
            }
            if (count > 0) {
                changesList[`${changes}`] = count;
            }
        });
        let changesAmount = 0;
        Object.entries(changesList).reverse().forEach(([denom, amount]) => {
            resultHTML += `<tr><td>Rp ${denom}:</td><td style="text-align: end;">${amount} lembar</td></tr>`;
            changesAmount += amount;
        });
        resultHTML += `<tr><td colspan=2>${changesAmount} Lembar Pecahan Digunakan</td></tr>`;
    }
    changesTable.innerHTML = resultHTML;
};

document.querySelectorAll('input[name=item]').forEach(element => {
    element.onclick = document.querySelector('select#money-selection').onchange;
})


