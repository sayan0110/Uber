/* eslint-disable no-unused-vars */
import React from 'react'

const LocationSearchPanel = (props) => {

    const locations = [
        "Howrah Railway Station, Howrah, West Bengal, India",
        "Bagnan Railway Station, Howrah, West Bengal, India",
        "Uluberia Railway Station, Howrah, West Bengal, India",
        "Seealdah Railway Station, Howrah, West Bengal, India",
        "Sodepur Railway Station, Howrah, West Bengal, India"
    ]
    return (
        <div className='px-5'>
            {
                locations.map((location, idx) => {
                    return (
                        <div key={idx} className='flex gap-3 border-2 px-2 py-3 rounded-lg border-white active:border-zinc-400 items-center mb-4' onClick={() => {props.setVehicalPanel(true); props.setPanelOpen(false);}}>
                            <h1 className='bg-[#eee] p-3 rounded-full h-11 w-11 flex items-center justify-center'>
                                <i className="ri-map-pin-line"></i>
                            </h1>
                            <h4 className='font-light'>{location}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LocationSearchPanel
