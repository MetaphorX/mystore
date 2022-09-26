import React from 'react'

const Mastercard = () => {
  return (
    <label for="mastercard" className="relative w-full cursor-pointer">
            <input
              className="peer hidden"
              type="radio"
              
              name="paymentMethod"
              checked={selectedPaymentMethod}
              onChange={() => setSelectedPaymentMethod()}
            />
            <div
              className="flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5
                h-24 sm:h-40 w-full bg-white border-2 border-green-400 rounded-md transition
                peer-checked:border-green-600 peer-checked:shadow-lg hover:border-green-900
                peer-checked:-translate-y-1
            "
            >
              <svg
                width="93"
                height="58"
                viewBox="0 0 93 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.8936 6.20062H59.0145V51.7801H33.8936V6.20062Z"
                  fill="#FF5F00"
                />
                <path
                  d="M35.4886 28.9905C35.4886 19.7298 39.7949 11.5157 46.4139 6.2006C41.5496 2.33527 35.409 0 28.7101 0C12.8394 0 0 12.965 0 28.9905C0 45.0157 12.8394 57.9811 28.7098 57.9811C35.4087 57.9811 41.5492 55.6458 46.4139 51.7801C39.7949 46.5458 35.4886 38.2513 35.4886 28.9905Z"
                  fill="#EB001B"
                />
                <path
                  d="M92.908 28.9905C92.908 45.0157 80.0686 57.9811 64.1983 57.9811C57.4994 57.9811 51.3588 55.6458 46.4941 51.7801C53.193 46.4654 57.4198 38.2513 57.4198 28.9905C57.4198 19.7298 53.1131 11.5157 46.4941 6.2006C51.3585 2.33527 57.4994 0 64.1983 0C80.0686 0 92.908 13.0457 92.908 28.9905Z"
                  fill="#F79E1B"
                />
              </svg>
              <p
                className="sm:absolute top-full sm:mt-1 text-center text-lg sm:text-xl
              w-auto sm:w-full opacity-70 font-medium
              "
              >
                Pay with Mastercard
              </p>
            </div>
          </label>
  )
}

export default Mastercard