import { useEffect,useState } from "react";
import axios from 'axios'
import './App.css'

function Table() {
  const [data, setData]= useState([])
  const [title, setTitle] = useState('')
  const [body, setBody]= useState('')
  const [utitle, usetTitle] = useState('')
  const [ubody, usetBody]= useState('')
  const [editId, setEditID] = useState(-1)
    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    }, [])
    const handleSubmit = (event) =>{
      event.preventDefault();
      const id = data[data.length - 1].userId +1;
      axios.post('https://jsonplaceholder.typicode.com/posts',{ userId: userId,it: it, title:title,body:body})
      .then(res => {
        location.reload()
      })
      .catch(err =>  console.log(err));
    }
    const handleEdit =(id) =>{
      axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
      .then(res => {
        usetTitle(res.data[0].title)
        usetBody(res.data[0].body)
      })
      .catch(err => console.log(err));
      setEditID(id)
    }

    const handleUpdate = () =>{
      axios.put('https://jsonplaceholder.typicode.com/posts/'+editId,{userId: userId,it: it, title:title,body:body})
      .then(res => {
        location.reload()
        setEditID(-1)
      })
      .catch(err =>  console.log(err));
    }
        return(
        <div className="container">
          <div className="form-div">
            <form onSubmit={handleSubmit}> 
            <input type="text" placeholder="Enter Title" onChange={e => setTitle(e.target.value)}/>
            <input type="text" placeholder="Enter Body" onChange={e => setBody(e.target.value)}/>
            <button>Add</button>
            </form>
          </div>
         <table>
          <thead>
            <tr>
              <th>UserID</th>
              <th>IT</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{}}>
            {
              data.map((user, index)=>(
                user.userId === editId?
                <tr>
                  <td>{user.userId}</td>
                  <td><input type="text"value={utitle} onChange={e => usetTitle(e.target.value)}/></td>
                  <td><input type="text"value={ubody} onChange={e => usetBody(e.target.value)}/></td>
                  <td><button onClick={handleUpdate}>Update</button></td>
                </tr>
                :
                <tr key = {index}>
                  <td>{user.userId}</td>
                  <td>{user.it}</td>
                  <td>{user.title}</td>
                  <td>{user.body}</td>
                  <td>
                    <button onClick={()=>handleEdit(user.userId)}>Edit</button>
                    <button>Delete</button>
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

