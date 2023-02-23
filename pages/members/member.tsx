import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Product } from '#/types/Product';
import Pagination from '@mui/material/Pagination';
import PaginationRound from '#/components/pagination/round';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'
interface Member {
    name: string
}
interface MediaProps {
    loading?: boolean;
    data?: Array<Product>
}

function Media(props: MediaProps) {
    const { loading = false, data = [] } = props;

    return (
        <Grid container>
            {(loading ? Array.from(new Array(5)) : data).map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Card sx={{ maxWidth: 345, m: 2 }}>
                        <CardHeader
                            avatar={
                                loading ? (
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                ) : (
                                    <Avatar
                                        alt="Ted talk"
                                        src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                    />
                                )
                            }
                            action={
                                loading ? null : (
                                    <IconButton aria-label="settings" sx={{xl: 'none', md: 'flex'}}>
                                        <MoreVertIcon />
                                    </IconButton>
                                )
                            }
                            title={
                                loading ? (
                                    <Skeleton
                                        animation="wave"
                                        height={10}
                                        width="80%"
                                        style={{ marginBottom: 6 }}
                                    />
                                ) :
                                    item.name
                            }
                            subheader={
                                loading ? (
                                    <Skeleton animation="wave" height={10} width="40%" />
                                ) : (`${item.rating} cobranças`)
                            }
                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

const Members = ({ filter, loadingProps }: { filter?: string, loadingProps?: boolean }) => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<Array<Product>>([]);
    const [dataFiltred, setDataFiltred] = React.useState<Array<Product>>([]);
    const [dataPagination, setDataPagination] = React.useState<Array<Product>>([]);
    React.useEffect(() => {
        getMembers();
    }, [])

    React.useEffect(() => {
        executeFilter()
    }, [filter])

    React.useEffect(() => {
        loadingProps && setLoading(loadingProps)
    }, [loadingProps])
    const executeFilter = async () => {
        if (filter) {
            setLoading(true)
            await Promise.resolve(setDataFiltred(data.filter((item: any) => {
                const _keys: any = Object.keys(item)
                for (var i = 0; i < _keys.length; i++) {
                    if (["string", 'number'].includes(typeof item[_keys[i]])) {
                        console.log(_keys[i])
                        if (item[_keys[i]].toString().includes(filter)) {
                            return item;
                        }
                    }
                }
            })))
            setLoading(false)
        } else {
            setDataFiltred(data)
            setLoading(false)

        }
    }
    const getMembers = async () => {
        const data = await fetch(`${window.location.origin}/api/products?delay=5000&quantity=100`)
        const response = await data.json()
        if (response.length != 0) {
            setData(response)
            setDataFiltred(response)
            setLoading(false)
        }
    }



    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item md={12} xs={12} display="flex" justifyContent="center" alignItems="center">
                    <Media loading={loading} data={dataPagination} />
                </Grid>
                <Grid item md={12} xs={12} display="flex" justifyContent="center" alignItems="center">
                    <PaginationRound data={dataFiltred} size={9} callback={(data: Array<any>) => {
                        setDataPagination(data)
                    }} />
                </Grid>
            </Grid>

        </Box>
    );
}
export default Members;
