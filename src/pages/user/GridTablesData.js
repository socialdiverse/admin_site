import React from 'react';
import { Grid, _ } from 'gridjs-react';

const data2 = [
    ["Jonathan", "jonathan@example.com", "Senior Implementation Architect", "Hauck Inc", "Holy See"],
    ["Harold", "harold@example.com", "Forward Creative Coordinator", "Metz Inc", "Iran"],
    ["Shannon", "shannon@example.com", "Legacy Functionality Associate", "Zemlak Group", "South Georgia"],
    ["Robert", "robert@example.com", "Product Accounts Technician", "Hoeger", "San Marino"],
    ["Noel", "noel@example.com", "Customer Data Director", "Howell - Rippin", "Germany"],
    ["Traci", "traci@example.com", "Corporate Identity Director", "Koelpin - Goldner", "Vanuatu"],
    ["Kerry", "kerry@example.com", "Lead Applications Associate", "Feeney, Langworth and Tremblay", "Niger"],
    ["Patsy", "patsy@example.com", "Dynamic Assurance Director", "Streich Group", "Niue"],
    ["Cathy", "cathy@example.com", "Customer Data Director", "Ebert, Schamberger and Johnston", "Mexico"],
    ["Tyrone", "tyrone@example.com", "Senior Response Liaison", "Raynor, Rolfson and Daugherty", "Qatar"],
];

const CardTableExample = () => {
    return (
        <React.Fragment>
            <Grid
                data={data2}
                columns={["Name", "Email", "Position", "Company", "Country"]}
                sort={true}
                search={true}
                pagination={{ enabled: true, limit: 5, }}
            />
        </React.Fragment>
    );
}; 
export {  CardTableExample };
