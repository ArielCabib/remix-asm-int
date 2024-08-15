import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Interpreter } from "~/lib/int";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const interpreter = new Interpreter(url.searchParams.get('program') || '');
  interpreter.run();
  return {registers: interpreter.getRegisters()};
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { registers } = useLoaderData<typeof loader>(); 
  
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to assembly interpreter</h1>
      <Form>
        <textarea name="program" rows={10} cols={80}></textarea>
        <br />
        <button type="submit">Run</button>
      </Form>
      <div>
        {JSON.stringify(registers, null, 2)}
      </div>
      {/* <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/quickstart"
            rel="noreferrer"
          >
            5m Quick Start
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/tutorial"
            rel="noreferrer"
          >
            30m Tutorial
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul> */}
    </div>
  );
}
