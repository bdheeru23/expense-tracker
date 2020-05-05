import React, { Component } from 'react';
import {inject,observer} from 'mobx-react';
import { Table,Container} from 'reactstrap';
import AppNav from './AppNav';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';

class Categories extends Component {
    

    componentDidMount() {
        this.props.categoryStore.loadCategories();
        
    }

    render() {

        let categoryRows = 
            this.props.categoryStore.categories.map(category => 
                <tr>
                    <td id={category.id}>
                        {category.name}
                    </td>
                    <td><EditCategoryModal category={category} /></td>
                </tr>
            );
        

        if(this.props.categoryStore.isLoading)
            return(<div>Loading...</div>)

        return(
            <div>
                <AppNav />
                <Container>
                    <AddCategoryModal />
                    <h3>Categories</h3>
                    <Table className="mt-4 table-striped">
                    <thead>
                    <tr>
                        <th width="30%">Category</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {categoryRows}
                    </tbody>
                    </Table>
                    
                </Container>
            </div>
        );
    }
}
 
export default inject("categoryStore")(observer(Categories));