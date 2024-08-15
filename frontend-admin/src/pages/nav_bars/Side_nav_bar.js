import React, {useEffect, useState} from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {Menu} from "antd";
import {
    UploadOutlined,BuildOutlined
} from '@ant-design/icons';
import {executeGetUsers} from "../../api/endPoints";

const  SideNavbar = () => {

    const userEmail = localStorage.getItem('email');
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);

    const getUsers = async () => {
        const response = await executeGetUsers();
        const data = response.data;
        setUsersData(data)
        console.log('print USERDATA===>',usersData)
    }
    useEffect(() => {
        getUsers()
    }, [])
    const isAdmin = usersData.some(user => user.data.email === userEmail && user.data.userRoles.includes('SUPER_ADMIN'));
    return (
        <div>
            {console.log('print is admin===>',isAdmin)}
        <div style={{display:"flex", flexDirection:"row" ,color : "green"}}>
    <header className={"App-header"}>
            <space>
    <Menu style={{width: 200, height: '100vh',fontSize:16 ,itemSelectedColor:"#ffffff"}}
        onClick={({key})=>{
            if(key==="signOut"){
                localStorage.clear();
                navigate('/home');
            }else{
                navigate(key)
            }
        }}
          // itemSelectedColor ="#FFFFFF"
        theme={"dark"}
        mode="inline"
        defaultOpenKeys={["upload"]}
        items={[
            {label:"Upload", key:"/upload" ,icon: <UploadOutlined  />,},
            // {label: "News Update",key:"newsUpdate"},
            // {label: "Analytics", key:"analytics"},
            // {label: "Users",key:"Users"},
            {label: "Create",key:"create",type:"group",icon: <BuildOutlined />,children:[
               {label: "Category", key:"/createCategory"},
               {label: "Author", key:"/createAuthor"},
               {label: "Book Series", key:"/createBookSeries"},
               {label: "News", key:"/createNews"},
               {label: "News Category", key:"/createNewsCategory"},
               {label: "News Stript", key:"/createNewsStript"},
               {label: "Picture Rim", key:"/createPictureRim"},
                ],},
            {label: "View",key:"view",type:"group",children:[
                    {label: "Books",key:"/books"},
                    {label: "Audio Books",key:"/audioBooks"},
                ],},

            {label: "Users",key:"/users"},
            {label: "Admin Users",key:"/adminUsers", hidden: !isAdmin },
            {label: "Sign out",key:"signOut",danger:true},
        ]}></Menu></space>
        </header></div>
</div>
    );
};

export default SideNavbar;
