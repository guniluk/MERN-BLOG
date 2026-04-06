import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="max-w-6xl p-3 mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-gray-800 dark:text-white">
        Create Post
      </h1>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            required
            className="flex-1"
          />
          <Select>
            <option value="uncatagorized">Select a Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.JS</option>
            <option value="nextjs">Next.JS</option>
            <option value="python">Python</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button type="button" color="green" size="sm" className="p-5" outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" color="green">
          Publish
        </Button>
      </form>
    </div>
  );
}
