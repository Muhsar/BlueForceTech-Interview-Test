import React from 'react'
import { useMutation } from "react-query";
import { login } from 'api/apiCall';
import { ToastContext } from "../App"
import { queryKeys } from "api/queryKey";
import { LOGIN_URL } from '../api/apiUrl';

export default function Login(props) {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const [disabled, setDisabled] = React.useState<boolean>(false)
  const {showAlert} = React.useContext(ToastContext)
  const { mutate } = useMutation(login, {
    onSuccess(data) {
      setDisabled(false);
      setTimeout(() => {
        window.location.href="/admin"
      }, 3000)
    },
    onError() {
      setDisabled(false);
      showAlert({
        message: "Login Failed",
        severity: "error",
      });
    }
    
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    setDisabled(true)
    mutate({
      url: LOGIN_URL,
      data: {
        email: state.email,
        password: state.password,
      },
    });
  };

  console.log(process.env.NODE_ENV)
  return (
    <>
      <div className="grid max-w-6xl max-h-screen grid-cols-1 gap-10 mx-auto sm:grid-cols-2">
      <div className="hidden col-span-1 sm:my-auto sm:mx-auto sm:block" data-aos="fade-in-up" data-aos-duration="800">
        <img src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/otp_mqfisv.svg" alt="" className="transition-all transform hover:scale-105 hover:-translate-y-3" />
      </div>
    <div className="flex flex-col justify-center min-h-screen col-span-1 px-4 bg-gray-50 sm:py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="w-auto h-auto mx-auto sm:hidden"
          src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/otp_mqfisv.svg"
            alt="Workflow"
            data-aos="fade-in-up" data-aos-duration="800"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign In</h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-gray-50 sm:rounded-lg sm:px-5">
            <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter Email Address
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                    autoComplete="email"
                    placeholder="Enter Email Address"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Enter Password
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                    autoComplete="password"
                    placeholder="***********"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                disabled={disabled}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-all transform bg-gray-600 border border-transparent rounded-md shadow-sm hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Login
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
    </div>
    </>
  )
}
