## Getting Started

First, run the development server:

```bash
git clone git@github.com:noxify/next-tanstack-form.git
cd next-tanstack-form
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Components

- NextJS 15
- Tailwind V4
- shadcn@canary to get their react19 & tw4 compatible components
- shadcn form components ( input, select, etc. )
- tanstack/form compatible Form component powered by https://github.com/FatahChan/shadcn-tanstack-form
- input field with icon support powered by https://github.com/markjaniczak / https://github.com/shadcn-ui/ui/discussions/1552#discussioncomment-12584660

## Known errors

1. When using the `FieldStateIndicator` component together with an `onSubmitAsync` validation on form level, the indicators shows an success ( based on the field validation ) until the form validation triggers the error state.
   - maybe this isn't an issue at all, but have seen it and want to make it transparent ✌️
