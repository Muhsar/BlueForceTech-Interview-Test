import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TextareaAutosize } from "@material-ui/core";
import { ToastContext } from "App";
import { postRequest } from "api/apiCall";
import { MAKE_APPOINTMENTS } from "api/apiUrl";
import { useMutation } from "react-query";
// import {TextAreaAutoSize} from "@material-ui/lab"
export default function Home() {
  const [state, setState] = React.useState({
    full_name: "",
    date: null,
    email: "",
    reason: "",
    time: "",
    phone_number: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  const handleReason = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  const handleDate = (date: Date | null) =>
    setState({
      ...state,
      date: date,
    });
  const [disabled, setDisabled] = React.useState(false);
  const { showAlert } = React.useContext(ToastContext);
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      setDisabled(false);
      setState({
        full_name: "",
        date: null,
        email: "",
        reason: "",
        time: "",
        phone_number: ""
      })
      showAlert({
        message: "data?.message",
        severity: "success",
      });
    },
    onError() {
      setDisabled(false);
      showAlert({
        message: "Login Failed",
        severity: "error",
      });
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    setDisabled(true);
    mutate({
      url: MAKE_APPOINTMENTS,
      data: {
        full_name: state.full_name,
        date: state.date,
        email: state.email,
        reason: state.reason,
        time: state.time,
        phone_number: state.phone_number
      },
    });
  };
  return (
    <>
      <div className="px-4 py-16 overflow-hidden bg-white sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute transform translate-x-1/2 left-full"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <svg
            className="absolute bottom-0 transform -translate-x-1/2 right-full"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              BlueForceTech Appointment Form
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Please fill in the form to book an appointment with the technical
              team at BlueForceTech
            </p>
          </div>
          <div className="mt-12">
            <form
            onSubmit={submitForm}
              className="grid grid-cols-1 gap-y-6 sm:grid-cols-1 sm:gap-x-8"
            >
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    value={state.full_name}
                    onChange={handleChange}
                    type="text"
                    name="full_name"
                    id="full_name"
                    autoComplete="full_name"
                    placeholder="Enter Your Full Name"
                    className="block w-full px-4 py-3 border-gray-400 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    value={state.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    autoComplete="email"
                    className="block w-full px-4 py-3 border-gray-400 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <div className="mt-1">
                  <input
                    value={state.phone_number}
                    onChange={handleChange}
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    placeholder="Enter Mobile Number"
                    autoComplete="phone_number"
                    className="block w-full px-4 py-3 border-gray-400 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Appointment Date
                </label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    animateYearScrolling
                    id="date-picker-dialog"
                    label="Select Appointment Date"
                    format="dd/MM/yyyy"
                    fullWidth
                    color="secondary"
                    value={state.date}
                    onChange={handleDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Appointment Time
                </label>
                <div className="mt-1">
                  <input
                    value={state.time}
                    onChange={handleChange}
                    id="time"
                    name="time"
                    type="time"
                    autoComplete="time"
                    className="block w-full px-4 py-3 border-gray-400 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason for booking
                </label>
                <div className="mt-1">
                  <TextareaAutosize
                    value={state.reason}
                    onChange={handleReason}
                    placeholder="Enter reason for booking appointment"
                    id="reason"
                    name="reason"
                    minRows={4}
                    className="block w-full px-4 py-3 border-gray-400 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <button
                disabled={disabled}
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
