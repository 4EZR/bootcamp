
// src/pages/Home.jsx
import React, { Component } from 'react';
import { faker } from '@faker-js/faker';
import { Separator } from '@/components/ui/separator';
import CommentCard from '@/components/CommentCard';

const generateFakeData = () => ({
  image: faker.image.avatar(),
  name: faker.person.firstName(),
  comment: faker.lorem.sentence(),
  date: faker.date.past()
});

class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeData: Array.from({ length: 3 }, () => generateFakeData())
    };
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
          />
        ))}
      </div>
    );
  }
}

export default CommentContainer;
