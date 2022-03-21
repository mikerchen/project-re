import React, { useState, useEffect } from "react";
import { Box, Checkbox, FormControl, FormLabel, FormControlLabel, FormGroup } from '@mui/material';
import { Loader } from '@googlemaps/js-api-loader'
import { config } from '../../../config'
  

export default function SearchHeader() {
    const [mapPosition, setMapPosition] = useState(
        {
            lat: 34.15774396373404, 
            lng: -118.13454330170784
        }
    )

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      function success(pos) {
        var crd = pos.coords;
        setMapPosition({
            lat: crd.latitude,
            lng: crd.longitude
        })
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }
      
      function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    useEffect(() => {
        if(!isSafari) {
            if (navigator.geolocation) {
                navigator.permissions
                .query({ name: 'geolocation'})
                .then(result => {
                    if (result.state === "granted") {
                        console.log(result.state);
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        console.log(result.state)
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                    
                    }
                    result.onchange = () => {
                        console.log(result.state);
                    }
                });
            } else {
                alert("Sorry Not available");
            }
        } else {
            navigator.geolocation.getCurrentPosition(success, errors, options);
        }
    }
    ,[])

    const loader = new Loader({
        // apiKey: config.google_maps_api_key,
        version: 'weekly',
        libraries: ['places']
    })

    const mapOptions = {
        center: {
            lat: 34.1478,
            lng: -118.1445
        },
        zoom: 12
    }

    loader.loadCallback(e => {
        if (e) {
            console.log(e);
        } else {
            const reMap = new google.maps.Map(document.getElementById('map'), mapOptions)
            const marker = new google.maps.Marker({
                position: mapPosition,
                map: reMap
            })
            new google.maps.places.SearchBox(document.getElementById('searchBox'))
        }
    })


    return(
        <>
            <Box
                sx={{
                    width: '100%',
                    height: 400,
                    borderBottom: '1px solid black',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <div 
                    className="header-left"
                >
                    <h1 className='header-tag'>Donate to a Local Business</h1>
                </div>
                <div className="header-right">
                    <div className="search-container">
                        <input
                            id="searchBox"
                            type="text"
                            placeholder="Enter a location"
                            onChange={e => console.log(e)}
                        />
                    </div>
                <div className="filter-supplies">
                    <h3 style={{textAlign: 'center'}}>What are you donating?</h3>
                        <FormControl>
                            <FormGroup row>
                                <FormControlLabel 
                                    control={
                                        <Checkbox name="bubblewrap" />
                                    }
                                    label="Bubblewrap"
                                />
                                <FormControlLabel 
                                    control={
                                        <Checkbox name="peanuts" />
                                    }
                                    label="Peanuts"
                                />
                                <FormControlLabel 
                                    control={
                                        <Checkbox name="air-pillows" />
                                    }
                                    label="Air Pillows"
                                />
                                <FormControlLabel 
                                    control={
                                        <Checkbox name="styrofoam-sheets" />
                                    }
                                    label="Styrofoam Sheets"
                                />
                                <FormControlLabel 
                                    control={
                                        <Checkbox name="foam-rolls" />
                                    }
                                    label="Foam Rolls"
                                />
                            </FormGroup>
                        </FormControl>
                        {JSON.stringify(mapPosition)}
                    </div>
                </div>
            </Box>
            <div id="map"></div>
        </>
    )
}