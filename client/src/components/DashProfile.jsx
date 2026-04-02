import { useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-5 w-full">
      <h1 className="text-slate-400 text-xl font-bold mb-7 my-7 text-center">
        Profile
      </h1>
      <form className="flex flex-col gap-7">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="e-mail"
          defaultValue={currentUser.email}
        />
        <TextInput id="password" type="password" placeholder="password" />
        <Button type="submit" color="green" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
