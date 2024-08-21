import React from 'react'
import Form from '@/components/Form'
import SiteFooter from '@/components/SiteFooter'
import Head from 'next/head'
import SiteHeader from '@/components/SiteHeader'

const ContactPage = () => {
  return (
    <>
      <Head>
          <title>Products</title>
      </Head>

      <div className="h-[30vh] min-h-[20rem] bg-[url('/bmw-retro.jpg')] bg-cover bg-center relative px-3">
          <div className="absolute bg-slate-900 inset-0 z-0 opacity-40 px-3"></div>

          <SiteHeader className="header-blog-home relative" />

          <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-8">
              Contact
          </h1>

          <p className="relative z-10 text-center text-slate-200 text-2xl">
              Custom form with validation that sends email to Wordpress back-end through CF7 REST API.
          </p>
      </div>

      <main className="px-8 py-12 min-h-[65vh]">
        <div className='max-w-2xl mx-auto'>
          <Form />
        </div>
      </main>

      <SiteFooter />
    </>
  )
}

export default ContactPage;