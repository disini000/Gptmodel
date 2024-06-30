import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [messages, setMessages] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const [inputValue, setInputValue] = useState('');
  const [sidebarOptions, setSidebarOptions] = useState(true);
  const [itemId, setItemId] = useState('');
  const [showData, setShowData] = useState([]);

  const [data, setData] = useState({
    today: [],
    yesterday: [],
    previous7Days: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = "667f862b7c65575000eeda4f";
        console.log("hi" + userId);
        const response = await axios.get(`http://localhost:8080/api/v1/query/getAll/${userId}`);
        const responseData = response.data;
        if (response.status === 200) {
          const todayData = responseData.today || [];
          const yesterdayData = responseData.yesterday || [];
          const previous7DaysData = responseData.before7 || [];

          setData({
            today: todayData,
            yesterday: yesterdayData,
            previous7Days: previous7DaysData,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setSidebarOptions(false);
  }, [sidebarOptions]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      try {
        const queryId = itemId;
        const response = await axios.post(`http://localhost:8080/api/v1/query/${userId}/${queryId}`, {
          question: inputValue
        });

        if (response.status === 200) {
          setInputValue('');
          setShowData(response.data|| []);
          setSidebarOptions(true);
          console.log(response.data);
          
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  const handleId = (id) => {
    setItemId(id);
    console.log('Selected ID:', id);
  };

  return (
    <div className="app bg-dark">
      <div className="sidebar bg-secondary">
        <div>
          <h2 className='text-info'>Sinhala GPT</h2>
          <button className='btn btn-light my-3 text-bold' onClick={() => { setItemId(uuidv4()); setShowData([]); }}><strong>New chat</strong></button>
          <ul type = 'none'>
            <li className='my-4'>
              <h3 className='p-3 mb-2 bg-warning text-dark fs-6'>Today</h3>
              <ul type='none'>
                {data.today.map(item => (
                  <li key={item.id}>
                    <button className='btn btn-dark my-1' onClick={() => { handleId(item.id); setShowData(item.queryRequestList || []); }}>
                      <strong>Question:</strong> {item.queryRequestList[0].question}<br />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className=' p-3 mb-2 bg-warning text-dark fs-6'>Yesterday</div>
              <ul type='none' >
                {data.yesterday.map(item => (
                  <li key={item.id}>
                    <button className='btn btn-dark my-1' onClick={() => { handleId(item.id); setShowData(item.queryRequestList || []); }}>
                      <strong>Question:</strong> {item.queryRequestList[0].question}<br />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li className='my-4'>
              <h3 className='p-3 mb-2 bg-warning text-dark fs-6'>Previous 7 Days</h3>
              <ul type='none' >
                {data.previous7Days.map(item => (
                  <li key={item.id}>
                    <button className='btn btn-dark my-1' onClick={() => { handleId(item.id); setShowData(item.queryRequestList || []); }}>
                      <strong>Question:</strong> {item.queryRequestList[0].question}<br />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="chat-container bg-dark">
        <div className="chat">
          {showData.length > 0 ? (
            showData.map((query) => (
              <div key={query.id}>
                <div class="card my-4 text-white bg-secondary mb-3">
                  <h5 class="card-header"><strong>Question:</strong> {query.question}<br /></h5>
                  <div class="card-body">
                    <h5 class="card-title"><strong>Answer:</strong> {query.answer}<br /></h5>
                  </div>
                </div>
                
                
              </div>
            ))
          ) : (
            <p className='text-light'>No data selected</p>
          )}
        </div>
        <form className="input-form" onSubmit={handleSubmit}>
          <input
          className='form-control'
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
