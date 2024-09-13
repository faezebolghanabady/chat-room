import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const response = await axios.post('http://127.0.0.1:300/api/auth/register', {
    //         name,
    //         email,
    //         password,
    //       });
    //       console.log('Registration successful:', response.data); 
    //     } catch (error) {
    //       console.error('Registration failed:', error); 
    //     }
    //   };




// const handleSubmit = async (event) => {
//     event.preventDefault(); // جلوگیری از ارسال معمولی فرم

//     try {
//         const formData = new FormData(event.target);
//         const response = await axios.post('http://127.0.0.1:3000/api/auth/register', formData);

//         console.log('پاسخ از سرور:', response.data);
//         // اینجا می‌توانید کارهای دیگری مانند نمایش پیام موفقیت یا هدایت کاربر به صفحه‌ای دیگر انجام دهید.
//     } catch (error) {
//         console.error('خطا در ارسال درخواست:', error);
//         // اینجا می‌توانید پیام خطا را به کاربر نمایش دهید.
//     }
// };


const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://127.0.0.1:3000/register" , {name , email , password})
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

}


    return (
        <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3">

                                </div>
                                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row gy-2 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onChange={(e) => setName(e.target.value)}
                                                    type="text" className="form-control" name="name" id="name" placeholder="name" />
                                                <label htmlFor="name" className="form-label">First Name</label>

                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email" className="form-control" name="email" id="email" placeholder="email" />
                                                <label htmlFor="email" className="form-label">email </label>

                                            </div>
                                        </div>



                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    type="password" className="form-control" name="password" id="password" placeholder="password" />
                                                <label htmlFor="password" className="form-label">password</label>

                                            </div>
                                        </div>


                                        <div className="col-12">
                                            <div className="d-grid my-3">
                                                <button className="btn btn-primary btn-lg" type="submit">Sign up</button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="m-0 text-secondary text-center">Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a></p>
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