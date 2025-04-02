"use client"

import { useActionState } from "react"
import {
  ageServerFieldValidation,
  firstNameServerFieldValidation,
} from "@/actions/field-action"
import someAction from "@/actions/form-action"
import { formOpts } from "@/app/shared-code"
import { mergeForm, useForm, useTransform } from "@tanstack/react-form"
import { initialFormState } from "@tanstack/react-form/nextjs"
import { useStore } from "@tanstack/react-store"

export const ClientComp = () => {
  const [state, action] = useActionState(someAction, initialFormState)

  const form = useForm({
    ...formOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state],
    ),
    validators: {
      onSubmitAsync: async ({ value, formApi }) => {
        const [ageFailed, firstNameFailed] = await Promise.all([
          // Verify the age on the server
          ageServerFieldValidation({ value: value.age }),
          // Verify the username on the server
          firstNameServerFieldValidation({ value: value.firstName }),
        ])

        console.log({ ageFailed, firstNameFailed })

        if (ageFailed || firstNameFailed) {
          return {
            fields: {
              ...(ageFailed ? { age: ageFailed } : {}),
              ...(firstNameFailed ? { firstName: firstNameFailed } : {}),
            },
          }
        }

        form.reset()

        return null
      },
    },
  })

  const formErrors = useStore(form.store, (formState) => formState.errors)

  console.dir({
    formState: form.state,
    formStore: form.store,
    formErrors,
    fieldErrors: form.getAllErrors(),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <form.Field
        name="age"
        asyncAlways={true}
        validators={{
          onBlurAsync: async ({ value }) => {
            console.log("onBlurAsync")
            return await ageServerFieldValidation({ value })
          },
          onChange: ({ value }) =>
            value < 8 ? "Client validation: You must be at least 8" : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                min={0}
                name={field.name}
                type="number"
                value={field.state.value ?? 0}
                onChange={(e) => {
                  console.log("onChange", e.target.valueAsNumber)
                  field.handleChange(
                    isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber,
                  )
                }}
              />
              {field.state.meta.errors.length > 0 ? (
                <em role="alert">{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </div>
          )
        }}
      </form.Field>

      <form.Field name="firstName">
        {(field) => {
          return (
            <div>
              <input
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 ? (
                <em role="alert">{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </div>
          )
        }}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      </form.Subscribe>
    </form>
  )
}
