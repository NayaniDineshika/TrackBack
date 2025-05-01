import axiosInstance from "../utils/axios";
export async function getAllCategories() {
   const responce =await axiosInstance.get('Items/categories');
   return responce.data;
}

// export async function submitLostItem(formData) {
//    const userId = localStorage.getItem("userId");
//   if (userId) {
//    console.log("User ID from localStorage:", userId);
//     formData.append("UserId"); // This must match the backend model property
//   }
//   await axiosInstance.post('Items/lost', formData);

// }

export async function submitLostItem(formData) {
   const userId = localStorage.getItem("userId");
   console.log("Image instance:", formData.get("Image"));

 
   // if (userId) {
   //   // Remove any existing entry just to be safe
   //   formData.delete("UserId");
   //   formData.append("UserId", userId); // ✅ Correct usage
   // }
 
   // Optional: log entries to debug
   for (let [key, value] of formData.entries()) {
     console.log(`${key}: ${value}`);
   }
 
   await axiosInstance.post('Items/lost', formData,{ headers: {
    'Content-Type': 'multipart/form-data'
  }});
 }
 