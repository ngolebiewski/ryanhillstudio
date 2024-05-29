import {useState} from "react";
import { Form, Input, Button } from 'antd';
const {TextArea} = Input;

const ContactForm = () => {
  const [form] = Form.useForm();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (values) => {
    const { email, message } = values;
    if (!validateEmail(email)) {
      form.setFields([
        {
          name: 'email',
          errors: ['Invalid email address'],
        },
      ]);
      return;
    }
    
    const mailtoLink = `mailto:contact@ryanhill.studio?subject=Contact Form Submission&body=Email: ${email}%0D%0A%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="series-card contact"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Message"
        name="message"
        rules={[
          {
            required: true,
            message: 'Please input your message!',
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;