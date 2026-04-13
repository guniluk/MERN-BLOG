import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className="flex flex-col  gap-5 sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 justify-center flex flex-col">
        <h1 className="text-2xl">Want to learn more about Javascript?</h1>
        <p className="text-gray-700 dark:text-gray-200 my-2">
          Chaeck out resources at google
        </p>
        <Button className="mt-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-none rounded-tl-xl border-none">
          <a
            href="https://www.google.com"
            target="_blink"
            rel="noopener noreferrer"
          >
            Google
          </a>
        </Button>
      </div>
      <div className="p-2 flex-1">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt="image"
        />
      </div>
    </div>
  );
}
