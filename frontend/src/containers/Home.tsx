import {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useDispatch, useSelector} from "react-redux";
import {decodePost, encodePost} from "./ThunkFetch/FetchSlice.ts";
import {RootState} from "../app/slice.ts";

const Home = () => {

    const { encodeMessage, decodeMessage } = useSelector((state: RootState) => state.crypto);

    const dispatch = useDispatch();
    const [decode , setDecode] = useState('');
    const [password , setPassword] = useState('');
    const [encode , setEncode] = useState('');


    useEffect(() => {
        if (encodeMessage) {
            setDecode(encodeMessage);
        }
    }, [encodeMessage]);

    useEffect(() => {
        if (decodeMessage) {
            setEncode(decodeMessage);
        }
    }, [decodeMessage]);
    
    const onClickDecode = () => {
        dispatch(decodePost({ password, decode }))
    }

    const onClickEncode = () => {
        dispatch(encodePost({ password, encode }))
    }

    return (
        <div style={{marginTop: '50px'}}>
            <div style={{display: 'flex', gap: '10px'}}>
                <p>Decoded message</p>
                <TextField
                    id="outlined-controlled"
                    label="Decoded"
                    value={decode}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDecode(event.target.value);
                    }}
                    InputProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                />
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent:'space-between',marginTop: '25px'}}>
                <p>Password</p>
                <TextField
                    id="outlined-controlled"
                    label="Password"
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                    }}
                    InputProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    sx={{
                        width:'150px',
                        marginLeft:'46px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                />
                <div style={{alignItems:'center', marginTop:'10px'}}>
                    <button style={{marginRight:'5px'}} onClick={onClickEncode}><ArrowDropUpIcon /></button>
                    <button onClick={onClickDecode}><ArrowDropDownIcon /></button>
                </div>
            </div>
            <div style={{display: 'flex', gap: '10px',marginTop: '25px'}}>
                <p>Encoded message</p>
                <TextField
                    id="outlined-controlled"
                    label="Encoded"
                    value={encode}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEncode(event.target.value);
                    }}
                    InputProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Home;
