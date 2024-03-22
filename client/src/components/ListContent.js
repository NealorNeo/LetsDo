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
        <div className="flex w-full flex-col justify-center items-center h-full">
            <AddList
                addList={addList}
                newList={newList}
                setNewList={setNewList}
            />
            
            <div className="sm:w-4/5 md:w-2/3 lg:w-2/3 mt-10 bg-green-100 rounded-3xl">
                <div className="flex flex-col justify-center items-center bg-green-100 h-full rounded-3xl">
                    {Lists && Lists.map((List, index) => {
                        return (
                            <div className="w-4/5 flex flex-row bg-green-100 rounded-3xl" key={index}>
                                <div className="relative w-full bg-gray-100 rounded-3xl">
                                    {List.isEdit
                                        ? <textarea value={List.content} onInput={({ target }) => {
                                            const list = [...Lists];
                                            list[index].content = target.value;
                                            setLists(list);
                                        }} />
                                        : <div className="pl-2 rounded-3xl" id={List.id}>
                                            <text className="">{List.content}</text>
                                            </div>
                                    }
                                    <div className="absolute inset-y-0 right-0 flex flex-row">
                                        {!List.isEdit
                                            ? <button className=""
                                                onClick={() => {
                                                const list = [...Lists];
                                                list[index].isEdit = true;
                                                setLists(list);
                                            }}>Edit</button>
                                            : <button onClick={() => editList(index)}>Save</button>
                                        }
                                        
                                        <button 
                                            className="" 
                                            onClick={() => deleteList(List.id)}>
                                                Delete
                                        </button>

                                        
                                    </div>
                                    
                                </div>
                                
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}