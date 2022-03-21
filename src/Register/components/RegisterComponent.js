import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Button } from '@mui/material'

const bizBodyDefault = {
    businessName: '',
    address: '',
    city: '',
    state: '',
    number: '',
    tel: '',
    email: ''
}

export default function Register() {
    const [bizBody, setBizBody] = useState(bizBodyDefault)

    const handleChange = (e) => {
        setBizBody(
            {...bizBody,
                [e.target.id]: e.target.value
            }
        )
    }

    return (
        <>
            <h1>Register Your Business</h1>
            <form style={{display: 'flex', flexDirection: 'column'}}>
                <FormControl>
                    <InputLabel htmlFor="business-name">Business Name</InputLabel>
                    <Input 
                        id="businessName" 
                        label="Business Name" 
                        onChange={handleChange} 
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input 
                        id="address" 
                        label="Address" 
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Input 
                        id="city" 
                        label="City" 
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Input 
                        id="state" 
                        label="State" 
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="zip">Zip Code</InputLabel>
                    <Input 
                        type="number" 
                        id="zip" 
                        label="Zip" 
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                    <Input 
                        type="tel" 
                        id="phoneNumber" 
                        label="Phone Number" 
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input 
                        type="email" 
                        id="email" 
                        label="Email" 
                        onChange={handleChange}
                    />
                </FormControl>

                <Button>Submit</Button>
            </form>
            {JSON.stringify(bizBody)}
        </>
    )
}