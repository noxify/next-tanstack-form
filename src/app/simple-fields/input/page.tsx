import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { InputForm } from "./_components/input-form"

const title = "input"

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <InputForm />
      </CardContent>
      <CardFooter className="border-t">
        Use "syncfield" to test the sync field validation ( onChange ).
        <br />
        Use "asyncfield" to test the async field validation ( onChange ).
        <br />
        Use "syncform" to test the sync form validation ( onSubmit ).
        <br />
        Use "formasync" to test the async form validation ( onSubmit ).
        <br />
        Use any other string value to simulate a valid value.
      </CardFooter>
    </Card>
  )
}
