import React from 'react'
import {Toaster as Sonner} from 'sonner';

const Toaster = ({...props}) => {
  return (
    <Sonner
        toastOptions={{
            className: "toast",
            duration: 3000
        }
        }
        {...props}
    />
  
  )
}

export default Toaster