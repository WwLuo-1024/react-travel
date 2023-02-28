import React from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const RegisterForm:React.FC = () =>{

    const onFinish = async (values: any) => {
        console.log('Success:', values);
    
        try{
            await axios.post('http://123.56.149.216:8080/auth/register',{
                email: values.username,
                password: values.password,
                confirmPassword: values.Confirm
            });
            navigate("/signIn/")
        }catch(error){
            alert("注册失败")
        }
    
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    const navigate = useNavigate()
    
    return(
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400, marginLeft:'auto', marginRight:'auto' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        {/* 用于验证二次输入密码是否一致 */}
        <Form.Item
            label="ConfirmPassword"
            name="Confirm"
            hasFeedback
            rules={[
                { required: true, message: 'Please input your confirm password!' },
                (({getFieldValue}) =>({
                    validator(_, value){ //第一个参数是rule object 用下划线表示
                        if(!value || getFieldValue("password")===value){
                            return Promise.resolve()
                        }
                        return Promise.reject("密码确认不一致")
                    }
                }))
                
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
    )
}
