import React, { useState, useEffect } from 'react';

const push_data = () => {
    const [newData, setnewData] = useState([])
    const [isNewDay, setIsNewDay] = useState(false)

    useEffect(() => {
        setIsNewDay[true]
    }, [])

    useEffect(() => {
        fetch('https://data.fixer.io/api/latest?access_key=b16fced1bae2406403f788e14b2ff326&base=USD&symbols=GBP,JPY,EUR')
            .then((response) => response.json())
            .then((convertdata) => {
                setnewData(convertdata["result"])
            })
            .catch((error) => console.error(error))
    }, [])


}
