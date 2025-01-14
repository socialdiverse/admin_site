import React from "react";
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../components/BreadCrumb";

import { Grid, _ } from "gridjs-react";

const data2 = [
  [
    "Jonathan",
    "jonathan@example.com",
    "Senior Implementation Architect",
    "Hauck Inc",
    "Holy See",
  ],
  [
    "Harold",
    "harold@example.com",
    "Forward Creative Coordinator",
    "Metz Inc",
    "Iran",
  ],
  [
    "Shannon",
    "shannon@example.com",
    "Legacy Functionality Associate",
    "Zemlak Group",
    "South Georgia",
  ],
  [
    "Robert",
    "robert@example.com",
    "Product Accounts Technician",
    "Hoeger",
    "San Marino",
  ],
  [
    "Noel",
    "noel@example.com",
    "Customer Data Director",
    "Howell - Rippin",
    "Germany",
  ],
  [
    "Traci",
    "traci@example.com",
    "Corporate Identity Director",
    "Koelpin - Goldner",
    "Vanuatu",
  ],
  [
    "Kerry",
    "kerry@example.com",
    "Lead Applications Associate",
    "Feeney, Langworth and Tremblay",
    "Niger",
  ],
  [
    "Patsy",
    "patsy@example.com",
    "Dynamic Assurance Director",
    "Streich Group",
    "Niue",
  ],
  [
    "Cathy",
    "cathy@example.com",
    "Customer Data Director",
    "Ebert, Schamberger and Johnston",
    "Mexico",
  ],
  [
    "Tyrone",
    "tyrone@example.com",
    "Senior Response Liaison",
    "Raynor, Rolfson and Daugherty",
    "Qatar",
  ],
];
const PostPage = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Social Diverse | Admin</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Quản lý bài viết" pageTitle="" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Quản lý bài viết</h4>
                </CardHeader>

                <CardBody>
                  <div id="table-card" className="table-card">
                    <Grid
                      data={data2}
                      columns={[
                        "Name",
                        "Email",
                        "Position",
                        "Company",
                        "Country",
                      ]}
                      sort={true}
                      search={true}
                      pagination={{ enabled: true, limit: 5 }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PostPage;
