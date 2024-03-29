import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { FiTrash } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineCheck } from "react-icons/md";
import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TableRow = ({ classes, mess, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { name, email, message, phone, timestamp, _id, status } = mess || {};
  const axiosSecure = useAxiosSecure();

  const postedTime = formatDistance(new Date(timestamp), new Date(), {
    addSuffix: true,
  });

  const handleOpen = () => setOpen(!open);

  const handleMarkAsRead = async () => {
    const { data } = await axiosSecure.patch(`/messages/${_id}`);
    if (data?.modifiedCount > 0) {
      toast.success("Marked as Read!", {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });
      refetch();
    }
  };

  const handleDelete = async () => {
    const { data } = await axiosSecure.delete(`/messages/${_id}`);
    if (data?._id) {
      setIsOpen(false);
      toast.success("Message Deleted!", {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });
      refetch();
    }
  };

  return (
    <tr className="hover:bg-gray-100 transition duration-300 cursor-pointer">
      <td onClick={handleOpen} className={classes}>
        <Typography variant="small" color="blue-gray">
          {name}
        </Typography>
      </td>
      <td onClick={handleOpen} className={classes}>
        <Typography variant="small" color="blue-gray">
          {email}
        </Typography>
      </td>
      {message?.length > 45 ? (
        <td onClick={handleOpen} className={classes}>
          <Typography variant="small" color="blue-gray">
            {message?.slice(0, 45)}...
          </Typography>
        </td>
      ) : (
        <td onClick={handleOpen} className={classes}>
          <Typography variant="small" color="blue-gray">
            {message}
          </Typography>
        </td>
      )}
      <td className={classes}>
        <div className="flex items-center gap-2">
          {status === "completed" ? (
            <MdOutlineCheck color="green" size={24} className="ml-2" />
          ) : (
            <button
              title="Mark as Read"
              onClick={handleMarkAsRead}
              className="text-gray-700 btn btn-sm btn-circle"
            >
              <CiBookmark size={17} />
            </button>
          )}
          <button
            title="Delete"
            onClick={() => setIsOpen(!open)}
            className="text-orange-900 btn btn-sm btn-circle z-50"
          >
            <FiTrash />
          </button>
        </div>
        <Dialog
          size="sm"
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Sent By</DialogHeader>
          <Typography className="pl-4">Name: {name}</Typography>
          <Typography className="pl-4">Email: {email}</Typography>
          <Typography className="pl-4">Phone: {phone}</Typography>
          <DialogHeader>Message</DialogHeader>
          <Typography className="px-4 text-justify">{message}</Typography>
          <DialogBody>
            <div className="flex justify-between items-center">
              <Typography variant="small">{postedTime}</Typography>
              <Button variant="text" color="red" onClick={handleOpen}>
                <span>Close</span>
              </Button>
            </div>
          </DialogBody>
        </Dialog>
        <Dialog
          size="xs"
          open={isOpen}
          handler={() => setIsOpen(!isOpen)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          className="py-8"
        >
          <DialogHeader className="w-fit mx-auto">Are You Sure?</DialogHeader>
          <Typography className="w-fit mx-auto">
            You won{"'"}t be able to revert this.
          </Typography>

          <DialogBody>
            <div className="flex justify-center gap-3">
              <Button
                variant="text"
                color="red"
                onClick={() => setIsOpen(false)}
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" onClick={handleDelete}>
                <span>Confirm</span>
              </Button>
            </div>
          </DialogBody>
        </Dialog>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  classes: PropTypes.string,
  mess: PropTypes.object,
  refetch: PropTypes.func,
};

export default TableRow;
