import { sendMail } from '@/app/lib/mailService'
import React from 'react'

const TestMail = async () => {

    const send = async () => {
        "use server"
        const test = await sendMail(
            {
            to : "acquayegeorge9@gmail.com",
            name: "Jhorge Klicks",
            subject: "Testing the  Email Services",
            body: `<h1>Hello KlicksTech</h1>`
        })

        console.log(test);
    }


  return (
   <form action="">
    <button formAction={send}>Send Mail</button>
   </form>
  )
}

export default TestMail