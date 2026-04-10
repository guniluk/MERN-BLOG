import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  // console.log(userPosts);
  // console.log(currentUser);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users); //from user.controller.js
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        },
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 ml-1 mr-1 overflow-x-scroll md:table-auto md:ml-5 md:mr-5 md:w-full md:mx-auto scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <TableHead>
              <TableRow>
                <TableHeadCell>Date Created</TableHeadCell>
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
                <TableHeadCell>E-mail</TableHeadCell>
                <TableHeadCell>Admin</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>

            {users.map((user) => (
              <TableBody key={user._id} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </TableCell>

                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {user.email}
                  </TableCell>

                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <button
              className="w-full text-teal-500 self-center text-sm py-7"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no users to show</p>
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
              Are you sure you want to delete this user? This action cannot be
              undone^^
            </h3>
          </div>
        </ModalBody>
        <ModalFooter className="flex mx-auto gap-15">
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button color="red" onClick={handleDeleteUser}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
