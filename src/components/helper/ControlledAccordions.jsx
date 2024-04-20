import { useState } from 'react';
import { Link } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions() {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <h3 className='font-bold text-lg'>Sales</h3>

                </AccordionSummary>

                <AccordionDetails>
                    <div className='flex flex-col gap-2'>
                        <Link to='/sale/invoice'>Sale Invoice</Link>
                        <Link to='/report/sale'>Edit Sale</Link>
                        <Link to='/sale/received'>Received</Link>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <h3 className='font-bold text-lg'>Add</h3>

                </AccordionSummary>
                <AccordionDetails>
                    <div className='flex flex-col gap-2'>

                        <Link to={"/customer"}>Customer</Link>
                        <Link to={"/product"}>Product</Link>
                        

                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <h3 className='font-bold text-lg'>Inwards</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='flex flex-col gap-2'>
                        <Link to='/purchase/invoice'>Purchase Entry</Link>
                        <Link to='/report/purchase'>Edit Purchase</Link>
                        <Link to='/purchase/payment'>Payment</Link>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <h3 className='font-bold text-lg'>Reports</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='flex flex-col gap-4'>
                        <Link to={'/report/customer'}>Customers</Link>
                        <Link to='/report/product'>Products</Link>
                        <Link to='/report/sale'>Sales</Link>
                        <Link to='/report/purchase'>Purchases</Link>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};