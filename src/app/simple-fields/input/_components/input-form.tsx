"use client"

import { useActionState } from "react"
import someAction from "@/actions/form-action"
import { Button } from "@/components/ui/button"
import { FieldStateIndicator } from "@/components/ui/field-state-indicator"
import { useAppForm } from "@/components/ui/form"
import { Input, InputRoot } from "@/components/ui/icon-input"
import { useTransform } from "@tanstack/react-form"
import { initialFormState, mergeForm } from "@tanstack/react-form/nextjs"
import { toast } from "sonner"
import { z } from "zod"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
export function InputForm() {
  const [state, action] = useActionState(someAction, initialFormState)

  const form = useAppForm({
    validators: {
      onChange: FormSchema,
      onSubmit: ({ value }) => {
        if (value.username === "syncform") {
          return {
            fields: {
              username: {
                message: `Username "${value.username}" is already taken. ( form - onSubmit )`,
              },
            },
          }
        }
      },
      onSubmitAsync: async ({ value }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (value.username === "asyncform") {
          return {
            fields: {
              username: {
                message: `Username "${value.username}" is already taken. ( form - onSubmitAsync )`,
              },
            },
          }
        }
      },
    },
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state],
    ),
    defaultValues: {
      username: "",
    },
    onSubmit: ({ value }) => {
      toast.success("Form submitted", {
        closeButton: true,
        icon: null,
        classNames: {
          description: "w-full",
          content: "w-full",
        },
        description: (
          <pre className="mt-2 min-w-full rounded-md bg-slate-950 p-4">
            <code className="w-full text-white">
              {JSON.stringify(value, null, 2)}
            </code>
          </pre>
        ),
      })
    },
  })

  return (
    <form.AppForm>
      <form
        className="space-y-6"
        action={action as never}
        onSubmit={() => form.handleSubmit()}
      >
        <form.AppField
          name="username"
          validators={{
            onChange: ({ value }) => {
              if (value === "syncfield") {
                return {
                  message: `Username "${value}" is already taken. ( field - onChange )`,
                }
              }
            },
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000))
              if (value === "asyncfield") {
                return {
                  message: `Username "${value}" is already taken. ( field - onChangeAsync )`,
                }
              }
            },
          }}
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Username</field.FormLabel>
              <field.FormControl>
                <InputRoot>
                  <Input
                    placeholder=""
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldStateIndicator field={field} />
                </InputRoot>
              </field.FormControl>
              <field.FormDescription>
                Choose your username.
              </field.FormDescription>
              <field.FormMessage />
            </field.FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </form.AppForm>
  )
}
