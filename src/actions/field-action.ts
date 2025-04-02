"use server"

export const ageServerFieldValidation = async ({
  value,
}: {
  value: number
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("[age]: server field validation log entry")
  if (value < 12) {
    return "Server field validation: You must be at least 12 to sign up"
  }

  return undefined
}

export const firstNameServerFieldValidation = async ({
  value,
}: {
  value: string
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("[firstName]. server field validation log entry")
  if (value === "hello") {
    return "Server field validation: hello is not allowed"
  }

  return undefined
}
