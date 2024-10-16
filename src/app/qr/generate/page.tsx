import React from 'react'

const GenerateQR = () => {
  return (
    <>
      <input
        type="text"
        className="text-black border-gray-400 border-2 block px-4 w-full rounded"
        id="generate_qr"
        name="generate_qr"
      />
      <button>Generate</button>
    </>
  )
}

export default GenerateQR