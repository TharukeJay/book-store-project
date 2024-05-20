import React, {useEffect, useState} from 'react';
import Loading from "react-loading";

import {
    Col,
    Row,
    Form,
    FormGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody, FormLabel, ModalFooter, Table
} from 'react-bootstrap';
import {executeLoginUser} from "../../api/loginUser";
import {executeCreateCategory, executeGetCategory} from "../../api/endPoints";

function Categories() {
    const [categoryData, setCategoryData] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    const getCategory = async () => {
        setLoading(true)
        const response = await executeGetCategory();
        const data = response.data;
            setCategoryData(data)
            setLoading(false)

    }
    const createCategory = async () => {
        setLoading(true);
        try {
            const response = await executeCreateCategory(categoryName);
            const data = response.data;
            setCategoryName(categoryName);
            setLoading(false);
            getCategory();
        } catch (error) {
            setLoading(false);
            console.error('Error creating category:', error);
        }
    };


    useEffect(() => {
        getCategory()
    }, [])

    // if (loading) {
    //     return <Loading />
    // }
    const handleVisible = () => {
        setVisible(true)
    }


    return (
        <>
            {/*<Button*/}
            {/*    variant="primary"*/}
            {/*    onClick={handleVisible}*/}
            {/*>*/}
            {/*    Add New*/}
            {/*</Button>*/}
            <Button sm={8} onClick={handleVisible}>
                Add New
            </Button>

            <Modal alignment="center" show={visible} onClose={() => setVisible(false)}>
                <ModalHeader>
                    <ModalTitle>New Category</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            CATEGORY NAME
                        </FormLabel>
                        <Col sm={8}>
                            {/*<FormInput type="text" onChange={(e) => setCategoryName(e.target.value)} />*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) => setCategoryName(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </Button>
                    <Button color="primary" onClick={() => createCategory(categoryName)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            <Table>
                <thead color="light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">CATEGORY NAME</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryData.map((data, index) => {
                        return (
                            <tr key={data.data}>
                                <td scope="row">{index + 1}</td>
                                <td>{data.data.categoryName}</td>

                                <td>
                                    <Button
                                        color="success"
                                        className="me-md-4"
                                        active
                                        tabIndex={-1}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    );
}
const Validation = () => {
    return (
        <Row>
            <Col xs={12}>
                <Card className="mb-4">
                    <CardHeader>
                        <h2>CATEGORY LIST</h2>
                    </CardHeader>
                    <CardBody>{Categories()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}


export default Validation;

// import React, {useEffect, useState} from 'react';
// import Loading from "react-loading";
//
// import {
//     Col,
//     Row,
//     Form,
//     FormGroup,
//     Button,
//     Card,
//     CardHeader,
//     CardBody,
//     Modal,
//     ModalHeader,
//     ModalTitle,
//     ModalBody, FormLabel, ModalFooter, Table
// } from 'react-bootstrap';
// import {executeLoginUser} from "../../api/loginUser";
// import {executeCreateCategory, executeGetCategory} from "../../api/endPoints";
//
// function Categories() {
//     const [categoryData, setCategoryData] = useState([]);
//     const [categoryName, setCategoryName] = useState('');
//     const [visible, setVisible] = useState(false)
//     const [loading, setLoading] = useState(true)
//
//     const getCategory = async () => {
//         setLoading(true)
//         const response = await executeGetCategory();
//         const data = response.data;
//             setCategoryData(data)
//             setLoading(false)
//
//     }
//     const createCategory = async () => {
//         setLoading(true);
//         try {
//             const response = await executeCreateCategory(categoryName);
//             const data = response.data;
//             setCategoryName(categoryName);
//             setLoading(false);
//             getCategory();
//         } catch (error) {
//             setLoading(false);
//             console.error('Error creating category:', error);
//         }
//     };
//
//
//     useEffect(() => {
//         getCategory()
//     }, [])
//
//     // if (loading) {
//     //     return <Loading />
//     // }
//     const handleVisible = () => {
//         setVisible(true)
//     }
//
//
//     return (
//         <>
//             {/*<Button*/}
//             {/*    variant="primary"*/}
//             {/*    onClick={handleVisible}*/}
//             {/*>*/}
//             {/*    Add New*/}
//             {/*</Button>*/}
//             <Button sm={8} onClick={handleVisible}>
//                 Add New
//             </Button>
//
//             <Modal alignment="center" show={visible} onClose={() => setVisible(false)}>
//                 <ModalHeader>
//                     <ModalTitle>New Category</ModalTitle>
//                 </ModalHeader>
//                 <ModalBody>
//                     <Row className="mb-3">
//                         <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
//                             CATEGORY NAME
//                         </FormLabel>
//                         <Col sm={8}>
//                             {/*<FormInput type="text" onChange={(e) => setCategoryName(e.target.value)} />*/}
//                             <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Control type="name" placeholder="Enter name" onChange={(e) => setCategoryName(e.target.value)} />
//                             </Form.Group>
//                         </Col>
//                     </Row>
//
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="secondary" onClick={() => setVisible(false)}>
//                         Close
//                     </Button>
//                     <Button color="primary" onClick={() => createCategory(categoryName)}>
//                         Save
//                     </Button>
//                 </ModalFooter>
//             </Modal>
//
//             <Table>
//                 <thead color="light">
//                     <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">CATEGORY NAME</th>
//                         <th scope="col">ACTION</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {categoryData.map((data, index) => {
//                         return (
//                             <tr key={data.data}>
//                                 <td scope="row">{index + 1}</td>
//                                 <td>{data.data.categoryName}</td>
//
//                                 <td>
//                                     <Button
//                                         color="success"
//                                         className="me-md-4"
//                                         active
//                                         tabIndex={-1}
//                                     >
//                                         Edit
//                                     </Button>
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </Table>
//         </>
//     );
// }
// const Validation = () => {
//     return (
//         <Row>
//             <Col xs={12}>
//                 <Card className="mb-4">
//                     <CardHeader>
//                         <h2>CATEGORY LIST</h2>
//                     </CardHeader>
//                     <CardBody>{Categories()}</CardBody>
//                 </Card>
//             </Col>
//         </Row>
//     )
// }
//
//
// export default Validation;
