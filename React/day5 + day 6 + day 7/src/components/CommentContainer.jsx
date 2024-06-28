// src/pages/Home.jsx
import React, { Component } from 'react';
import { faker } from '@faker-js/faker';
import { Separator } from '@/components/ui/separator';
import CommentCard from '@/components/CommentCard';

// Function to generate fake comment data
const generateFakeData = () => ({
  image: faker.image.avatar(),
  name: faker.person.firstName(),
  comment: faker.lorem.sentence(),
  date: faker.date.past(),
  likes: 0 
});

class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeData: Array.from({ length: 3 }, () => generateFakeData()) 
    };
    this.likeCounter = 0; 
  }


  handleLike = (index) => {
    this.setState(prevState => {
      const newFakeData = [...prevState.fakeData];
      newFakeData[index] = {
        ...newFakeData[index],
        likes: newFakeData[index].likes + 1
      };
      return { fakeData: newFakeData };
    });
    this.likeCounter++; 
  }

  render() {
    const { fakeData } = this.state;

    return (
      <div className='rounded-md p-4 mt-10'>
        <p className='mb-10'>Comment ({fakeData.length})</p>
        <Separator />
        {fakeData.map((data, index) => (
          <CommentCard
            key={index}
            image={data.image}
            name={data.name}
            comment={data.comment}
            date={data.date}
            likes={data.likes}
            onLike={() => this.handleLike(index)} // Pass handleLike method
          />
        ))}
      </div>
    );
  }
}

export default CommentContainer;
