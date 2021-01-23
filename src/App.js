import axios from 'axios'
import { CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { Card, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

function App() {
  //setting state variables (persistent data)
  const [user, setUsers] = useState(null)

  //calling the API
  const getData = async () => {
    try {
      const res = await axios.get('https://randomuser.me/api/')
      const data = res.data.results
      //the JSON format was funky (data -> [results] -> [0])
      setUsers(data[0])

      //a funny way to remove private data
      delete user.login.password
      delete user.login.salt
    } catch (error) {
      console.log(error)
    }
  }

  //if the user != null, show the info card
  if (user) {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card bg='info' text='white' border='success'>
            <CardBody>
              <CardTitle bg='primary' tag='h4'>
                {[user.login.username]} <br />(
                {[user.name.title, '. ', user.name.first, ' ', user.name.last]})
              </CardTitle>
            </CardBody>
            <CardBody>
              <CardText>
                <Row>
                  <Col xs={12} md={12} lg={6}>
                    <img
                      width='100%'
                      src={[user.picture.large]}
                      alt='Card image cap'
                    />
                  </Col>
                  <Col xs={12} md={12} lg={6}>
                    <div>ID: {[user.id.name, user.id.value]}</div>

                    <div>Gender: {[user.gender]}</div>
                    <div>
                      Age: {[user.dob.age]} DoB: {[user.dob.date.split('T')[0]]}
                    </div>
                    <br></br>
                    <div className='address'>
                      <h4>Location:</h4>
                      <div>
                        {[
                          user.location.street.number,
                          ' ',
                          user.location.street.name,
                          '',
                        ]}
                      </div>
                      <div>
                        {[user.location.city, ', ', user.location.state, '']}
                      </div>
                    </div>
                    <br></br>
                    <div className='contact'>
                      <h4>Contact:</h4>
                      <div>Email: {[user.email]}</div>
                      <div> Phone: {[user.phone]}</div>
                      <div> Cell: {[user.cell]}</div>
                    </div>
                  </Col>
                </Row>
              </CardText>
            </CardBody>
            <Button variant='warning' onClick={getData}>
              Another random user
            </Button>
          </Card>
        </Col>
      </Row>
    )
  } else {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card bg='info' text='white' border='success'>
            <CardBody>
              <CardSubtitle tag='h2' className='mb-2'>
                Data pulled from: https://randomuser.me/api/
              </CardSubtitle>
            </CardBody>

            <Button variant='warning' onClick={getData}>
              Get random user
            </Button>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default App
