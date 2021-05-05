import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import AppleIcon from '@material-ui/icons/Apple';
import { useHistory } from 'react-router-dom';

const AuthWith = () => {

    const history = useHistory();

    const goToLogin = () => {
        history.push('/login');
    }

    const goToSignup = () => {
        history.push('/signup');
    }

    return (
        <div className="bgColor" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
            <div className="row">
                <div className="col-lg-6 col-md-8 col-12 mx-auto bg-white rounded shadow pt-5 pb-5">
                    <div className="row">
                        <div className="col-6 mx-auto">
                            <button className="btn_custom shadow border" onClick={goToSignup}>
                                Signup
                            </button>
                            <div className="my-5">
                                <div class="separator text-muted">Or continue with</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 mb-2">
                                    <button className="btn_social shadow" style={{ backgroundColor: "#4267b2" }}>
                                        <FacebookIcon />
                                    </button>
                                </div>
                                <div className="col-lg-3 col-md-4 mb-2">
                                    <button className="btn_social shadow" style={{ backgroundColor: "#cf4332" }}>
                                        G+
                                    </button>
                                </div>
                                <div className="col-lg-3 col-md-4 mb-2">
                                    <button className="btn_social shadow" style={{ backgroundColor: "#55acee" }}>
                                        <TwitterIcon />
                                    </button>
                                </div>
                                <div className="col-lg-3 col-md-4 mb-2">
                                    <button className="btn_social shadow" style={{ backgroundColor: "#000000" }}>
                                        <AppleIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="my-5 text-center">
                                <p>Already have and account?</p>
                            </div>
                            <button className="btn_custom shadow border text-white" style={{ backgroundColor: "#1d0033" }} onClick={goToLogin}>
                                Login
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuthWith;