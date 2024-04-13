import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import "../../assets/styles/Form.css"
import LoadingIndicator from "../common/LoadingIndicator";

// antd 
import { Button, Checkbox, Form, Input, Alert } from 'antd';

function FormWrapper({ route, method }) {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const getValues = (errors) => {
        const valuesArray = [];
        Object.keys(errors).forEach(key => {
          const value = errors[key];
          if (Array.isArray(value)) {
            valuesArray.push(...value);
          } else {
            valuesArray.push(value);
          }
        });
      
        return valuesArray;
      }

    const onFinish = async (values) => {
        console.log('Success:', values);
        setErrors([]);
        try {
            const res = await api.post(route, {...values})
            // console.log(res);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/dashboard")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error.response.data);
            setErrors(getValues(error?.response?.data));
            alert(error)
        } finally {
            setLoading(false)
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const name = method === "login" ? "Login" : "Register";
    const register = method === "register";

    return (
        <>
            {
                errors.length !== 0 && (
                    errors.map((error, index) => {
                        return (
                            <Alert key={index} message={error} type="error" closable/>
                        )                        
                    })
                )
            }

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
                    label="Email"
                    name="username"
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
        </>
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