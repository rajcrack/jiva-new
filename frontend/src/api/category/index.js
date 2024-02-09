import axios from 'axios';

import { API_URL } from '../../utils/constant';

export const createCategory = async (data) => {
    console.log(data)
    console.log(`Bearer ${localStorage.getItem('token')}`)
        data.imageUrl='image'
    const categoryData = await axios.post(`${API_URL}/category`, data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    const category = categoryData.data;
    return category;

}
export const updateCategory = async (id, data) => {
    const categoryData = await axios.put(`${API_URL}/category/${id}`, data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    const category = categoryData.data;
    return category;
}
export const deleteCategoy = async (id) => {
    const categoryData = await axios.delete(`${API_URL}/category/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    const category = categoryData.data;
    return category;
}
export const getCategoryById = async (id) => {
    const categoryData = await axios.get(`${API_URL}/category/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    const category = categoryData.data;
    return category;
}
export const getCategoryList = async (data) => {
    const{limit,page,keyword}=data;
    console.log(limit,page)
    const categoryData = await axios.get(`${API_URL}/category/list?limit=${limit}&page=${page}&keyword=${keyword}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(categoryData)
    const categoryList = categoryData.data;
    return categoryList;

}