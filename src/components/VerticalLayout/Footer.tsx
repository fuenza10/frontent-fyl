import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer: React.FC = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} FyL.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
               
              </div>
            </Col>  
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
