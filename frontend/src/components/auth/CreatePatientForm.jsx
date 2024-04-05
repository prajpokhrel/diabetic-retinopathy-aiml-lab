import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import "../../assets/styles/Form.css"

// antd 
import { Button, Form, Input } from 'antd';
import TextArea from "antd/es/input/TextArea";

function CreatePatientForm({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const name = method === "login" ? "Login" : "Register";

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
                    message: 'Please enter the last name.',
                    },
                ]}
            >
                <Input placeholder="Enter the last name."/>
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
                rules={[
                    {
                      type: 'number',
                      message: 'Please enter a valid age'
                    },
                    {
                    required: true,
                    message: 'Please enter the age.',
                    },
                ]}
            >
                <Input placeholder="Enter the age."/>
            </Form.Item>

            <Form.Item
                label="Passport Number"
                name="passport_number"
                type
                rules={[
                    {
                        required: true,
                        message: 'Please enter the passport number.',
                    },
                ]}
            >
                <Input placeholder="Enter the passport number."/>
            </Form.Item>

            <Form.Item
                label="Diagnosis"
                name="diagnosis"
                rules={[
                    {
                    required: true,
                    message: 'Please enter the findings.',
                    },
                ]}
            >
                <TextArea placeholder="Enter the findings."/>
            </Form.Item>

            <Form.Item>
                {/* loading */}
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default CreatePatientForm;