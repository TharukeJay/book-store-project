
import React, {useEffect, useState} from "react";

import {
    Button, Card, CardBody, CardHeader,
    Col,
    FormLabel,
    FormSelect, Image,
    InputGroup,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle, ProgressBar,
    Row, Table
} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {
    executeGetUsers

} from "../api/endPoints";
import ScreenLoading from "./Loading";


const Series = () => {

    const [authorName, setAuthorName] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [selectedImage, setSelectedImage] = useState('')
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState('');
    const [editVisible, setEditVisible] = useState(false)


    const getUsers = async () => {
        setLoading(true)
        const response = await executeGetUsers();
        const data = response.data;
        setUsersData(data)
        setLoading(false)

    }


    // REACT JS - USE EFFECT FUNCTION
    useEffect(() => {
        getUsers()
    }, [])


    const handleClose = () => {
        setAuthorName('')
        setVisible(false)
        setSelectedImage(null)
        setEditVisible(false)
    }


    const handleAddNew = () => {
        setAuthorName('')
        setVisible(!visible)
    }
    if (loading) {
        return <ScreenLoading />
    }

    return (
        <>
            {/* react - Table sub categories list */}
            <Table>
                <thead color="light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">EMAIL</th>
                    {/*<th scope="col">ACTION</th>*/}
                </tr>
                </thead>
                <tbody>
                {/*{usersData.filter(data => data.data.isSeries === true).map((data, index) => {*/}
                {usersData.map((data, index) => {
                    return (
                        <tr key={data.id}>
                            <th scope="row">{index + 1}</th>
                            {/*<th>*/}
                            {/*    <img width={100} src={data.data.thumbnail_url} />*/}
                            {/*</th>*/}
                            <th>{data.data.email}</th>

                            {/*<th>*/}
                            {/*    <Button*/}
                            {/*        color="success"*/}
                            {/*        className="me-md-4"*/}
                            {/*        active*/}
                            {/*        tabIndex={-1}*/}
                            {/*        // onClick={() => edit(*/}
                            {/*        //     data.data.seriesId,*/}
                            {/*        //     data.data.seriesTitle,*/}
                            {/*        //     data.data.description,*/}
                            {/*        //     data.data.authorName,*/}
                            {/*        //     data.data.thumbnail_url,*/}
                            {/*        // )}*/}
                            {/*    >*/}
                            {/*        Edit*/}
                            {/*    </Button>*/}
                            {/*</th>*/}
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </>
    )
}

const Index = () => {
    return (
        <Row>
            <Col xs={12}>
                <Card className="mb-4"style={{marginRight:90, marginLeft:20}}>
                    <CardHeader>
                        <h2>USERS LIST</h2>
                    </CardHeader>
                    <CardBody>{Series()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
