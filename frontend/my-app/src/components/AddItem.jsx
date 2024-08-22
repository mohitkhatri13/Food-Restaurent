import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      thumbnail: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('thumbnail', formData.thumbnail);

    try {
      const response = await axios.post('http://localhost:4000/api/v1/createmenu', data, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      console.log('Menu item created:', response.data);
      toast.success('Menu item created successfully!');

      // Reset form after successful submission
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        thumbnail: null,
      });
    } catch (error) {
      console.error('Error creating menu item:', error.response?.data || error.message);
      toast.error('Failed to create menu item.');
    }
  };

  return (
    <div className="max-w-md mt-10 border mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            <option value="appetizers">Appetizers</option>
            <option value="main courses">Main Courses</option>
            <option value="desserts">Desserts</option>
            <option value="drinks">Drinks</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="diet">Diet</option>
            <option value="dinner">Dinner</option>
            <option value="snacks">Snacks</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
