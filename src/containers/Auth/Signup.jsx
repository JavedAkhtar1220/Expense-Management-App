import React, { useRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import NavigationIcon from '@material-ui/icons/Navigation';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import firebase from '../../config/firebase';
import swal from 'sweetalert';
import '../../App.css';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1d0033',
    },
}))(LinearProgress);

const Signup = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const [btnDisable, setBtnDisable] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();


    const handleChange = () => {
        if (showPassword) {
            setShowPassword(false);
        }
        else {
            setShowPassword(true);
        }
    }

    const goToAuthWith = () => {
        history.push('/authentication')
    }

    const onSubmit = data => {
        setBtnDisable(true);
        setOpen(false);
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(user => {
                firebase.firestore().collection("users").doc(user.user.uid).set({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                })
                    .then(() => {
                        swal("Success", "Your account created successfully", "success")
                            .then((value) => {
                                history.push('/');
                            });
                    })
            })
            .catch(error => {
                setError(error.message);
                setBtnDisable(false);
                setOpen(true);
            })
    }

    return (
        <div className="bgColor">
            <div className="row" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                <div className="col-lg-6 col-md-8 col-12 mx-auto bg-white rounded shadow">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-sm-10 col-10 mx-auto">
                            <div className="mt-4">
                                <button className="btn_back" onClick={goToAuthWith}>
                                    <NavigationIcon className="back_icon" />
                                    <span className="ml-1">Back</span>
                                </button>
                            </div>
                            <h1 className="signup_title mt-4">Create new account</h1>
                            <div className="mt-3 mb-5">
                                <p>Please fill out the all necessary fields properly...</p>
                                <BorderLinearProgress variant="determinate" value={60} />
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-3">
                                    <Collapse in={open}>
                                        <Alert
                                            severity="error"
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                        >
                                            {error}
                                        </Alert>
                                    </Collapse>
                                </div>

                                {/* Name TextFields  */}
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <label for="name">First Name</label>
                                            <div style={{ position: "relative" }}>
                                                <i className="icon"><PersonIcon /></i>
                                                <input type="text"
                                                    className="inpStyle shadow-sm border mt-2"
                                                    name="firstName"
                                                    ref={register({
                                                        required: "First Name required",
                                                        pattern: {
                                                            value: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
                                                            message: "First Name contain number",
                                                        },
                                                        maxLength: {
                                                            value: 20,
                                                            message: "First Name length less than 20 letters",
                                                        }
                                                    })} />
                                            </div>
                                            {errors.firstName && <span className="small text-danger">
                                                {errors.firstName.message}
                                            </span>}
                                        </div>
                                        <div className="col">
                                            <label for="name">Last Name</label>
                                            <div style={{ position: "relative" }}>
                                                <i className="icon"><PersonIcon /></i>
                                                <input type="text"
                                                    className="inpStyle shadow-sm border mt-2"
                                                    name="lastName"
                                                    ref={register({
                                                        required: "Last Name required",
                                                        pattern: {
                                                            value: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
                                                            message: "Last Name contain number",
                                                        },
                                                        maxLength: {
                                                            value: 20,
                                                            message: "Last Name length less than 20 letters",
                                                        }
                                                    })} />
                                            </div>
                                            {errors.lastName && <span className="small text-danger">
                                                {errors.lastName.message}
                                            </span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Email TextField */}
                                <div className="mb-3">
                                    <label for="email">Email</label>
                                    <div style={{ position: "relative" }}>
                                        <i className="icon"><MailIcon /></i>
                                        <input type="text"
                                            className="inpStyle shadow-sm border mt-2"
                                            name="email"
                                            ref={register({
                                                required: "Email Address is required",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                    message: "Email address is invalid",
                                                }
                                            })} />
                                    </div>
                                    {errors.email && <span className="small text-danger">
                                        {errors.email.message}
                                    </span>}
                                </div>

                                {/* Password TextField */}
                                <div className="mb-3">
                                    <label for="password">Password</label>
                                    <div style={{ position: "relative" }}>
                                        <i className="icon"><LockIcon /></i>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="inpStyle shadow-sm border mt-2"
                                            name="password"
                                            ref={register({
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must have at least 6 characters"
                                                }
                                            })} />
                                    </div>
                                    {errors.password && <span className="small text-danger">
                                        {errors.password.message}
                                    </span>}
                                    <div>
                                        <FormControlLabel
                                            value="end"
                                            control={<Checkbox color="primary" />}
                                            label="Show Password"
                                            className="font-poppins"
                                            labelPlacement="end"
                                            onChange={handleChange}
                                            checked={showPassword}
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password TextField */}
                                <div className="mb-3">
                                    <label for="password">Confirm Password</label>
                                    <div style={{ position: "relative" }}>
                                        <i className="icon"><LockIcon /></i>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="inpStyle shadow-sm border mt-2"
                                            name="confirmPassword"
                                            ref={register({
                                                validate: values =>
                                                    values === password.current || "Password not match"
                                            })} />
                                    </div>
                                    {errors.confirmPassword && <span className="small text-danger">
                                        {errors.confirmPassword.message}
                                    </span>}
                                </div>
                                <div className="mb-3">
                                    {btnDisable ? <button className="disbtn_signup rounded" type="button">
                                        <span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>
                                        <span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    </button> : <button class="btn_signup" type="submit">Signup</button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;