import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/counterSlice';
import { Button } from "@/components/ui/button";
import { FiPlus, FiMinus, FiRefreshCw } from 'react-icons/fi';

function CounterPage() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div className="space-y-4 min-h-[80vh]">
            <p className='text-'>Redux Counter</p>
            <p className="text-8xl text-center">{count}</p>
            <div className="flex space-x-2 w-full justify-center">
                <Button onClick={() => dispatch(increment())} variant="default">
                    <FiPlus className="mr-2 h-4 w-4" /> Increment
                </Button>
                <Button onClick={() => dispatch(decrement())} variant="destructive">
                    <FiMinus className="mr-2 h-4 w-4" /> Decrement
                </Button>
                <Button onClick={() => dispatch(reset())} variant="outline">
                    <FiRefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
            </div>
        </div>
    );
}

export default CounterPage;