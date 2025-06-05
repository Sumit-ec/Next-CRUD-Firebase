"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [fetchData, setFetchData] = useState([]);

  const [id, SetId] = useState({});

  const dbref = collection(db, "Data");

  const add = async () => {
    if (name.length === 0 || phone.length === 0 || email.length === 0) {
      alert("Please Fill All the fields");
    } else {
      try {
        await addDoc(dbref, { Name: name, Number: phone, Email: email });
        alert("Document Added Successfully");
        setName("");
        setEmail("");
        setPhone("");
        fetchdata();
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const getdata = await getDocs(dbref);
    const snap = getdata.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFetchData(snap);
  };

  const edit = (id) => {
    const filter = fetchData.find((filterID) => {
      return filterID.id === id;
    });
    SetId(filter.id);
    setName(filter.Name);
    setEmail(filter.Email);
    setPhone(filter.Number);
  };

  const update = async () => {
    if (name.length === 0 || phone.length === 0 || email.length === 0) {
      alert("Please Fill All the fields");
    } else {
      const updateref = doc(dbref, id);
      try {
        await updateDoc(updateref, { Name: name, Number: phone, Email: email });
        alert("document Updated Successfully");
        fetchdata();
      } catch (error) {
        alert(error);
      }
    }
  };

  const del = async (id) => {
    const delref = doc(dbref, id);
    const delDoc = await deleteDoc(delref);
    alert("Document Deleted Successfully");
    fetchdata();
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h3>Add / Update Form</h3>
        <div className="form-box">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-box">
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-box">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="button">
          <button onClick={add}>Add</button>
          <button onClick={update}>Update</button>
        </div>
      </div>
      <div className="data-container">
        <h3 className="data-list">User Data</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.map((curElem) => (
              <tr key={curElem.id}>
                <td>{curElem.Name}</td>
                <td>{curElem.Email}</td>
                <td>{curElem.Number}</td>
                <td>
                  <button className="edit" onClick={() => edit(curElem.id)}>
                    Edit
                  </button>
                  <button className="del" onClick={() => del(curElem.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
