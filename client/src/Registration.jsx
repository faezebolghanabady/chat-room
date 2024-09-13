import React, { useState } from 'react';
import axios from 'axios'

const Registration = () => {

    cont [name , setName] = useState()
    cont [password , setPassword] = useState()
    cont [email , setEmail] = useState()



    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:300/register' , {name , email , password})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    };


    return (
        <section class="bg-light py-3 py-md-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div class="card border border-light-subtle rounded-3 shadow-sm">
                            <div class="card-body p-3 p-md-4 p-xl-5">
                                <div class="text-center mb-3">

                                </div>
                                <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                                <form onSubmit={handleSubmit}>
                                    <div class="row gy-2 overflow-hidden">
                                        <div class="col-12">
                                            <div class="form-floating mb-3">
                                                <input type="text" class="form-control" name="firstName" id="firstName" placeholder="First Name" required />
                                                <label for="firstName" class="form-label">First Name</label>
                                                onChange={(e) => setName(e.target.value)}
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="form-floating mb-3">
                                                <input type="email" class="form-control" name="email" id="email" value="" placeholder="email" required />
                                                <label for="email" class="form-label">email</label>
                                                onChange={(e) => setEmail(e.target.value)}

                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="form-floating mb-3">
                                                <input type="password" class="form-control" name="password" id="password" value="" placeholder="Password" required />
                                                <label for="password" class="form-label">Password</label>
                                                onChange={(e) => setPassword(e.target.value)}
                                            </div>
                                        </div>
                                        

                                        <div class="col-12">
                                            <div class="d-grid my-3">
                                                <button class="btn btn-primary btn-lg" type="submit">Sign up</button>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <p class="m-0 text-secondary text-center">Already have an account? <a href="#!" class="link-primary text-decoration-none">Sign in</a></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;