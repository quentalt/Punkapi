import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Input, TextField} from "@mui/material";

export default function Posts() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        axios.get(`https://api.punkapi.com/v2/beers`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const searchItems = (searchValue:any) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <TextField id="standard-basic" label="Standard" variant="standard"
                   onChange={(e: { target: { value: any; }; }) => searchItems(e.target.value)}
            />
            <CardContent>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        // @ts-ignore
                        return (
                            <Typography>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item['image_url']}
                                        alt="green iguana"
                                    />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item['name']}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item['tagline']}
                                    </Typography>
                                </CardContent>
                            </Typography>

                                )}
                                )
                                ) : (
                    APIData.map((item) => {
                        return (
                            <Card>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                            {item["name"]}</Typography>
                                <Typography variant="body2" color="text.secondary">
                            {item["tagline"]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </CardContent>
        </div>
    )
}