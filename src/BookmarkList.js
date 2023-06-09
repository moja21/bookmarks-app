import React, { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:80/Project/bookmarking-app-moja21/api';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [newBookmark, setNewBookmark] = useState({ title: '', link: '' });
  const [bookmarkId, setBookmarkId] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedLink, setUpdatedLink] = useState("");


  const fetchAllBookmarks = async () => {
    try {
      const response = await fetch(apiUrl + '/readAll.php');
      const bookmarksData = await response.json();
      setBookmarks(bookmarksData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookmark = async (id) => {
    try {
      const response = await fetch(apiUrl + "/readOne.php" + id, {
        method: "GET",
      });
      const bookmarkData = await response.json();
      
      <div className="deatils">
        <print>{bookmarkData.id}</print>
        <print>{bookmarkData.title}</print>
        <print>{bookmarkData.link}</print>
      </div>
      
    } catch (error) {
      console.error(error);
    }
  };

  const createBookmark = async () => {
    const { title, link } = newBookmark;
    if (title.trim() && link.trim()) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, link }),
        };
        const response = await fetch(apiUrl + '/create.php', options);
        if (!response.ok) {
          throw new Error('Error: Bookmark not created');
        }
        setNewBookmark({ title: '', link: '' });
        fetchAllBookmarks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateBookmark = async () => {
    
   
      try {
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id:bookmarkId,title:updatedTitle,link:updatedLink}),
        };
        const response = await fetch(apiUrl + "/update.php", options);
        
        if (!response.ok) {
          throw new Error('Error: Bookmark not updated');
        }
       
        fetchAllBookmarks();
      } catch (error) {
        console.error(error);
      }
    
  };
  const deleteBookmark = async (bookmarkId) => {
    console.log(bookmarkId)
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bookmarkId }),
      };
      const response = await fetch(apiUrl + '/delete.php', options);
      console.log(response)
      if (!response.ok) {
        console.error(response);
      }
      fetchAllBookmarks();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleInputChange = (e) => {
    setNewBookmark({
      ...newBookmark,
      [e.target.name]: e.target.value,
    });
  };
 
  return (
    <div>
      <h1>Bookmark Component</h1>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <h3>{bookmark.title}</h3>
            <p>{bookmark.link}</p>
            
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="title"
        value={newBookmark.title}
        onChange={handleInputChange}
        placeholder="Bookmark Title"
      />
      <input
        type="text"
        name="link"
        value={newBookmark.link}
        onChange={handleInputChange}
        placeholder="Bookmark Link"
      />
      <button onClick={createBookmark}>Create Bookmark</button>
      <h2>Update Bookmark</h2>
      <input
        type="text"
        name="id"
        value={bookmarkId}
        onChange ={(e) => setBookmarkId(e.target.value)}
        placeholder="Bookmark ID"
      />
       <input
        type="text"
        name="title"
        value={updatedTitle}
        onChange ={(e) => setUpdatedTitle(e.target.value)}
        placeholder="Bookmark ID"
      />
       <input
        type="text"
        name="link"
        value={updatedLink}
        onChange ={(e) => setUpdatedLink(e.target.value)}
        placeholder="Bookmark ID"
      />
    
      <button onClick={updateBookmark}>Update Bookmark</button>
      
      <h2>Delete Bookmark</h2>
      <input
        type="text"
        name="id"
        value={bookmarkId}
        onChange={(e) => setBookmarkId(e.target.value)}
        placeholder="Bookmark ID"
      />
    
    <button className="delete-btn" title="delete" onClick={() => deleteBookmark(bookmarkId)}>
  Delete
</button>
<br></br>
<br></br>
<button onClick={fetchAllBookmarks}>fetch All Bookmark</button>
    </div>
  );
};

export default Bookmark;
