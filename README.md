# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Example usage

Copy the following code into the textarea and press run:

```
start:
MOV a 5
MOV b 10
loop:
ADD a b
SUB b 1
JNZ b loop
JMP end
MOV a 100
end:
HLT
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
