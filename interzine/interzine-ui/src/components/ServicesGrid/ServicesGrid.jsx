import React, {useState} from 'react'
import ServiceCard from '../ServiceCard/ServiceCard'
import {Link} from 'react-router-dom'
import './ServicesGrid.css'
import SubNavbar from '../SubNavbar/SubNavbar'

function ServicesGrid({services}) {
    const [servicesShown, setServicesShown] = useState(services)

    return (
        <div className='service-grid'>
            <SubNavbar services={services} setServices={setServicesShown}/>
            {servicesShown?.map(service => <div className='card'> <ServiceCard id= {service.id} service={service}/> </div>)}
        </div>
    )
}

export default ServicesGrid
