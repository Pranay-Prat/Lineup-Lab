import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background text-foreground p-8'>
        <SignUp signInUrl='/sign-in' path='/sign-up'/>
    </div>
  )
}