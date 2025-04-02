/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldApi } from "@tanstack/react-form"
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react"

import { InputIcon } from "./icon-input"

// @TODO: Maybe there is a better solution for this?
export function FieldStateIndicator({
  field,
}: {
  field: FieldApi<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >
}) {
  if (field.state.meta.errors.length > 0 && !field.state.meta.isValidating) {
    return (
      <InputIcon>
        <AlertCircleIcon className="text-red-500" />
      </InputIcon>
    )
  }

  if (
    field.state.meta.errors.length == 0 &&
    !field.state.meta.isValidating &&
    field.state.meta.isDirty
  ) {
    return (
      <InputIcon>
        <CheckCircle2Icon className="text-green-500" />
      </InputIcon>
    )
  }

  if (field.state.meta.isValidating) {
    return (
      <InputIcon>
        <Loader2Icon className="animate-spin text-gray-500" />
      </InputIcon>
    )
  }

  return null
}
