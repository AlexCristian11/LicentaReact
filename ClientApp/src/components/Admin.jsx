import React from 'react';
import AddUserForm from './AddUserForm';
import RemoveUserForm from './RemoveUserForm';
import './Admin.css';
import AddProductForm from './AddProductForm';
import RemoveProductForm from './RemoveProductForm';
import AddCategoryForm from './AddCategoryForm';
import RemoveCategoryForm from './RemoveCategoryForm';

const Admin = () => {
    return (
        <div className="admin-page" >
            <div className="user">
                <AddUserForm />
                <RemoveUserForm />
            </div>
            <div className="product-form">
                <AddProductForm />
                <RemoveProductForm />
            </div>
            <div className="category-form">
                <AddCategoryForm />
                <RemoveCategoryForm />
            </div>
        </div>
    )
}

export default Admin;