import React from 'react'
import {render,cleanup,fireEvent} from '@testing-library/react'
import pet,{ANIMALS,_breeds,_dogs} from '@frontendmasters/pet'
import SearchParams from '../SearchParams'

// 退出时进行清理
afterEach(cleanup);

test('SearchParams ', async() => {
    const {getByTestId,getByText}=render(<SearchParams/>);
    const animalDropdown=getByTestId('use-dropdown-animal');
    expect(animalDropdown.children.length).toEqual(ANIMALS.length+1)
    //确保api 调用正确
    expect(pet.breeds).toHaveBeenCalled();
    
    const breedDropdown=getByTestId('use-dropdown-breed');
    expect(breedDropdown.children.length).toEqual(_breeds.length+1);

    //form 提交测试
    const searchResults = getByTestId("search-results");
    expect(searchResults.textContent).toEqual("No Pets Found");
    //click @todo 需要将异步请求改为同步
    fireEvent(getByText("Submit"), new MouseEvent("click"))
});
