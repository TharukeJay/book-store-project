
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
    executeGetUsers, executeSetAdmin

} from "../api/endPoints";
import ScreenLoading from "./Loading";


const Series = () => {

    const [authorData, setAuthorData] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [usersTitle, setUsersTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [uploadNow, setUploadNow] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
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
        // setHide(false)
        // setFeaturedContent(false)
        // setDisplayFeaturedContent('')
        setEditVisible(false)
    }


    const handleAddNew = () => {
        setAuthorName('')
        setVisible(!visible)
    }

    const handleIsAdmin = async (userId, isAdmin) => {
        setLoading(true);
        try {
            const response = await executeSetAdmin(userId,isAdmin);
            const data = response.data;
            setLoading(false);
            await getUsers();
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
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
                    <th scope="col">STATUS</th>
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {usersData.filter(data => data.data.userRoles[0] === "ADMIN").map((data, index) => {
                // {usersData.map((data, index) => {
                    return (
                        <tr key={data.id}>
                            <th scope="row">{index + 1}</th>
                            {/*<th>*/}
                            {/*    <img width={100} src={data.data.thumbnail_url} />*/}
                            {/*</th>*/}
                            <th>{data.data.email}</th>
                            <th>{data.data.isAdmin ? 'Admin' : 'Requested'}</th>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={data.data.isAdmin}
                                    onChange={() => {handleIsAdmin(data.data.userId,data.data.isAdmin)}}
                                />
                            </th>
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
                        <h2>ADMINS LIST</h2>
                    </CardHeader>
                    <CardBody>{Series()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
