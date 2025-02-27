import Counter from "./Counter";

export default function App() {
  return (
    <div className="max-w-screen-lg mx-auto my-10">
      <div className="flex">
        <div className="px-10 w-1/2">
          <Counter />
        </div>
        <div className="px-10 w-1/2">Hello</div>
      </div>
    </div>
  );
}
