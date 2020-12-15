import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    state = {}
    
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
        console.log(id);
    }
    
    render() { 
        const  items = this.props.item.items;
        return ( 
            <Container>
                {/*<Button color="dark" style={{ marginBottom: '2rem' }} onClick={() => {
                    const name = prompt('enter item');
                    if (name) {
                        this.setState(state => ({
                            items: [...state.items, { id: uuid(), name: name }]
                        }));
                    }
                }}>Add Item</Button>*/}
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button className="remove-btn" color="danger" size="sm"
                                        onClick={this.onDeleteClick.bind(this,_id)}>
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
         );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, {getItems,deleteItem})(ShoppingList);