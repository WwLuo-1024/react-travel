import React from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './registerForm.module.css'

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

export const RegisterForm: React.FC = () => (
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
);