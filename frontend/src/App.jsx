import { useState } from 'react'
import { Heading } from './components/Heading'
import { InputBox } from './components/InputBox'
import { Button } from './components/Button'
import axios from 'axios';

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
 

  return (
    <div className="bg-slate-900 h-screen flex justify-center">
      <div className='flex flex-row justify-center pt-28 '>
        <div className= ' bg-white h-max w-max text-center rounded-md p-8 pt-2'>
        <Heading label={"Sign in"} />
        <InputBox label={"Email"} onChange={e => {
          setEmail(e.target.value);
        }} placeholder={"Email"}/><br/>
        <InputBox label={"Password"} onChange={e => {
          setPassword(e.target.value);
        } } placeholder={"Password"}/><br/>
        <Button label={"LOGIN"} onClick={async () => {
          const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            email,
          password
          })
          if(response && response.data && response.data.message === 'you are a valid user'){
            setMessage(response.data.message)
          }
        } }/>
        {message && <div className="text-green-500">{message}</div>}

      </div>
      {/* <div >
        <Heading label={"Sign Up"}/>
        <InputBox label={"Firstname"} placeholder={"Firstname"}/><br/>
        <InputBox label={"Lastname"} placeholder={"Lastname"}/><br/>
        <InputBox label={"Email"} placeholder={"Email"}/><br/>
        <InputBox label={"Password"} placeholder={"Password"}/>
      </div> */}
      {/* <div className='w-80 bg-slate-200'>
        <Heading label={"Sign up"}/>
      </div> */}
      </div>
    </div>
  )
}

export default App
