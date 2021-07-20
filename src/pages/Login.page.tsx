import { FC, memo, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import InputField from '../components/form/InputField';
import Icon from '../components/form/Icon';
import { useFormik } from 'formik';
import * as yup from "yup";
import Button from '../components/form/Button';

interface Props { }

const Login: FC<Props> = (props) => {

    const redirectHistory = useHistory();

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
        useFormik({
            initialValues: {
                email: "",
                password: ""
            },
            validationSchema: yup.object().shape({
                email: yup
                    .string()
                    .email(() => "Email is invalid")
                    .required("Email is required field!"),
                password: yup
                    .string()
                    .required("Cannot login without a password")
                    .matches(
                        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                    )
            }),
            onSubmit: (data, { setSubmitting }) => {
                setTimeout(() => {
                    console.log(data);
                    setSubmitting(false);
                    redirectHistory.push("/dashboard");
                }, 3000);
            }
        });

    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div>
            <h1>Log In to CODEBITS</h1>
            <h5>New Here? <Link to="/signup" className="text-primary-dark">Create an account</Link></h5>
            <form onSubmit={handleSubmit} method="POST">
                <InputField
                    {...getFieldProps("email")}
                    name="email"
                    type="email"
                    placeholder="Email"
                    touched={touched.email}
                    errorMessage={errors.email}
                >
                    <Icon>
                        <>
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </>
                    </Icon>
                </InputField>
                <InputField
                    {...getFieldProps("password")}
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    touched={touched.password}
                    errorMessage={errors.password}
                >
                    <Icon>
                        <>
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2">
                            </rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4">
                            </path>
                        </>
                    </Icon>
                </InputField>
                <Button text="Log in" submitProgress={isSubmitting} />
            </form>
            <Link to="/forgot-password" className="text-primary-dark">Forgot Password?</Link>
        </div >
    );
};

Login.defaultProps = {};

export default memo(Login);