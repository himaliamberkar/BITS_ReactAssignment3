import { useEffect, useState } from "react";
import axios from 'axios'
import './App.css'

function Table() {
  const [data, setData] = useState([])
  // const [id, setID] = useState('')
  // const [userId, setUserID] = useState('')
  // const [title, setTitle] = useState('')
  // const [body, setBody] = useState('')
  const [utitle, usetTitle] = useState('')
  const [ubody, usetBody] = useState('')
  const [editId, setEditID] = useState(-1)
  const [inputData, setInputData] = useState({
    id: '',
    userId: '',
    title: '',
    body: ''
  })


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => setData(res.data)).catch(err => console.log(err));
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault();
    // const id = data[data.length - 1].userId + 1;
    axios.post('https://jsonplaceholder.typicode.com/posts', inputData).then(res => {
      setData([res.data, ...data,]);
      // location.reload()
    })
      .catch(err => console.log(err));
    alert('data added successfully');
  }
  const handleEdit = (id) => {
    // axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
    //   .then(res => {
    //     usetTitle(res.data[0].inputData.title)
    //     usetBody(res.data[0].body)
    //   }).catch(err => console.log(err));
    // setEditID(id)

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {
      setInputData(res.data)

    })
  }

  const handleUpdate = () => {
    axios.put('https://jsonplaceholder.typicode.com/posts/' + editId, inputData)
      .then(res => {
        // location.reload()
        setEditID(-1)
      })
      .catch(err => console.log(err));
  }

  function handleDelete(deleteID) {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteID}`).then(res => {
      const updatedData = [...data];
      updatedData.splice(deleteID, 1);
      setData(updatedData);
    })
  }
  return (
    <div className="container">
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputData.id} placeholder="Enter ID" onChange={e => { setInputData({ ...inputData, id: e.target.value }) }} />
          <input type="text" value={inputData.userId} placeholder="Enter User ID" onChange={e => { setInputData({ ...inputData, userId: e.target.value }) }} />
          <input type="text" value={inputData.title} placeholder="Enter Title" onChange={e => { setInputData({ ...inputData, title: e.target.value }) }} />
          <input type="text" value={inputData.body} placeholder="Enter Body" onChange={e => { setInputData({ ...inputData, body: e.target.value }) }} />
          <button>Add</button>
          <button onClick={handleUpdate}>Update</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{}}>
          {
            data.map((user, index) => (
              user.Id === editId ?
                <tr>
                  <td>{user.id}</td>
                  <td>{user.userId}</td>
                  <td><input type="text" value={utitle} onChange={e => usetTitle(e.target.value)} /></td>
                  <td><input type="text" value={ubody} onChange={e => usetBody(e.target.value)} /></td>
                  <td><button onClick={handleUpdate}>Update</button></td>
                </tr>
                :
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.userId}</td>
                  <td>{user.title}</td>
                  <td>{user.body}</td>
                  <td>
                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table



