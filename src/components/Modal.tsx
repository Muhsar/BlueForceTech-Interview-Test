import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { PaperClipIcon } from '@heroicons/react/solid'
import moment from 'moment'

export default function ModalLayout({title, trigger, open, setOpen, content}) {
  const handleClickClose = () => {
    setOpen(false)
  }
  
  
  return (
    <>
      {trigger}
      <Dialog onClose={handleClickClose} aria-labelledby="simple-dialog-title" open={open} fullWidth className="">
        <DialogTitle id="simple-dialog-title">
        <div className="modal-title d-flex align-items-center" id="modal-title-change-username">
                        <div>
                            <div className="mr-3 shadow icon icon-sm icon-shape icon-success rounded-circle">
                                {/* <LocalAtmIcon className='cursor-pointer ' /> */}
                            </div>
                        </div>
                        <div>
              <h6 className="mb-0">
                {
                  title
                }
              </h6>
                        </div>
          </div>
        </DialogTitle>
        <DialogContent className='h-auto my-auto'>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Appointment Information</h3>
      </div>
      <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">{content?.full_name}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Date and Time</dt>
            <dd className="mt-1 text-sm text-gray-900">{moment(content?.date).format("LL")} by {content?.time}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900">{content?.email}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{content?.phone_number}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {content?.reason}.
            </dd>
          </div>
        </dl>
      </div>
    </div>
</DialogContent>
</Dialog>
    </>
  )
}
