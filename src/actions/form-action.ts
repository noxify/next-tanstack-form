"use server"

import { formOpts } from "@/app/shared-code"
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/nextjs"

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.age < 15) {
      return "Server validation: You must be at least 15 to sign up"
    }
  },
})

export default async function someAction(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData)
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }

    // Some other error occurred while validating your form
    throw e
  }

  // Your form has successfully validated!
}
