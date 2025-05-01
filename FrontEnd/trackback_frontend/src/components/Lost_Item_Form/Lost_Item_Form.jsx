import React from "react";
import { useState, useEffect } from "react";
import { getAllCategories , submitLostItem} from '../../api/item_handle_api'
import '../../../src/global.css'
import '../Lost_Item_Form/Lost_Item_Form.css'
import {Close } from '../../utils/Icons/Icons.js';

const Lost_Item_Form = ({onClose})=>{
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description:"",
        categoryId: "",
        dateLost: "",
        location: "",
        image: null,
        isNotify: false,
    });

    useEffect(() =>{
        async function fetchCategories() {
            try{
                const data = await getAllCategories();
                setCategories(data);
            }
            catch(error)
            {
                console.error('Error fetching categpries', error)
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        console.log("Form submitted:", formData);
    
        // Ensure formData is an instance of FormData
        const data = new FormData();
        data.append("Title", formData.title);
        data.append("Description", formData.description);
        data.append("CategoryId", formData.categoryId);
        data.append("DateLost", formData.dateLost);
        data.append("Location", formData.location);
        data.append("IsNotify", formData.isNotify);
    
        // Append the image (if any)
        if (formData.image) {
            data.append("Image", formData.image);
        }
    
        // If userId is available, append it to formData
        const userId = localStorage.getItem("userId");
        if (userId) {
            data.append("UserId", userId);
        }
    
        try {
            await submitLostItem(data); // Pass the FormData to submitLostItem
        } catch (error) {
            console.error('Error submitting lost report:', error);
            alert('An error occurred while submitting the lost item report. Please try again later.');
        }
    };
    
    return(
        <div>
            <div className="main-layout-cont">
                <div className="two-column-layout-cont" >
                    <div className="left-column-cont" >
                        <h1>Report Your Lost Item</h1>
                    </div>
                    <div className="right-column-cont">
                        <button className="close-button" onClick={onClose}>
                            <Close />
                        </button>
                    </div>
                </div><br /><br /><br />
                
                <form onSubmit={handleSubmit}>
                    <div className="body-column-cont">
                        <label>Title</label><br />
                        <input id="lost-input" type ="text"name ="title" value={formData.title} onChange ={handleChange}></input><br /><br />

                        <label>Description</label><br />
                        <input  id="lost-input" type ="text"name ="description" value={formData.description} onChange ={handleChange}></input><br /><br />

                        <label>Category</label><br />
                        <select className ="custome-dropdown"name="categoryId" value={formData.categoryId} onChange ={handleChange}>
                            <option value="">Select a Category</option>
                            {categories.map((cat) =>(
                                <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>

                            ))}
                        </select><br /><br />
                        <label>Date Lost</label><br />
                        <input  id="lost-input" type ="date"name ="dateLost" value={formData.dateLost} onChange ={handleChange}></input><br /><br />

                        <label>Location</label><br />
                        <input  id="lost-input" type ="text"name ="location" value={formData.location} onChange ={handleChange}></input><br /><br />

                        <div>
                        <label>Upload Image</label><br />
                        <input
                            id="lost-input"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />
                        </div><br /><br />
                        <div className="notofy-Input">
                            <input 
                             className="notify-CheckBox"
                             type="checkbox"
                             name="isNotify"
                             checked={formData.isNotify}
                             onChange={handleChange}
                             />
                            <label className ="notify-Label">Notify me when matching items are found.</label>
                        </div>    
                           

                       
                    </div><br /><br /><br />
                    <button id="lost-submit-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default Lost_Item_Form;