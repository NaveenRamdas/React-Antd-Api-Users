import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Popconfirm, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, setUsers } from "./usersSlice";
import { SortAscendingOutlined } from "@ant-design/icons";

function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [sortedUsers, setSortedUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [minId, setMinId] = useState('');
  const [maxId, setMaxId] = useState('');

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        dispatch(setUsers(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    console.log(deleteUser(id));
    dispatch(deleteUser(id));
  };
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key:"id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // sorter: (a, b) => a.name.localeCompare(b.name),
      // sortDirections: ["descend", "ascend"], 
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "webiste",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleSortByName = () => {
    const sorted = users.slice().sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setSortedUsers(sorted);
    console.log(sorted);
  };

  
  const handleMinIdChange = (event) => {
    setMinId(event.target.value);
  };

  const handleMaxIdChange = (event) => {
    setMaxId(event.target.value);
  };

  const handleFilter = () => {
    const filtered = users.filter((user) => {
      if (minId && user.id < parseInt(minId)) {
        return false;
      }
      else if (maxId && user.id > parseInt(maxId)) {
        return false;
      }else{
        return true;
      }
    });
    setFilteredUsers(filtered);
    console.log(filtered);
  };

  const handleClearFilter = () => {
    setFilteredUsers(null);
    setMinId('');
    setMaxId('');
  };
  const handleClearSort = ()=>{
    setSortedUsers(null);
  }
 
  return (
    <>
     <div style={{ marginBottom: '16px' }}>
        <Input placeholder="Min ID" value={minId} onChange={handleMinIdChange} style={{ width:"10rem",marginRight: '8px' }} />
        <Input placeholder="Max ID" value={maxId} onChange={handleMaxIdChange} style={{ width:"10rem",marginRight: '8px' }} />
        <Button type="primary" onClick={handleFilter}>Filter</Button>
        <Button danger onClick={handleClearFilter} style={{ marginLeft: '8px' }}>
          Clear Filter
        </Button>
      </div>
      <div style={{ marginBottom: '16px', display:"flex"}}>
        <Button
          style={{ display: "flex", marginLeft: "10rem" }}
          onClick={handleSortByName}
        >
          Sort By Name
          <SortAscendingOutlined style={{ display: "block", padding: 4 }} />
        </Button>
        <Button danger onClick={handleClearSort}
          style={{ display: "flex", marginLeft: "1rem" }}
          >Clear Sort</Button>
      </div>
      <Table dataSource={filteredUsers||sortedUsers||users} columns={columns} />
    </>
  );
}

export default UserTable;
