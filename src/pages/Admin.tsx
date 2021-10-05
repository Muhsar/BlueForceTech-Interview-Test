import { ExternalLinkIcon, TrashIcon } from '@heroicons/react/solid';
import { DELETE_APPOINTMENT, GET_APPOINTMENTS } from 'api/apiUrl';
import ModalLayout from 'components/Modal';
import moment from 'moment';
import React from 'react'
import { useQuery } from 'react-query';
import { deleteRequest, getRequest } from '../api/apiCall';
import { queryKeys } from '../api/queryKey';

export default function Admin() {
  const [page, setPage] = React.useState(0)
  const {
    data
  } = useQuery(
    [queryKeys.getAppointments, page],
    async () => await getRequest({ url: GET_APPOINTMENTS(page) }),
    {
      retry: 2
    }
    )
    const [total, setTotal] = React.useState(data?.total)
    // const appointments = data?.data
    const [appointments, setAppointments] = React.useState(data?.data)
    React.useEffect(()=>{
      setAppointments(data?.data)
      setTotal(data?.total)
    },[data?.data, data?.total])
const [open, setOpen] = React.useState(false)
const [currentAppointment, setAppointment] = React.useState(null)
const returnAppointment = (id) => {
  const data = appointments?.find(appointment=>appointment._id===id)
  setAppointment(data)
  setOpen(true)
}
const DeleteAppointment = (id) => {
  deleteRequest({url: DELETE_APPOINTMENT(id)})
  setAppointments(appointments.filter( app => app._id !== id ))
}
const Trigger = ({setOpen, click}) => (
  <>
  <a href="#" className="hidden text-indigo-600 hover:text-indigo-900 md:block" onClick={click}>
                        View
                      </a>
                      <button
                      onClick={click}
                  className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg md:hidden hover:text-gray-500"
                >
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">View</span>
                </button>
  </>
)
// alert(page)
  return (
        <>
      <div className="px-4 py-16 overflow-hidden bg-white sm:px-6 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-7xl">
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
              BlueForceTech Appointments
            </h2>
          </div>
          <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:hidden">
      {appointments?.map((app) => (
        <li key={app.id} className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow">
          <div className="flex items-center justify-between w-full p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">{app.full_name}</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">{app.email}</p>
              <p className="mt-1 text-sm text-gray-500 truncate">{app.phone_number}</p>
              <p className="mt-1 text-sm text-gray-500 truncate">{moment(app.date).format("LL")} by {app.time}</p>
            </div>
            <img className="flex-shrink-0 object-cover object-center w-16 h-16 bg-gray-300 rounded-full" src={app.image ? app.image : app.gender === "Male" ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png" : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png"} alt="" />
          </div>
          <div>
            <div className="flex -mt-px divide-x divide-gray-200">
            <div className="flex flex-1 w-0 -ml-px sm:hidden">
              <>
              <ModalLayout title={`${currentAppointment?.full_name}'s Appointment`} content={currentAppointment} trigger={<Trigger setOpen={setOpen} click={()=>returnAppointment(app._id)} />} open={open} setOpen={setOpen} />
              </>
              </div>
            <div className="flex flex-1 w-0 -ml-px sm:hidden">
              <>
                  <button
                  onClick={()=>DeleteAppointment(app._id)}
                  className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Delete</span>
                </button>
              </>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
          <div className="hidden overflow-hidden border-b border-gray-200 shadow sm:rounded-lg md:block">
            <table className="min-w-full mt-5 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments?.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{appointment.full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{appointment.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{moment(appointment.date).format("LL")} by {appointment.time}</td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <ModalLayout title={`${currentAppointment?.full_name}'s Appointment`} content={currentAppointment} trigger={<Trigger setOpen={setOpen} click={()=>returnAppointment(appointment._id)} />} open={open} setOpen={setOpen} />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a href="#" className="text-red-600 hover:text-red-900" onClick={()=>DeleteAppointment(appointment._id)}>
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav
      className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{1 + Number(page * 10)}</span> to <span className="font-medium">{Number((1 + page)*10)}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex justify-between flex-1 sm:justify-end">
        <button
          onClick={()=>setPage(page - 1)}
          disabled={page===0}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={()=>setPage(page + 1)}
          disabled={((page+1)*10) > total}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </nav>
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  )
}
