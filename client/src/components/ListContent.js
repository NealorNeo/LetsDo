import { useState, useEffect } from 'react';
import React from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { AddList } from './AddList';

export function ListContent() {
    const [Lists, setLists] = useState([]);
    const [newList, setNewList] = useState('');

    const addList = async () => {
        if (newList) {
            let newListObj = { id: uuidv4(), content: newList };
            // unique ID edit

            try {
                setLists(prevLists => [...prevLists, newListObj]);
                setNewList('');
                await Axios.post('/lists', newListObj);
            } catch (err) {
                console.error("Error adding list:", err);
            }
        }
    };

    const getLists = async () => {
        try {
            const res = await Axios.get('/lists');
            setLists(res.data.lists);
        } catch (err) {
            console.error("Error fetching lists:", err);
        }
    }

    useEffect(() => {
        setLists([]);
        getLists();
    }, [])

    const deleteList = async (id) => {
        try {
            await Axios.delete(`/lists/${id}`);
            setLists(prevLists => prevLists.filter(List => List.id !== id));
        } catch (err) {
            console.error("Error deleting list:", err);
        }
    }

    const editList = async (index) => {
        const list = {...Lists[index], isEdit: false};
        try {
            await Axios.put(`/lists/${list.id}`, list);
            setLists(prevLists => prevLists.map((l, idx) => idx === index ? list : l));
        } catch (err) {
            console.error("Error updating list:", err);
        }
    }

    return (
        <div className='container'>
            <div className='showAll'>
                <h3>Your To-do List</h3>

                {Lists && Lists.map((List, index) => {
                    return <div className='listContainer' key={index}>
                        {
                            List.isEdit
                                ? <textarea cols="30" rows="5" value={List.content} onInput={({ target }) => {
                                    const list = [...Lists];
                                    list[index].content = target.value;
                                    setLists(list);
                                }} />
                                : <p className='listContent' id={List.id}>{List.content} </p>
                        }
                        <button onClick={() => deleteList(List.id)}>Delete</button>

                        {
                            !List.isEdit
                                ? <button onClick={() => {
                                    const list = [...Lists];
                                    list[index].isEdit = true;
                                    setLists(list);
                                }}>Edit</button>
                                : <button onClick={() => editList(index)}>Save</button>
                        }
                    </div>
                })}
            </div>

            <div className='listInput'>
                <h3>Add To-do</h3>
                <AddList
                    addList={addList}
                    newList={newList}
                    setNewList={setNewList}
                />
            </div>
        </div>
    )
}