import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const handleUploadImage = () => {
    console.log(file);
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      return alert('All fields are required');
    }
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      console.log(data);
      alert('Post created successfully');
      setFormData({});
      setFile(null);
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError(error.message);
    }
  };

  return (
    <div className="max-w-6xl p-3 mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-gray-800 dark:text-white">
        Create Post
      </h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            required
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.JS</option>
            <option value="nextjs">Next.JS</option>
            <option value="python">Python</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            color="green"
            size="sm"
            className="p-5"
            outline
            onClick={handleUploadImage}
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" color="green">
          Publish
        </Button>
        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
