import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';


class BookingsPage extends Component {

  state={
    isLoading:false,
    bookings:[]
  };

  static contextType = AuthContext;

  componentDidMount(){
    this.fetchBookings();
  }


  fetchBookings = () => {

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            bookings {
              _id
             createdAt
             event{
               _id
               title
               date
             }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });

  };

  render() {
    return (
      
      <React.Fragment>
        {this.state.isLoading ? (<Spinner/>) : (
          <ul>
          {this.state.bookings.map(bookings => (
          <li key={bookings._id}>
      {bookings.event.title} - {' '}{new Date(bookings.createdAt).toLocaleDateString()}
          </li>
          ))}
        </ul>
        )}
    
    </React.Fragment>);
  }
}

export default BookingsPage;