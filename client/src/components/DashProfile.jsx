import { useSelector } from 'react-redux';
import {
  Alert,
  Button,
  Modal,
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImageFileUrl(null);
    }
  };
  // console.log(imageFile, imageFileUrl);
  const uploadImage = async () => {
    // console.log('uploading image');
    // on firebase, Spark plan cannot make file storage
    // so, image cannot be stored in cloud, and used later.
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateError('No change detected!');
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        setUpdateError(data.message);
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess('User profile updated successfully!');
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateError(error.message);
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
    if (updateSuccess) {
      const timer = setTimeout(() => {
        setUpdateSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (updateError) {
      const timer = setTimeout(() => {
        setUpdateError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [imageFile, updateSuccess, updateError]);

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 w-full">
      <h1 className="text-slate-400 text-xl font-bold mb-7 my-7 text-center">
        Profile
      </h1>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="e-mail"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          id="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" color="green" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateSuccess && (
        <Alert color="green" className="mt-5">
          {updateSuccess}
        </Alert>
      )}
      {updateError && (
        <Alert color="red" className="mt-5">
          {updateError}
        </Alert>
      )}
      {error && (
        <Alert color="red" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <ModalHeader>Delete Account</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-17 h-17 text-gray-400 dark:text-gray-200 mb-5 mx-auto" />
            <h3 className="mb-5 text-gray-500 dark:text-gray-200 text-lg">
              Are you sure you want to delete your account? This action cannot
              be undone^^
            </h3>
          </div>
        </ModalBody>
        <ModalFooter className="mx-auto">
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
