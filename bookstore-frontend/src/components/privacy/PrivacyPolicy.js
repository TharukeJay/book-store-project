import React from 'react'
import PrivacyPdf from '../../assest/pdf/privacy.pdf'


const PrivacyPolicy = () => {

  return (
    <>
      <iframe src= {PrivacyPdf} width='100%' height='1240px' />
    </>
  )
}

export default PrivacyPolicy
