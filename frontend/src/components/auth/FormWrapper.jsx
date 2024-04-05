import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import "../../assets/styles/Form.css"
import LoadingIndicator from "../common/LoadingIndicator";

// antd 
import { Button, Checkbox, Form, Input } from 'antd';

function FormWrapper({ route, method }) {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const name = method === "login" ? "Login" : "Register";
    const register = method === "register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            console.log(res)
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <Form
            name="basic"
            size="large"
            labelCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please enter your username.',
                    },
                ]}
            >
                <Input placeholder="Enter your username."/>
            </Form.Item>

            {
                register && (
                    <>
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                                {
                                required: true,
                                message: 'Please enter your first name.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your first name."/>
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                                {
                                required: true,
                                message: 'Please enter your last name.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your last name."/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            type
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email.'
                                },
                                {
                                    required: true,
                                    message: 'Please enter your email.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your email."/>
                        </Form.Item>

                        <Form.Item
                            label="License Number"
                            name="license_number"
                            type
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your medical license number.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your license number."/>
                        </Form.Item>
                    
                    </>
                )
            }            

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password placeholder="Enter your password." />
            </Form.Item>


            <Form.Item>
                {/* loading */}
                <Button type="primary" htmlType="submit" block>
                    {name}
                </Button>
            </Form.Item>
        </Form>
    );

    // return (
    //     <form onSubmit={handleSubmit} className="form-container">
    //         <h1>{name}</h1>
    //         <input
    //             className="form-input"
    //             type="text"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             placeholder="Username"
    //         />
    //         <input
    //             className="form-input"
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             placeholder="Password"
    //         />
    //         {loading && <LoadingIndicator />}
    //         <button className="form-button" type="submit">
    //             {name}
    //         </button>
    //     </form>
    // );
}

export default FormWrapper;