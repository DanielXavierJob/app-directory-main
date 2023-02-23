'use client'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import React, { useEffect } from 'react'

const PaginationRound = ({ data, size, callback }: { data: Array<any>, size: number, callback: (data: Array<any>) => void }) => {
    const [dataFilter, setDataFilter] = React.useState<Array<any>>([])
    const [counter, setCounter] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const [arraySizes, setArraySizes] = React.useState([0, size]);
    useEffect(() => {
        getArraySizer(data);
        setDataFilters([0, size])
    }, [data])
    useEffect(() => {
        callback(dataFilter)

    },[dataFilter])
    const getArraySizer = (dataToGetSize: Array<any>) => {
        const counterPagination = dataToGetSize.length > size ? Number((dataToGetSize.length / size).toFixed()) : 1
        setCounter(counterPagination)
        console.log(counterPagination)
        const array = arrayOfMultiples(size, counterPagination)
        setArraySizes(array)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setDataFilters([arraySizes[value - 1], arraySizes[value]])
    };

    const setDataFilters = (arraySize: Array<number>) => {
        const filtred = data.slice(arraySize[0], arraySize[1]);

        setDataFilter(filtred);
    }
    const arrayOfMultiples = (a: number, b: number) => {
        let arr = [0];
        let x = 1;
        for (let i = 1; i <= b; i++) {
            arr.push(a * x);
            x++;
        }
        return arr;
    };
    return (
        <Pagination count={counter} shape="rounded" onChange={handleChange} page={page} />

    )
}

export default PaginationRound