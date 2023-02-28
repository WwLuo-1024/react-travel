import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { signIn } from "../../redux/user/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

export const SigninForm: React.FC = () =>{

    const loading = useSelector(s => s.user.loading)
    const jwt = useSelector(s=>s.user.token)
    const error = useSelector(s=>s.user.error)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() =>{
        if(jwt !== null){
            navigate("/");
        }
    }, [jwt]) //监听Jwt数值变化

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        dispatch(signIn({
            email: values.username,
            password: values.password
        }))
        // try {
        //     console.log("登陆成功")
        // } catch (error) {
        //     alert("注册失败")
        // }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}
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

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}