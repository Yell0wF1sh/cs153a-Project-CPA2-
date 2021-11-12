export const currencyInfo = [
    {
        currencyName: "Chinese Yuan",
        currencySymbol: "￥",
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
        historyTitle: 'CNY',

    },
    {
        currencyName: "US Dollar",
        currencySymbol: "$",
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
        historyTitle: 'USD',
    },
    {
        currencyName: 'Japanese Yen',
        currencySymbol: '¥',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg',
        historyTitle: 'JPY',
    },
    {
        currencyName: 'Euro',
        currencySymbol: '€',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg',
        historyTitle: 'EUR',
    },
    {
        currencyName: 'British Pound',
        currencySymbol: '£',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
        historyTitle: 'GBP',
    },
    {
        currencyName: 'South Korean Won',
        currencySymbol: '₩',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
        historyTitle: 'KRW',
    },
    {
        currencyName: 'Canadian Dollar',
        currencySymbol: '$',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
        historyTitle: 'CAD',
    },
    {
        currencyName: 'Argentine Peso',
        currencySymbol: '$',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
        historyTitle: 'ARS',
    },
    {
        currencyName: 'Australian Dollar',
        currencySymbol: '$',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
        historyTitle: 'AUD',
    },
    {
        currencyName: 'Russian Ruble',
        currencySymbol: '₽',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg',
        historyTitle: 'RUB',
    },
]

export const currencyList = ['CNY', 'USD', 'JPY', 'EUR', 'GBP', 'KRW', 'CAD', 'ARS', 'AUD', 'RUB']

export const findCurrency = (value) => {
    for (let i = 0; i < currencyInfo.length; i++) {
        if (value == currencyInfo[i].currencyName) {
            return i
        }
    }
}

export function currencyName(num) {
    return currencyInfo[num]["currencyName"]
}

export function currencyAbbr(num) {
    return currencyInfo[num]["historyTitle"]
}

export const convertDateTenDaysAhead = (value) => {
    const temp = value.slice(0, 8)
    return temp + (value.slice(8, 10) - 10)
}