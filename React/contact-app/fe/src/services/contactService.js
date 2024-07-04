import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

const contactService = {
    // Get all contacts
    getAllContacts: async () => {
        try {
            const response = await axios.get(`${API_URL}/contact`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Get contact by ID
    getContactById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/contact/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Create new contact
    createContact: async (contactData) => {
        try {
            const response = await axios.post(`${API_URL}/contact`, contactData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Update contact
    updateContact: async (id, contactData) => {
        try {
            const response = await axios.put(`${API_URL}/contact/${id}`, contactData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Delete contact
    deleteContact: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/contact/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    }
};

export default contactService;