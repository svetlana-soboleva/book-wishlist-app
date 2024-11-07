import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'

import { Suspense } from 'react'

export const Route = createFileRoute('/signIn/')({
  component: SignInPage
})

function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  )
}
